import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import {
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Eye,
  Compass,
  MapPin,
  ExternalLink,
  Layers,
  DoorOpen
} from 'lucide-react';
import { CampusBuilding, CampusRoute } from '../../types';
import { BuildingCategoryIcon } from '../common/BuildingCategoryIcon';

interface Campus3DViewportProps {
  buildings: CampusBuilding[];
  selectedBuildingId: string;
  onSelectBuilding: (buildingId: string) => void;
  routeData?: CampusRoute | null;
  categoryFilter?: string;
  showLabels?: boolean;
  heightClass?: string;
  cameraPresetTrigger?: { type: string; ts?: number } | null | any;
}

export function Campus3DViewport({
  buildings,
  selectedBuildingId,
  onSelectBuilding,
  routeData,
  categoryFilter = 'All',
  showLabels = true,
  heightClass = 'h-[580px]',
  cameraPresetTrigger
}: Campus3DViewportProps) {
  const mountRef = useRef(null);
  const labelRefs = useRef({});
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsStateRef = useRef({
    theta: 0.55, // horizontal orbit angle
    phi: 0.92, // vertical angle (from top)
    radius: 78,
    target: new THREE.Vector3(0, 0, 2),
    desiredTarget: new THREE.Vector3(0, 0, 2),
    desiredRadius: 78,
    desiredTheta: 0.55,
    desiredPhi: 0.92,
    isDragging: false,
    isPanning: false,
    prevX: 0,
    prevY: 0,
    dragDistance: 0
  });
  const buildingMeshesRef = useRef({});
  const selectionRingRef = useRef(null);
  const selectionBeaconRef = useRef(null);
  const routeGroupRef = useRef(null);
  const routeChevronsRef = useRef([]);
  const [hoveredBuildingId, setHoveredBuildingId] = useState(null);

  // Build the 3D Scene on Mount
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 550;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#eef2f9');
    scene.fog = new THREE.FogExp2('#eef2f9', 0.0045);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(42, width / height, 1, 350);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.78);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight('#ffffff', '#d0ddf0', 0.45);
    hemiLight.position.set(0, 60, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight('#fffdf8', 0.95);
    dirLight.position.set(45, 72, 50);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 10;
    dirLight.shadow.camera.far = 180;
    const d = 65;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    scene.add(dirLight);

    // --- Ground & Landscaped Lawns ---
    const baseGroundGeo = new THREE.PlaneGeometry(240, 240);
    const baseGroundMat = new THREE.MeshLambertMaterial({ color: '#e2e8f3' });
    const baseGround = new THREE.Mesh(baseGroundGeo, baseGroundMat);
    baseGround.rotation.x = -Math.PI / 2;
    baseGround.position.y = -0.15;
    baseGround.receiveShadow = true;
    scene.add(baseGround);

    // Main Green Campus Turf Pad
    const campusPadGeo = new THREE.BoxGeometry(92, 0.3, 102);
    const campusPadMat = new THREE.MeshLambertMaterial({ color: '#d7eedd' });
    const campusPad = new THREE.Mesh(campusPadGeo, campusPadMat);
    campusPad.position.set(0, -0.05, 0);
    campusPad.receiveShadow = true;
    scene.add(campusPad);

    // Decorative Lawn Quadrants
    const lawnMat = new THREE.MeshLambertMaterial({ color: '#bfe5c8' });
    const lawnPositions = [
      [-18, 0.05, 7, 26, 18],
      [18, 0.05, 7, 26, 18],
      [-18, 0.05, -11, 26, 14],
      [18, 0.05, -11, 26, 14],
      [-18, 0.05, 27, 24, 12]
    ];
    lawnPositions.forEach(([lx, ly, lz, lw, ld]) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(lw, 0.12, ld), lawnMat);
      mesh.position.set(lx, ly, lz);
      mesh.receiveShadow = true;
      scene.add(mesh);
    });

    // --- Roads & Pedestrian Pathways ---
    const roadMat = new THREE.MeshLambertMaterial({ color: '#334155' });
    const walkwayMat = new THREE.MeshLambertMaterial({ color: '#cbd5e1' });
    const stripeMat = new THREE.MeshBasicMaterial({ color: '#f8fafc' });

    // Central Spine Avenue
    const mainRoad = new THREE.Mesh(new THREE.BoxGeometry(6.5, 0.14, 84), roadMat);
    mainRoad.position.set(0, 0.06, 2);
    mainRoad.receiveShadow = true;
    scene.add(mainRoad);

    // Road Center Dashed Markings
    for (let z = -34; z <= 36; z += 5) {
      const dash = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.16, 2.2), stripeMat);
      dash.position.set(0, 0.07, z);
      scene.add(dash);
    }

    // Cross Corridors connecting buildings
    const crossRoads = [
      [0, 16, 46, 3.6], // South Academic Crossroad
      [0, -2, 44, 3.6], // Central Plaza Crossroad
      [0, -20, 46, 3.6], // North Academic Crossroad
      [2, -35, 36, 3.6], // Cafeteria & Sports Walk
      [13, 30, 26, 4.2] // Parking Access Road
    ];
    crossRoads.forEach(([cx, cz, cw, cd]) => {
      const cr = new THREE.Mesh(new THREE.BoxGeometry(cw, 0.13, cd), walkwayMat);
      cr.position.set(cx, 0.05, cz);
      cr.receiveShadow = true;
      scene.add(cr);
    });

    // Central Plaza Roundabout & Fountain
    const plazaDisk = new THREE.Mesh(
      new THREE.CylinderGeometry(6.5, 6.5, 0.18, 32),
      new THREE.MeshLambertMaterial({ color: '#e2e8f0' })
    );
    plazaDisk.position.set(0, 0.08, -2);
    scene.add(plazaDisk);

    const fountainWater = new THREE.Mesh(
      new THREE.CylinderGeometry(3.2, 3.2, 0.35, 24),
      new THREE.MeshLambertMaterial({ color: '#11cdef' })
    );
    fountainWater.position.set(0, 0.2, -2);
    scene.add(fountainWater);

    const fountainSpire = new THREE.Mesh(
      new THREE.ConeGeometry(0.8, 2.8, 16),
      new THREE.MeshPhongMaterial({ color: '#5e72e4', shininess: 80 })
    );
    fountainSpire.position.set(0, 1.6, -2);
    scene.add(fountainSpire);

    // --- Build Stylized 3D Campus Buildings ---
    buildingMeshesRef.current = {};

    buildings.forEach((b) => {
      const group = new THREE.Group();
      group.position.set(b.position[0], 0, b.position[2]);
      group.userData = { buildingId: b.id };

      const [w, h, d] = b.size;

      if (b.id === 'main-entrance') {
        // Stylized Campus Archway Gate
        const pillarMat = new THREE.MeshPhongMaterial({ color: '#ffffff' });
        const accentMat = new THREE.MeshPhongMaterial({ color: b.color });

        const leftPillar = new THREE.Mesh(new THREE.BoxGeometry(2.4, h, 2.8), pillarMat);
        leftPillar.position.set(-w / 2 + 1.5, h / 2, 0);
        leftPillar.castShadow = true;
        leftPillar.userData = { buildingId: b.id };
        group.add(leftPillar);

        const rightPillar = new THREE.Mesh(new THREE.BoxGeometry(2.4, h, 2.8), pillarMat);
        rightPillar.position.set(w / 2 - 1.5, h / 2, 0);
        rightPillar.castShadow = true;
        rightPillar.userData = { buildingId: b.id };
        group.add(rightPillar);

        const topBeam = new THREE.Mesh(new THREE.BoxGeometry(w + 1.5, 1.8, 3.4), accentMat);
        topBeam.position.set(0, h + 0.6, 0);
        topBeam.castShadow = true;
        topBeam.userData = { buildingId: b.id };
        group.add(topBeam);

        // Visitor Booth
        const booth = new THREE.Mesh(
          new THREE.BoxGeometry(3.2, 2.8, 3.2),
          new THREE.MeshPhongMaterial({ color: '#11cdef' })
        );
        booth.position.set(-w / 2 - 2.5, 1.4, -1);
        booth.castShadow = true;
        booth.userData = { buildingId: b.id };
        group.add(booth);
      } else if (b.id === 'sports') {
        // Sports Complex Field + Pavilion
        const turf = new THREE.Mesh(
          new THREE.BoxGeometry(w, 0.25, d),
          new THREE.MeshLambertMaterial({ color: '#2dce89' })
        );
        turf.position.set(0, 0.12, 0);
        turf.receiveShadow = true;
        turf.userData = { buildingId: b.id };
        group.add(turf);

        // White Pitch Lines
        const pitchBorder = new THREE.Mesh(
          new THREE.BoxGeometry(w - 2, 0.28, d - 2),
          new THREE.MeshBasicMaterial({ color: '#ffffff', wireframe: true })
        );
        pitchBorder.position.set(0, 0.15, 0);
        group.add(pitchBorder);

        // Spectator Pavilion Building
        const pavilion = new THREE.Mesh(
          new THREE.BoxGeometry(w * 0.7, h, 3.5),
          new THREE.MeshPhongMaterial({ color: '#ffffff' })
        );
        pavilion.position.set(0, h / 2, -d / 2 + 1.8);
        pavilion.castShadow = true;
        pavilion.userData = { buildingId: b.id };
        group.add(pavilion);

        const pavRoof = new THREE.Mesh(
          new THREE.BoxGeometry(w * 0.75, 0.6, 4.4),
          new THREE.MeshPhongMaterial({ color: b.color })
        );
        pavRoof.position.set(0, h + 0.3, -d / 2 + 1.8);
        pavRoof.userData = { buildingId: b.id };
        group.add(pavRoof);
      } else if (b.id === 'parking') {
        // Paved Parking Lot + Covered Sheds + Mini Cars
        const tarmac = new THREE.Mesh(
          new THREE.BoxGeometry(w, 0.2, d),
          new THREE.MeshLambertMaterial({ color: '#475569' })
        );
        tarmac.position.set(0, 0.1, 0);
        tarmac.userData = { buildingId: b.id };
        group.add(tarmac);

        const canopy = new THREE.Mesh(
          new THREE.BoxGeometry(w - 2, 0.35, 3.4),
          new THREE.MeshPhongMaterial({ color: '#5e72e4' })
        );
        canopy.position.set(0, 2.2, -2.5);
        canopy.castShadow = true;
        canopy.userData = { buildingId: b.id };
        group.add(canopy);

        // Mini Stylized Cars
        const carColors = ['#f5365c', '#11cdef', '#fb6340', '#ffffff', '#2dce89'];
        for (let i = 0; i < 5; i++) {
          const car = new THREE.Mesh(
            new THREE.BoxGeometry(1.5, 0.85, 2.6),
            new THREE.MeshPhongMaterial({ color: carColors[i] })
          );
          car.position.set(-w / 2 + 2.5 + i * 2.8, 0.55, 2.2);
          car.castShadow = true;
          car.userData = { buildingId: b.id };
          group.add(car);
        }
      } else {
        // Standard & Signature Architectural Buildings
        const bodyMat = new THREE.MeshPhongMaterial({
          color: '#ffffff',
          shininess: 35
        });
        const mainBox = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), bodyMat);
        mainBox.position.set(0, h / 2, 0);
        mainBox.castShadow = true;
        mainBox.receiveShadow = true;
        mainBox.userData = { buildingId: b.id };
        group.add(mainBox);

        // Colored Roof Cap / Crown
        const roofCrown = new THREE.Mesh(
          new THREE.BoxGeometry(w + 0.5, 0.85, d + 0.5),
          new THREE.MeshPhongMaterial({ color: b.color })
        );
        roofCrown.position.set(0, h + 0.42, 0);
        roofCrown.castShadow = true;
        roofCrown.userData = { buildingId: b.id };
        group.add(roofCrown);

        // Glass Curtain Wall Strips (Front & Back)
        const glassMat = new THREE.MeshPhongMaterial({
          color: '#1e293b',
          emissive: b.accentColor,
          emissiveIntensity: 0.18,
          shininess: 90
        });
        const floorsCount = Math.max(2, Math.floor(h / 2.5));
        for (let f = 0; f < floorsCount; f++) {
          const stripY = 1.6 + f * 2.3;
          if (stripY < h - 0.6) {
            const winStrip = new THREE.Mesh(
              new THREE.BoxGeometry(w * 0.84, 0.95, d + 0.16),
              glassMat
            );
            winStrip.position.set(0, stripY, 0);
            winStrip.userData = { buildingId: b.id };
            group.add(winStrip);
          }
        }

        // Special Architectural Feature for Library (Glass Dome)
        if (b.id === 'library') {
          const dome = new THREE.Mesh(
            new THREE.SphereGeometry(3.2, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2),
            new THREE.MeshPhongMaterial({
              color: '#11cdef',
              transparent: true,
              opacity: 0.82,
              shininess: 100
            })
          );
          dome.position.set(0, h + 0.8, 0);
          dome.userData = { buildingId: b.id };
          group.add(dome);
        }

        // Special Feature for Auditorium (Stepped Tier Crown)
        if (b.id === 'auditorium') {
          const tier = new THREE.Mesh(
            new THREE.BoxGeometry(w * 0.72, 2.0, d * 0.72),
            new THREE.MeshPhongMaterial({ color: b.accentColor })
          );
          tier.position.set(0, h + 1.4, 0);
          tier.castShadow = true;
          tier.userData = { buildingId: b.id };
          group.add(tier);
        }

        // Entrance Canopy Facing Central Avenue
        const canopyDir = b.position[0] < 0 ? 1 : -1;
        const entranceCanopy = new THREE.Mesh(
          new THREE.BoxGeometry(1.8, 0.4, 3.8),
          new THREE.MeshPhongMaterial({ color: b.accentColor })
        );
        entranceCanopy.position.set((w / 2 + 0.7) * canopyDir, 2.4, 0);
        entranceCanopy.userData = { buildingId: b.id };
        group.add(entranceCanopy);
      }

      scene.add(group);
      buildingMeshesRef.current[b.id] = group;
    });

    // --- Scatter 3D Campus Trees ---
    const trunkMat = new THREE.MeshLambertMaterial({ color: '#78553a' });
    const foliageMat1 = new THREE.MeshLambertMaterial({ color: '#2dce89' });
    const foliageMat2 = new THREE.MeshLambertMaterial({ color: '#24a46d' });

    const treeCoords = [
      [-6, 30], [6, 30], [-6, 22], [6, 22], [-6, 10], [6, 10],
      [-6, -8], [6, -8], [-6, -15], [6, -15], [-6, -28], [6, -28],
      [-32, 22], [-32, 8], [-32, -8], [-32, -24],
      [33, 20], [33, 6], [33, -10], [33, -24],
      [-26, -35], [0, -42], [-12, 34]
    ];

    treeCoords.forEach(([tx, tz], idx) => {
      const treeGroup = new THREE.Group();
      treeGroup.position.set(tx, 0, tz);

      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.38, 1.8, 8), trunkMat);
      trunk.position.y = 0.9;
      trunk.castShadow = true;
      treeGroup.add(trunk);

      const crown = new THREE.Mesh(
        idx % 2 === 0
          ? new THREE.ConeGeometry(1.6, 3.8, 9)
          : new THREE.SphereGeometry(1.65, 10, 10),
        idx % 2 === 0 ? foliageMat1 : foliageMat2
      );
      crown.position.y = idx % 2 === 0 ? 3.2 : 2.8;
      crown.castShadow = true;
      treeGroup.add(crown);

      scene.add(treeGroup);
    });

    // --- Selection Highlight Ring & Floating Beacon ---
    const ringGeo = new THREE.RingGeometry(7.5, 9.2, 36);
    const ringMat = new THREE.MeshBasicMaterial({
      color: '#11cdef',
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85
    });
    const selectionRing = new THREE.Mesh(ringGeo, ringMat);
    selectionRing.rotation.x = -Math.PI / 2;
    selectionRing.position.y = 0.25;
    selectionRing.visible = false;
    scene.add(selectionRing);
    selectionRingRef.current = selectionRing;

    const beaconGeo = new THREE.ConeGeometry(1.3, 3.0, 16);
    const beaconMat = new THREE.MeshPhongMaterial({
      color: '#fb6340',
      emissive: '#fb6340',
      emissiveIntensity: 0.45
    });
    const beacon = new THREE.Mesh(beaconGeo, beaconMat);
    beacon.rotation.x = Math.PI;
    beacon.visible = false;
    scene.add(beacon);
    selectionBeaconRef.current = beacon;

    // --- Route Group Holder ---
    const routeGroup = new THREE.Group();
    scene.add(routeGroup);
    routeGroupRef.current = routeGroup;

    // --- Pointer Interaction (Orbit, Pan, Zoom, Raycast Click/Hover) ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const getIntersectedBuilding = (clientX, clientY) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const allGroups = Object.values(buildingMeshesRef.current) as THREE.Object3D[];
      const intersects = raycaster.intersectObjects(allGroups, true);
      if (intersects.length > 0) {
        let obj = intersects[0].object;
        while (obj && !obj.userData?.buildingId) {
          obj = obj.parent;
        }
        return obj?.userData?.buildingId || null;
      }
      return null;
    };

    const onPointerDown = (e) => {
      const ctrl = controlsStateRef.current;
      ctrl.isDragging = true;
      ctrl.isPanning = e.button === 2 || e.shiftKey;
      ctrl.prevX = e.clientX;
      ctrl.prevY = e.clientY;
      ctrl.dragDistance = 0;
    };

    const onPointerMove = (e) => {
      const ctrl = controlsStateRef.current;
      if (ctrl.isDragging) {
        const dx = e.clientX - ctrl.prevX;
        const dy = e.clientY - ctrl.prevY;
        ctrl.prevX = e.clientX;
        ctrl.prevY = e.clientY;
        ctrl.dragDistance += Math.hypot(dx, dy);

        if (ctrl.isPanning) {
          const panSpeed = 0.08;
          ctrl.desiredTarget.x -= dx * panSpeed;
          ctrl.desiredTarget.z -= dy * panSpeed;
        } else {
          ctrl.desiredTheta -= dx * 0.0065;
          ctrl.desiredPhi = Math.max(0.25, Math.min(1.38, ctrl.desiredPhi - dy * 0.0055));
        }
      } else {
        const hitId = getIntersectedBuilding(e.clientX, e.clientY);
        setHoveredBuildingId(hitId);
        renderer.domElement.style.cursor = hitId ? 'pointer' : 'grab';
      }
    };

    const onPointerUp = (e) => {
      const ctrl = controlsStateRef.current;
      if (ctrl.isDragging && ctrl.dragDistance < 6) {
        const hitId = getIntersectedBuilding(e.clientX, e.clientY);
        if (hitId && onSelectBuilding) {
          onSelectBuilding(hitId);
        }
      }
      ctrl.isDragging = false;
    };

    const onWheel = (e) => {
      e.preventDefault();
      const ctrl = controlsStateRef.current;
      ctrl.desiredRadius = Math.max(28, Math.min(135, ctrl.desiredRadius + e.deltaY * 0.045));
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    domElem.addEventListener('wheel', onWheel, { passive: false });
    domElem.addEventListener('contextmenu', (e) => e.preventDefault());

    // --- Animation Loop ---
    let animFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const ctrl = controlsStateRef.current;

      // Smoothly damp camera controls
      ctrl.theta += (ctrl.desiredTheta - ctrl.theta) * 0.1;
      ctrl.phi += (ctrl.desiredPhi - ctrl.phi) * 0.1;
      ctrl.radius += (ctrl.desiredRadius - ctrl.radius) * 0.1;
      ctrl.target.lerp(ctrl.desiredTarget, 0.1);

      camera.position.x = ctrl.target.x + ctrl.radius * Math.sin(ctrl.phi) * Math.sin(ctrl.theta);
      camera.position.y = ctrl.target.y + ctrl.radius * Math.cos(ctrl.phi);
      camera.position.z = ctrl.target.z + ctrl.radius * Math.sin(ctrl.phi) * Math.cos(ctrl.theta);
      camera.lookAt(ctrl.target);

      // Animate Selection Ring & Beacon
      if (selectionRingRef.current && selectionRingRef.current.visible) {
        const scale = 1 + Math.sin(elapsed * 3.5) * 0.08;
        selectionRingRef.current.scale.set(scale, scale, 1);
      }
      if (selectionBeaconRef.current && selectionBeaconRef.current.visible) {
        selectionBeaconRef.current.position.y =
          selectionBeaconRef.current.userData.baseY + Math.sin(elapsed * 4) * 0.9;
        selectionBeaconRef.current.rotation.y = elapsed * 2;
      }

      // Animate Route Pulsing Markers
      if (routeChevronsRef.current.length > 0) {
        routeChevronsRef.current.forEach((item) => {
          const t = (elapsed * 0.28 + item.offset) % 1;
          const pos = item.curve.getPointAt(t);
          item.mesh.position.copy(pos);
        });
      }

      // Project 3D Building Positions to 2D Floating Labels
      const cw = container.clientWidth;
      const ch = container.clientHeight;
      buildings.forEach((b) => {
        const el = labelRefs.current[b.id];
        if (!el) return;
        const worldVec = new THREE.Vector3(b.position[0], b.size[1] + 2.6, b.position[2]);
        worldVec.project(camera);

        if (worldVec.z > 1) {
          el.style.opacity = '0';
          el.style.pointerEvents = 'none';
        } else {
          const x = (worldVec.x * 0.5 + 0.5) * cw;
          const y = (-(worldVec.y * 0.5) + 0.5) * ch;
          el.style.transform = `translate(-50%, -100%) translate(${x}px, ${y}px)`;
          el.style.opacity = '1';
          el.style.pointerEvents = 'auto';
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // --- Responsive Resize Handler ---
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameId);
      domElem.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      domElem.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [buildings]);

  // Update Camera Focus & Selection Ring when `selectedBuildingId` changes
  useEffect(() => {
    const selectedB = buildings.find((b) => b.id === selectedBuildingId);
    const ctrl = controlsStateRef.current;

    if (selectedB) {
      ctrl.desiredTarget.set(selectedB.position[0], 0, selectedB.position[2]);
      ctrl.desiredRadius = 46;
      if (selectionRingRef.current) {
        selectionRingRef.current.position.set(selectedB.position[0], 0.25, selectedB.position[2]);
        selectionRingRef.current.visible = true;
      }
      if (selectionBeaconRef.current) {
        const baseY = selectedB.size[1] + 4.2;
        selectionBeaconRef.current.position.set(selectedB.position[0], baseY, selectedB.position[2]);
        selectionBeaconRef.current.userData.baseY = baseY;
        selectionBeaconRef.current.visible = true;
      }
    } else {
      if (selectionRingRef.current) selectionRingRef.current.visible = false;
      if (selectionBeaconRef.current) selectionBeaconRef.current.visible = false;
    }
  }, [selectedBuildingId, buildings]);

  // Update Building Opacity when Category Filter changes
  useEffect(() => {
    buildings.forEach((b) => {
      const group = buildingMeshesRef.current[b.id];
      if (!group) return;
      const matches = categoryFilter === 'All' || b.category === categoryFilter;
      group.scale.setScalar(matches ? 1 : 0.85);
    });
  }, [categoryFilter, buildings]);

  // Render Animated 3D Route Tube & Moving Beacons when `routeData` changes
  useEffect(() => {
    const routeGroup = routeGroupRef.current;
    if (!routeGroup) return;

    while (routeGroup.children.length > 0) {
      routeGroup.remove(routeGroup.children[0]);
    }
    routeChevronsRef.current = [];

    if (!routeData || !routeData.points || routeData.points.length < 2) return;

    const vecPoints = routeData.points.map((pt) => new THREE.Vector3(pt[0], 0.55, pt[2]));
    const curve = new THREE.CatmullRomCurve3(vecPoints, false, 'catmullrom', 0.12);

    // Glowing Pathway Tube
    const tubeGeo = new THREE.TubeGeometry(curve, 64, 0.48, 12, false);
    const tubeMat = new THREE.MeshPhongMaterial({
      color: '#2dce89',
      emissive: '#2dce89',
      emissiveIntensity: 0.45
    });
    const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
    routeGroup.add(tubeMesh);

    // Start & End Pillars
    const startPin = new THREE.Mesh(
      new THREE.CylinderGeometry(1.1, 1.1, 0.5, 20),
      new THREE.MeshBasicMaterial({ color: '#5e72e4' })
    );
    startPin.position.copy(vecPoints[0]);
    routeGroup.add(startPin);

    const endPin = new THREE.Mesh(
      new THREE.CylinderGeometry(1.4, 1.4, 0.6, 20),
      new THREE.MeshBasicMaterial({ color: '#fb6340' })
    );
    endPin.position.copy(vecPoints[vecPoints.length - 1]);
    routeGroup.add(endPin);

    // Animated Pulsing Spheres Flowing Along Route
    const sphereGeo = new THREE.SphereGeometry(0.75, 14, 14);
    const sphereMat = new THREE.MeshBasicMaterial({ color: '#ffffff' });
    for (let i = 0; i < 6; i++) {
      const sMesh = new THREE.Mesh(sphereGeo, sphereMat);
      routeGroup.add(sMesh);
      routeChevronsRef.current.push({
        mesh: sMesh,
        curve,
        offset: i / 6
      });
    }

    // Frame both start and destination
    const midX = (vecPoints[0].x + vecPoints[vecPoints.length - 1].x) / 2;
    const midZ = (vecPoints[0].z + vecPoints[vecPoints.length - 1].z) / 2;
    controlsStateRef.current.desiredTarget.set(midX, 0, midZ);
    controlsStateRef.current.desiredRadius = 68;
  }, [routeData]);

  // Camera View Presets Handler
  const applyCameraPreset = useCallback((preset) => {
    const ctrl = controlsStateRef.current;
    if (preset === 'default') {
      ctrl.desiredTarget.set(0, 0, 2);
      ctrl.desiredTheta = 0.55;
      ctrl.desiredPhi = 0.92;
      ctrl.desiredRadius = 78;
    } else if (preset === 'top') {
      ctrl.desiredTarget.set(0, 0, 0);
      ctrl.desiredTheta = 0;
      ctrl.desiredPhi = 0.26;
      ctrl.desiredRadius = 92;
    } else if (preset === 'entrance') {
      ctrl.desiredTarget.set(0, 0, 34);
      ctrl.desiredTheta = 0.05;
      ctrl.desiredPhi = 1.12;
      ctrl.desiredRadius = 42;
    } else if (preset === 'zoom-in') {
      ctrl.desiredRadius = Math.max(30, ctrl.desiredRadius - 14);
    } else if (preset === 'zoom-out') {
      ctrl.desiredRadius = Math.min(125, ctrl.desiredRadius + 14);
    }
  }, []);

  useEffect(() => {
    if (cameraPresetTrigger) {
      applyCameraPreset(cameraPresetTrigger.type);
    }
  }, [cameraPresetTrigger, applyCameraPreset]);

  return (
    <div className={`relative w-full ${heightClass} rounded-xl overflow-hidden bg-[#eef2f9] select-none`}>
      {/* WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-full" />

      {/* 2D Projected HTML Argon Building Labels */}
      <div
        className={`absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-200 ${
          showLabels ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {buildings.map((b) => {
          const isSelected = selectedBuildingId === b.id;
          const isHovered = hoveredBuildingId === b.id;
          const isRouteStart = routeData?.startBuilding?.id === b.id;
          const isRouteEnd = routeData?.endBuilding?.id === b.id;
          const matchesCategory = categoryFilter === 'All' || b.category === categoryFilter;

          if (!matchesCategory && !isSelected && !isRouteStart && !isRouteEnd) return null;

          return (
            <div
              key={b.id}
              ref={(el) => {
                labelRefs.current[b.id] = el;
              }}
              onClick={() => onSelectBuilding && onSelectBuilding(b.id)}
              className="absolute top-0 left-0 transition-opacity duration-150 cursor-pointer"
              style={{ willChange: 'transform' }}
            >
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide shadow-md border transition-transform ${
                  isSelected
                    ? 'bg-[#5e72e4] text-white border-white scale-110 ring-4 ring-[#5e72e4]/30'
                    : isRouteEnd
                    ? 'bg-[#fb6340] text-white border-white scale-105'
                    : isRouteStart
                    ? 'bg-[#2dce89] text-white border-white scale-105'
                    : isHovered
                    ? 'bg-[#172b4d] text-white border-white scale-105'
                    : 'bg-white/95 text-[#172b4d] border-[#e9ecef] hover:scale-105'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{
                    backgroundColor:
                      isSelected || isRouteEnd || isRouteStart ? '#ffffff' : b.color
                  }}
                />
                <span className="whitespace-nowrap">{b.shortName}</span>
                {isRouteStart && (
                  <span className="ml-1 px-1.5 py-0.2 bg-black/20 rounded text-[9px] uppercase">
                    Start
                  </span>
                )}
                {isRouteEnd && (
                  <span className="ml-1 px-1.5 py-0.2 bg-black/20 rounded text-[9px] uppercase">
                    Dest
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Camera Controls HUD (Bottom Right) */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-1.5 z-10">
        <div className="bg-white/95 backdrop-blur-md rounded-xl p-1.5 shadow-[0_0_2rem_0_rgba(136,152,170,0.25)] border border-[#e9ecef] flex flex-col gap-1">
          <button
            type="button"
            onClick={() => applyCameraPreset('zoom-in')}
            title="Zoom In"
            className="p-2 rounded-lg text-[#525f7f] hover:text-[#5e72e4] hover:bg-[#f6f9fc] transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => applyCameraPreset('zoom-out')}
            title="Zoom Out"
            className="p-2 rounded-lg text-[#525f7f] hover:text-[#5e72e4] hover:bg-[#f6f9fc] transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <div className="h-px bg-[#e9ecef] my-0.5" />
          <button
            type="button"
            onClick={() => applyCameraPreset('top')}
            title="Top-Down Map View"
            className="p-2 rounded-lg text-[#525f7f] hover:text-[#5e72e4] hover:bg-[#f6f9fc] transition-colors text-[10px] font-bold uppercase"
          >
            2D
          </button>
          <button
            type="button"
            onClick={() => applyCameraPreset('entrance')}
            title="Main Entrance View"
            className="p-2 rounded-lg text-[#525f7f] hover:text-[#5e72e4] hover:bg-[#f6f9fc] transition-colors"
          >
            <DoorOpen className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              applyCameraPreset('default');
              if (onSelectBuilding) onSelectBuilding(null);
            }}
            title="Reset Default Campus View"
            className="p-2 rounded-lg text-[#5e72e4] bg-[#5e72e4]/10 hover:bg-[#5e72e4] hover:text-white transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Controls Legend Pill (Bottom Left) */}
      <div className="absolute bottom-4 left-4 hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-[0_0_2rem_0_rgba(136,152,170,0.2)] border border-[#e9ecef] text-xs text-[#525f7f] z-10">
        <span className="flex items-center gap-1.5 font-semibold text-[#172b4d]">
          <Compass className="w-3.5 h-3.5 text-[#5e72e4]" />
          3D Controls:
        </span>
        <span>Left-Drag: Orbit</span>
        <span className="text-[#cbd5e1]">•</span>
        <span>Shift+Drag: Pan</span>
        <span className="text-[#cbd5e1]">•</span>
        <span>Scroll: Zoom</span>
        <span className="text-[#cbd5e1]">•</span>
        <span>Click Building: Inspect</span>
      </div>
    </div>
  );
}
