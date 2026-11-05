import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { ZoomIn, ZoomOut, RotateCcw, Compass as CompassIcon } from 'lucide-react';
import { ROAD_GRAPH, BUILDING_TO_ROAD, findShortestRoadPath } from '../../utils/routing';

export interface Campus3DViewportProps {
  buildings: any[];
  selectedBuilding?: any;
  selectedBuildingId?: string;
  onSelectBuilding: (b: any) => void;
  routePath?: string[] | null;
  routeData?: any;
  viewPreset?: string;
  isNightMode?: boolean;
  activeFilter?: string;
  categoryFilter?: string;
  showLabels?: boolean;
  heightClass?: string;
  cameraPresetTrigger?: any;
}

export function Campus3DViewport({
  buildings,
  selectedBuilding,
  selectedBuildingId,
  onSelectBuilding,
  routePath = null,
  routeData = null,
  viewPreset = 'isometric',
  isNightMode = false,
  activeFilter,
  categoryFilter = 'All',
  showLabels = true,
  heightClass = 'h-[580px]',
  cameraPresetTrigger
}: Campus3DViewportProps) {
  const effectiveSelectedBuilding = selectedBuilding || (selectedBuildingId ? buildings.find((b) => b.id === selectedBuildingId) : null);
  const effectiveFilter = activeFilter || categoryFilter || 'All';
  const effectiveRoutePath = routePath || (routeData?.startBuilding && routeData?.endBuilding
    ? findShortestRoadPath(
        BUILDING_TO_ROAD[routeData.startBuilding.id] || 'junction_north',
        BUILDING_TO_ROAD[routeData.endBuilding.id] || 'junction_snb'
      )
    : null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const buildingMeshesMapRef = useRef<Map<string, THREE.Group>>(new Map());
  const routeMeshRef = useRef<THREE.Mesh | null>(null);
  const pulseParticlesRef = useRef<any>(null);
  const isDraggingRef = useRef(false);
  const prevMousePosRef = useRef({ x: 0, y: 0 });

  // Camera animation target state
  const cameraTargetRef = useRef({
    pos: new THREE.Vector3(0, 52, 62),
    lookAt: new THREE.Vector3(0, 0, 0),
    currentLookAt: new THREE.Vector3(0, 0, 0)
  });

  // Handle building click raycasting
  const handlePointerClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const container = containerRef.current;
      if (!container || !rendererRef.current || !cameraRef.current || !sceneRef.current) return;
      const rect = container.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, cameraRef.current);

      const clickableMeshes: THREE.Object3D[] = [];
      buildingMeshesMapRef.current.forEach((mesh) => {
        clickableMeshes.push(mesh);
      });

      const intersects = raycaster.intersectObjects(clickableMeshes, true);
      if (intersects.length > 0) {
        let hit: any = intersects[0].object;
        while (hit && !hit.userData?.buildingId && hit.parent) {
          hit = hit.parent;
        }
        if (hit && hit.userData?.buildingId) {
          const found = buildings.find((b) => b.id === hit.userData.buildingId);
          if (found) {
            if (selectedBuildingId !== undefined) {
              onSelectBuilding(found.id);
            } else {
              onSelectBuilding(found);
            }
          }
        }
      }
    },
    [buildings, onSelectBuilding, selectedBuildingId]
  );

  // Mount Three.js Scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(isNightMode ? 0x0f172a : 0xf1f5f9);
    scene.fog = new THREE.FogExp2(isNightMode ? 0x0f172a : 0xf1f5f9, 0.0075);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.5, 500);
    camera.position.set(0, 54, 64);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.replaceChildren(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(isNightMode ? 0x334155 : 0xffffff, isNightMode ? 0.9 : 1.25);
    ambientLight.name = 'ambient';
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(isNightMode ? 0x818cf8 : 0xfffbeb, isNightMode ? 1.0 : 1.7);
    dirLight.position.set(45, 60, 35);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 180;
    dirLight.shadow.camera.left = -60;
    dirLight.shadow.camera.right = 60;
    dirLight.shadow.camera.top = 60;
    dirLight.shadow.camera.bottom = -60;
    dirLight.shadow.bias = -0.0005;
    dirLight.name = 'sunLight';
    scene.add(dirLight);

    const hemiLight = new THREE.HemisphereLight(
      isNightMode ? 0x1e1b4b : 0xe0e7ff,
      isNightMode ? 0x020617 : 0xa7f3d0,
      isNightMode ? 0.6 : 0.8
    );
    scene.add(hemiLight);

    // 5. Ground / Campus Base Terrain
    const groundGeo = new THREE.PlaneGeometry(160, 160);
    const groundMat = new THREE.MeshStandardMaterial({
      color: isNightMode ? 0x1e293b : 0xdcfce7,
      roughness: 0.88,
      metalness: 0.05
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // Subtle campus grid lines
    const gridHelper = new THREE.GridHelper(160, 40, isNightMode ? 0x334155 : 0x86efac, isNightMode ? 0x1e293b : 0xbbf7d0);
    gridHelper.position.y = 0.02;
    scene.add(gridHelper);

    // 6. KHAPAR-BANUR ROAD (Arterial Boundary at North-East from map)
    const khaparGeo = new THREE.PlaneGeometry(12, 140);
    const khaparMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.65
    });
    const khaparRoad = new THREE.Mesh(khaparGeo, khaparMat);
    khaparRoad.rotation.x = -Math.PI / 2;
    khaparRoad.rotation.z = Math.PI / 4.2;
    khaparRoad.position.set(38, 0.08, -32);
    khaparRoad.receiveShadow = true;
    scene.add(khaparRoad);

    // Khapar Road Center White Dashes
    const dashGroup = new THREE.Group();
    for (let i = -60; i < 60; i += 6) {
      const dashGeo = new THREE.PlaneGeometry(0.5, 3.2);
      const dashMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
      const dash = new THREE.Mesh(dashGeo, dashMat);
      dash.rotation.x = -Math.PI / 2;
      dash.rotation.z = Math.PI / 4.2;
      dash.position.set(38 + i * 0.68, 0.12, -32 + i * 0.74);
      dashGroup.add(dash);
    }
    scene.add(dashGroup);

    // 7. Internal Campus Roads matching the clean layout
    const internalRoadMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      roughness: 0.7
    });

    const createPavedRoad = (w: number, h: number, x: number, z: number, rotY = 0) => {
      const geo = new THREE.PlaneGeometry(w, h);
      const mesh = new THREE.Mesh(geo, internalRoadMat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.rotation.z = rotY;
      mesh.position.set(x, 0.05, z);
      mesh.receiveShadow = true;
      scene.add(mesh);
    };

    // Main Entry Spine from Khapar-Banur Road
    createPavedRoad(4.5, 30, 16, -26, -0.2);
    // North Ring Avenue (Connecting Block 1 -> Block 6 -> Kalpana)
    createPavedRoad(4.0, 36, -3, -20, Math.PI / 2);
    // West Avenue (Flanking COE Ground and Block 11/10)
    createPavedRoad(4.2, 54, -18, 0, 0.18);
    // Central Spine (Between Central Park, Sip-n-bit and Herbel Garden)
    createPavedRoad(4.5, 48, 6, 4, 0);
    // East Ring Avenue (Block 3 -> CDX -> Block 4 -> Basera -> Thomson)
    createPavedRoad(4.0, 52, 22, 5, -0.05);
    // Transverse Connectors
    createPavedRoad(3.8, 30, 2, -2, Math.PI / 2);
    createPavedRoad(3.8, 34, 4, 18, Math.PI / 2);

    // 8. Low-Poly Trees along roads and gardens
    const treeGroup = new THREE.Group();
    const treePositions = [
      [14, -8], [18, -8], [10, -8], [14, -20],
      [18, -20], [10, -20], [-10, 14], [-12, 17],
      [-14, 20], [-16, 23], [14, 14], [18, 14],
      [22, 14], [25, 14], [-4, -8], [-4, -2],
      [-6, 4], [28, -8], [28, 4], [38, 4],
      [-28, -22], [-22, -30], [-8, -32], [28, -32]
    ];

    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.9 });
    const foliageMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.6 });
    const foliageMatLight = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.6 });

    treePositions.forEach(([tx, tz], i) => {
      const tree = new THREE.Group();
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.35, 1.8, 6), trunkMat);
      trunk.position.y = 0.9;
      trunk.castShadow = true;
      tree.add(trunk);

      const fMat = i % 2 === 0 ? foliageMat : foliageMatLight;
      const foliage1 = new THREE.Mesh(new THREE.ConeGeometry(1.6, 2.6, 6), fMat);
      foliage1.position.y = 2.4;
      foliage1.castShadow = true;
      tree.add(foliage1);

      const foliage2 = new THREE.Mesh(new THREE.ConeGeometry(1.2, 2.0, 6), fMat);
      foliage2.position.y = 3.6;
      foliage2.castShadow = true;
      tree.add(foliage2);

      tree.position.set(tx, 0, tz);
      tree.scale.setScalar(0.85 + (i % 4) * 0.12);
      treeGroup.add(tree);
    });
    scene.add(treeGroup);

    // 9. Central Park Fountain
    const fountainGroup = new THREE.Group();
    const fBase = new THREE.Mesh(
      new THREE.CylinderGeometry(3.5, 3.8, 0.6, 16),
      new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.4 })
    );
    fBase.position.y = 0.3;
    fountainGroup.add(fBase);

    const fWater = new THREE.Mesh(
      new THREE.CylinderGeometry(3.2, 3.2, 0.62, 16),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.1, metalness: 0.8, transparent: true, opacity: 0.85 })
    );
    fWater.position.y = 0.35;
    fountainGroup.add(fWater);

    const fPillar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.6, 0.8, 2.0, 12),
      new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.3 })
    );
    fPillar.position.y = 1.0;
    fountainGroup.add(fPillar);
    fountainGroup.position.set(14, 0, -14);
    scene.add(fountainGroup);

    // 10. Construct 3D Buildings from dataset
    const meshesMap = new Map();

    buildings.forEach((b) => {
      const bGroup = new THREE.Group();
      bGroup.userData = { buildingId: b.id };

      const [w, h, d] = b.size;
      const baseColor = new THREE.Color(b.color);

      // Distinct geometry based on building shape
      if (b.shape === 'turf' || b.shape === 'park' || b.shape === 'court') {
        const turfGeo = new THREE.BoxGeometry(w, h, d);
        const turfMat = new THREE.MeshStandardMaterial({
          color: b.id === 'count' ? 0xf97316 : b.id === 'coe-ground' ? 0x22c55e : 0x16a34a,
          roughness: 0.75,
          metalness: 0.05
        });
        const turfMesh = new THREE.Mesh(turfGeo, turfMat);
        turfMesh.position.y = h / 2;
        turfMesh.receiveShadow = true;
        bGroup.add(turfMesh);

        const curbGeo = new THREE.BoxGeometry(w + 0.6, 0.45, d + 0.6);
        const curbMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.4 });
        const curb = new THREE.Mesh(curbGeo, curbMat);
        curb.position.y = 0.2;
        bGroup.add(curb);

        if (b.id === 'coe-ground') {
          const lineGeo = new THREE.PlaneGeometry(w - 2, d - 2);
          const lineMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
          const lineMesh = new THREE.Mesh(lineGeo, lineMat);
          lineMesh.rotation.x = -Math.PI / 2;
          lineMesh.position.y = h + 0.02;
          bGroup.add(lineMesh);
        } else if (b.id === 'parivartan-ground') {
          const stageGeo = new THREE.BoxGeometry(8, 2.5, 4.5);
          const stageMat = new THREE.MeshStandardMaterial({ color: 0x1e1b4b, roughness: 0.5 });
          const stage = new THREE.Mesh(stageGeo, stageMat);
          stage.position.set(0, 1.25, -d / 3);
          stage.castShadow = true;
          bGroup.add(stage);

          const archGeo = new THREE.BoxGeometry(8.2, 0.4, 0.4);
          const archMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.6 });
          const arch = new THREE.Mesh(archGeo, archMat);
          arch.position.set(0, 3.2, -d / 3);
          bGroup.add(arch);
        }
      } else if (b.shape === 'twin') {
        const wingW = w * 0.42;
        const wingGeo = new THREE.BoxGeometry(wingW, h, d);
        const mainMat = new THREE.MeshStandardMaterial({
          color: baseColor,
          roughness: 0.35,
          metalness: 0.2
        });

        const wing1 = new THREE.Mesh(wingGeo, mainMat);
        wing1.position.set(-w * 0.28, h / 2, 0);
        wing1.castShadow = true;
        wing1.receiveShadow = true;
        bGroup.add(wing1);

        const wing2 = new THREE.Mesh(wingGeo, mainMat);
        wing2.position.set(w * 0.28, h / 2, 0);
        wing2.castShadow = true;
        wing2.receiveShadow = true;
        bGroup.add(wing2);

        const bridgeGeo = new THREE.BoxGeometry(w * 0.6, 2.2, 4);
        const bridgeMat = new THREE.MeshStandardMaterial({
          color: 0x38bdf8,
          roughness: 0.1,
          metalness: 0.7,
          transparent: true,
          opacity: 0.75
        });
        const bridge = new THREE.Mesh(bridgeGeo, bridgeMat);
        bridge.position.set(0, h * 0.65, 0);
        bGroup.add(bridge);
      } else {
        const bGeo = new THREE.BoxGeometry(w, h, d);
        const bMat = new THREE.MeshStandardMaterial({
          color: baseColor,
          roughness: 0.35,
          metalness: 0.15
        });
        const mainBlock = new THREE.Mesh(bGeo, bMat);
        mainBlock.position.y = h / 2;
        mainBlock.castShadow = true;
        mainBlock.receiveShadow = true;
        bGroup.add(mainBlock);

        const roofBorderGeo = new THREE.BoxGeometry(w + 0.3, 0.4, d + 0.3);
        const roofBorderMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5 });
        const roofBorder = new THREE.Mesh(roofBorderGeo, roofBorderMat);
        roofBorder.position.y = h + 0.2;
        bGroup.add(roofBorder);

        const utilGeo = new THREE.BoxGeometry(w * 0.35, 1.4, d * 0.35);
        const utilMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.6 });
        const util = new THREE.Mesh(utilGeo, utilMat);
        util.position.set(0, h + 0.7, 0);
        bGroup.add(util);

        const porticoGeo = new THREE.BoxGeometry(w * 0.45, 0.3, 2.5);
        const porticoMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
        const portico = new THREE.Mesh(porticoGeo, porticoMat);
        portico.position.set(0, 1.8, d / 2 + 1.25);
        bGroup.add(portico);

        const windowBandGeo = new THREE.BoxGeometry(w + 0.05, 0.9, d + 0.05);
        const windowBandMat = new THREE.MeshStandardMaterial({
          color: 0x0284c7,
          roughness: 0.15,
          metalness: 0.6,
          transparent: true,
          opacity: 0.8
        });
        for (let floor = 1; floor < 4; floor++) {
          const band = new THREE.Mesh(windowBandGeo, windowBandMat);
          band.position.y = floor * 2.1;
          bGroup.add(band);
        }
      }

      // Highlight Beacon / Floating Pin
      const pinGroup = new THREE.Group();
      pinGroup.name = 'pinIndicator';
      pinGroup.position.set(0, h + 2.8, 0);

      const beaconRingGeo = new THREE.RingGeometry(0.8, 1.3, 16);
      const beaconRingMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(b.accentColor),
        side: THREE.DoubleSide
      });
      const beaconRing = new THREE.Mesh(beaconRingGeo, beaconRingMat);
      beaconRing.rotation.x = -Math.PI / 2;
      pinGroup.add(beaconRing);

      const pinCoreGeo = new THREE.SphereGeometry(0.65, 12, 12);
      const pinCoreMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(b.accentColor),
        emissive: new THREE.Color(b.accentColor),
        emissiveIntensity: 0.6
      });
      const pinCore = new THREE.Mesh(pinCoreGeo, pinCoreMat);
      pinCore.position.y = 0.5;
      pinGroup.add(pinCore);

      bGroup.add(pinGroup);

      // Position building in scene according to map
      bGroup.position.set(b.position[0], 0, b.position[2]);

      if (b.id === 'block-11-10') {
        bGroup.rotation.y = 0.28;
      } else if (b.id === 'block-6') {
        bGroup.rotation.y = -0.15;
      }

      scene.add(bGroup);
      meshesMap.set(b.id, bGroup);
    });

    buildingMeshesMapRef.current = meshesMap;

    // 11. Mouse Drag & Orbit Listeners
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      prevMousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - prevMousePosRef.current.x;
      const deltaY = e.clientY - prevMousePosRef.current.y;
      prevMousePosRef.current = { x: e.clientX, y: e.clientY };

      const cam = cameraRef.current;
      if (!cam) return;

      const theta = -deltaX * 0.006;
      const phi = deltaY * 0.004;

      const offset = cam.position.clone().sub(cameraTargetRef.current.lookAt);
      const radius = offset.length();

      let polar = Math.acos(Math.max(-1, Math.min(1, offset.y / radius)));
      let azim = Math.atan2(offset.x, offset.z);

      azim += theta;
      polar = Math.max(0.15, Math.min(Math.PI / 2.05, polar + phi));

      cam.position.x = cameraTargetRef.current.lookAt.x + radius * Math.sin(polar) * Math.sin(azim);
      cam.position.y = cameraTargetRef.current.lookAt.y + radius * Math.cos(polar);
      cam.position.z = cameraTargetRef.current.lookAt.z + radius * Math.sin(polar) * Math.cos(azim);
      cam.lookAt(cameraTargetRef.current.lookAt);
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const cam = cameraRef.current;
      if (!cam) return;
      const dir = cam.position.clone().sub(cameraTargetRef.current.lookAt);
      const dist = dir.length();
      const factor = e.deltaY > 0 ? 1.08 : 0.92;
      const newDist = Math.max(18, Math.min(130, dist * factor));
      dir.setLength(newDist);
      cam.position.copy(cameraTargetRef.current.lookAt).add(dir);
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    domEl.addEventListener('wheel', onWheel, { passive: false });

    // Touch support for mobile devices
    let touchStartDist = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        prevMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        touchStartDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && isDraggingRef.current) {
        const deltaX = e.touches[0].clientX - prevMousePosRef.current.x;
        const deltaY = e.touches[0].clientY - prevMousePosRef.current.y;
        prevMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

        const cam = cameraRef.current;
        if (!cam) return;

        const theta = -deltaX * 0.007;
        const phi = deltaY * 0.005;

        const offset = cam.position.clone().sub(cameraTargetRef.current.lookAt);
        const radius = offset.length();

        let polar = Math.acos(Math.max(-1, Math.min(1, offset.y / radius)));
        let azim = Math.atan2(offset.x, offset.z);

        azim += theta;
        polar = Math.max(0.18, Math.min(Math.PI / 2.05, polar + phi));

        cam.position.x = cameraTargetRef.current.lookAt.x + radius * Math.sin(polar) * Math.sin(azim);
        cam.position.y = cameraTargetRef.current.lookAt.y + radius * Math.cos(polar);
        cam.position.z = cameraTargetRef.current.lookAt.z + radius * Math.sin(polar) * Math.cos(azim);
        cam.lookAt(cameraTargetRef.current.lookAt);
      } else if (e.touches.length === 2) {
        const currentDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const factor = touchStartDist / currentDist;
        touchStartDist = currentDist;
        const cam = cameraRef.current;
        if (cam) {
          const dir = cam.position.clone().sub(cameraTargetRef.current.lookAt);
          const newDist = Math.max(18, Math.min(130, dir.length() * (factor > 1 ? 1.04 : 0.96)));
          dir.setLength(newDist);
          cam.position.copy(cameraTargetRef.current.lookAt).add(dir);
        }
      }
    };

    domEl.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onMouseUp);

    // 12. Animation Loop
    const clock = new THREE.Clock();
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (cameraRef.current) {
        const cam = cameraRef.current;
        cameraTargetRef.current.currentLookAt.lerp(cameraTargetRef.current.lookAt, 0.06);
        cam.lookAt(cameraTargetRef.current.currentLookAt);

        buildingMeshesMapRef.current.forEach((grp) => {
          const pin = grp.getObjectByName('pinIndicator');
          if (pin) {
            pin.position.y = grp.userData.buildingId === 'block-11-10' ? 14 + Math.sin(elapsedTime * 3) * 0.4 : 10 + Math.sin(elapsedTime * 3) * 0.4;
            pin.rotation.y = elapsedTime * 1.5;
          }
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      window.removeEventListener('resize', handleResize);
      domEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domEl.removeEventListener('wheel', onWheel);
      domEl.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);
      renderer.dispose();
    };
  }, [buildings, isNightMode]);

  // Update Scene Night Mode
  useEffect(() => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;
    scene.background = new THREE.Color(isNightMode ? 0x0b1329 : 0xf1f5f9);
    scene.fog = new THREE.FogExp2(isNightMode ? 0x0b1329 : 0xf1f5f9, 0.0075);

    const ambient = scene.getObjectByName('ambient') as THREE.AmbientLight | undefined;
    if (ambient) {
      ambient.color.set(isNightMode ? 0x3b82f6 : 0xffffff);
      ambient.intensity = isNightMode ? 0.8 : 1.3;
    }

    const sun = scene.getObjectByName('sunLight') as THREE.DirectionalLight | undefined;
    if (sun) {
      sun.color.set(isNightMode ? 0x6366f1 : 0xfffbeb);
      sun.intensity = isNightMode ? 0.9 : 1.8;
    }
  }, [isNightMode]);

  // Update Building Filter Visibilities / Highlight
  useEffect(() => {
    buildingMeshesMapRef.current.forEach((grp, id) => {
      const b = buildings.find((x) => x.id === id);
      const isVisible = effectiveFilter === 'All' || b?.category === effectiveFilter;
      grp.visible = isVisible;

      const pin = grp.getObjectByName('pinIndicator');
      if (pin) {
        pin.visible = isVisible;
        const ring = pin.children[0];
        if (ring && b) {
          const isSelected = effectiveSelectedBuilding?.id === id;
          ring.scale.setScalar(isSelected ? 2.2 : 1.0);
        }
      }
    });
  }, [effectiveFilter, effectiveSelectedBuilding, buildings]);

  // Smooth Camera Gliding when a building is selected
  useEffect(() => {
    if (!effectiveSelectedBuilding || !cameraRef.current) return;
    const [tx, , tz] = effectiveSelectedBuilding.position;
    cameraTargetRef.current.lookAt.set(tx, 4, tz);

    const cam = cameraRef.current;
    const currentDist = cam.position.distanceTo(new THREE.Vector3(tx, 4, tz));
    if (currentDist > 45 || currentDist < 20) {
      cam.position.set(tx + 18, 22, tz + 26);
    }
  }, [effectiveSelectedBuilding]);

  // Camera Presets handler
  useEffect(() => {
    if (!cameraRef.current) return;
    const cam = cameraRef.current;
    if (viewPreset === 'isometric') {
      cameraTargetRef.current.lookAt.set(0, 0, 0);
      cam.position.set(24, 52, 60);
    } else if (viewPreset === 'topdown') {
      cameraTargetRef.current.lookAt.set(0, 0, 0);
      cam.position.set(0, 88, 1);
    } else if (viewPreset === 'gate') {
      cameraTargetRef.current.lookAt.set(0, 0, 0);
      cam.position.set(28, 24, -46);
    }
  }, [viewPreset]);

  // Render 3D Route Curve when Navigation Route is Active
  useEffect(() => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;

    // Remove existing route mesh
    if (routeMeshRef.current) {
      scene.remove(routeMeshRef.current);
      routeMeshRef.current.geometry.dispose();
      if (Array.isArray(routeMeshRef.current.material)) {
        routeMeshRef.current.material.forEach((m) => m.dispose());
      } else {
        routeMeshRef.current.material.dispose();
      }
      routeMeshRef.current = null;
    }
    if (pulseParticlesRef.current) {
      scene.remove(pulseParticlesRef.current);
      pulseParticlesRef.current = null;
    }

    if (!effectiveRoutePath || effectiveRoutePath.length < 2) return;

    // Convert route waypoint names to 3D vectors
    const points = effectiveRoutePath
      .map((nodeName) => {
        const roadNode = ROAD_GRAPH[nodeName];
        if (!roadNode) return null;
        return new THREE.Vector3(roadNode.pos[0], roadNode.pos[1] + 0.35, roadNode.pos[2]);
      })
      .filter(Boolean) as THREE.Vector3[];

    if (points.length < 2) return;

    const curve = new THREE.CatmullRomCurve3(points);
    curve.curveType = 'catmullrom';
    curve.tension = 0.3;

    const tubeGeo = new THREE.TubeGeometry(curve, 64, 0.55, 8, false);
    const tubeMat = new THREE.MeshStandardMaterial({
      color: 0x5e72e4,
      emissive: 0x11cdef,
      emissiveIntensity: 0.85,
      roughness: 0.2
    });

    const routeTube = new THREE.Mesh(tubeGeo, tubeMat);
    scene.add(routeTube);
    routeMeshRef.current = routeTube;

    // Frame camera to enclose the entire route
    const centerPoint = curve.getPoint(0.5);
    cameraTargetRef.current.lookAt.set(centerPoint.x, 2, centerPoint.z);
    if (cameraRef.current) {
      cameraRef.current.position.set(centerPoint.x + 24, 42, centerPoint.z + 36);
    }
  }, [routePath]);

  return (
    <div className="relative w-full h-full select-none overflow-hidden" onClick={handlePointerClick}>
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating 3D Control Bar Overlay */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10 pointer-events-auto">
        <div className="bg-white/95 backdrop-blur-md rounded-xl p-1.5 shadow-xl border border-gray-100 flex flex-col gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              const cam = cameraRef.current;
              if (cam) {
                const dir = cam.position.clone().sub(cameraTargetRef.current.lookAt);
                dir.setLength(Math.max(16, dir.length() * 0.85));
                cam.position.copy(cameraTargetRef.current.lookAt).add(dir);
              }
            }}
            title="Zoom In"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              const cam = cameraRef.current;
              if (cam) {
                const dir = cam.position.clone().sub(cameraTargetRef.current.lookAt);
                dir.setLength(Math.min(130, dir.length() * 1.15));
                cam.position.copy(cameraTargetRef.current.lookAt).add(dir);
              }
            }}
            title="Zoom Out"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              cameraTargetRef.current.lookAt.set(0, 0, 0);
              if (cameraRef.current) cameraRef.current.position.set(24, 52, 60);
            }}
            title="Reset Campus View"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 3D Map Orientation Compass & Attribution */}
      <div className="absolute bottom-4 left-4 z-10 pointer-events-none flex items-center gap-3 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-gray-200">
        <CompassIcon className="w-5 h-5 text-indigo-600 animate-spin-slow" />
        <div className="text-xs font-semibold text-gray-700">
          <span>Map Layout: </span>
          <span className="text-indigo-600 font-bold">CGC Landran Official Schematic</span>
          <span className="text-gray-400 ml-1.5 font-normal">| Drag to Orbit • Scroll to Zoom</span>
        </div>
      </div>
    </div>
  );
}
export default Campus3DViewport;
