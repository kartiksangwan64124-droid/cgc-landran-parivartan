import { CampusBuilding, CampusRoute } from '../types';

// Campus Waypoint Road Graph for Realistic Dijkstra Navigation
export const ROAD_GRAPH: Record<string, { pos: [number, number, number]; neighbors: string[] }> = {
  main_gate: { pos: [22, 0.35, -38], neighbors: ['junction_north'] },
  junction_north: { pos: [10, 0.35, -20], neighbors: ['main_gate', 'junction_blk6', 'junction_blk3', 'junction_central'] },
  junction_blk6: { pos: [-2, 0.35, -18], neighbors: ['junction_north', 'junction_kalpana'] },
  junction_kalpana: { pos: [-14, 0.35, -16], neighbors: ['junction_blk6', 'junction_coe'] },
  junction_coe: { pos: [-14, 0.35, -4], neighbors: ['junction_kalpana', 'junction_count', 'junction_blk11'] },
  junction_blk11: { pos: [-26, 0.35, 6], neighbors: ['junction_coe', 'junction_parivartan'] },
  junction_parivartan: { pos: [-11, 0.35, 18], neighbors: ['junction_blk11', 'junction_santhikunj', 'junction_snb'] },
  junction_count: { pos: [-5, 0.35, -2], neighbors: ['junction_coe', 'junction_snb'] },
  junction_central: { pos: [6, 0.35, -12], neighbors: ['junction_north', 'junction_snb', 'junction_cdx'] },
  junction_blk3: { pos: [21, 0.35, -12], neighbors: ['junction_north', 'junction_cdx'] },
  junction_cdx: { pos: [14, 0.35, -2], neighbors: ['junction_central', 'junction_blk3', 'junction_blk4', 'junction_snb'] },
  junction_blk4: { pos: [24, 0.35, 1], neighbors: ['junction_cdx', 'junction_basera'] },
  junction_snb: { pos: [2, 0.35, -2], neighbors: ['junction_central', 'junction_count', 'junction_parivartan', 'junction_herbel'] },
  junction_basera: { pos: [15, 0.35, 7], neighbors: ['junction_blk4', 'junction_thomson', 'junction_herbel'] },
  junction_herbel: { pos: [12, 0.35, 18], neighbors: ['junction_snb', 'junction_basera', 'junction_santhikunj'] },
  junction_santhikunj: { pos: [10, 0.35, 27], neighbors: ['junction_herbel', 'junction_parivartan', 'junction_thomson'] },
  junction_thomson: { pos: [23, 0.35, 19], neighbors: ['junction_basera', 'junction_santhikunj'] }
};

// Map each building to its nearest entrance junction on the road
export const BUILDING_TO_ROAD: Record<string, string> = {
  'block-1': 'junction_north',
  'block-6': 'junction_blk6',
  'kalpana-hostel': 'junction_kalpana',
  'coe-ground': 'junction_coe',
  'block-11-10': 'junction_blk11',
  'parivartan-ground': 'junction_parivartan',
  'count': 'junction_count',
  'sip-n-bit': 'junction_snb',
  'central-park': 'junction_central',
  'block-3': 'junction_blk3',
  'cdx': 'junction_cdx',
  'block-4-tagore': 'junction_blk4',
  'basera-hostel': 'junction_basera',
  'herbel-garden': 'junction_herbel',
  'santhikunj-hostel': 'junction_santhikunj',
  'block-8-thomson': 'junction_thomson'
};

// Dijkstra Shortest Path Finder
export function findShortestRoadPath(startJunction: string, endJunction: string): string[] {
  if (startJunction === endJunction) return [startJunction];

  const distances: Record<string, number> = {};
  const previous: Record<string, string | null> = {};
  const queue = new Set<string>(Object.keys(ROAD_GRAPH));

  for (const node of Object.keys(ROAD_GRAPH)) {
    distances[node] = Infinity;
    previous[node] = null;
  }
  distances[startJunction] = 0;

  while (queue.size > 0) {
    let current: string | null = null;
    let minDist = Infinity;
    for (const node of queue) {
      if (distances[node] < minDist) {
        minDist = distances[node];
        current = node;
      }
    }

    if (!current || distances[current] === Infinity) break;
    if (current === endJunction) break;

    queue.delete(current);

    const neighbors = ROAD_GRAPH[current]?.neighbors || [];
    for (const neighbor of neighbors) {
      if (!queue.has(neighbor)) continue;
      const posA = ROAD_GRAPH[current].pos;
      const posB = ROAD_GRAPH[neighbor].pos;
      const d = Math.hypot(posA[0] - posB[0], posA[2] - posB[2]);
      const alt = distances[current] + d;
      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        previous[neighbor] = current;
      }
    }
  }

  const path: string[] = [];
  let curr: string | null = endJunction;
  while (curr) {
    path.unshift(curr);
    curr = previous[curr];
  }
  return path.length > 1 && path[0] === startJunction ? path : [startJunction, endJunction];
}

// Generate turn-by-turn narrative instructions for visitors
export function generateStepByStepDirections(startBuilding: any, endBuilding: any, pathJunctions: string[]) {
  const steps: any[] = [];
  steps.push({
    title: `Start at ${startBuilding.name}`,
    detail: `Exit the building foyer and proceed onto the campus road network toward ${startBuilding.shortName} junction.`,
    icon: 'start'
  });

  for (let i = 0; i < pathJunctions.length - 1; i++) {
    const curJ = pathJunctions[i];
    const nxtJ = pathJunctions[i + 1];
    const p1 = ROAD_GRAPH[curJ].pos;
    const p2 = ROAD_GRAPH[nxtJ].pos;
    const distMeters = Math.round(Math.hypot(p2[0] - p1[0], p2[2] - p1[2]) * 8);

    let instruction = `Continue along the paved pathway (${distMeters} m)`;
    if (nxtJ.includes('central')) instruction = `Head toward the Central Park promenade past the green lawns (${distMeters} m)`;
    else if (nxtJ.includes('snb')) instruction = `Walk toward the central Sip-n-bit dining hub (${distMeters} m)`;
    else if (nxtJ.includes('coe')) instruction = `Follow the avenue flanking the COE Sports Ground (${distMeters} m)`;
    else if (nxtJ.includes('cdx')) instruction = `Walk past CDX Cafe and outdoor lounge benches (${distMeters} m)`;
    else if (nxtJ.includes('north')) instruction = `Approach the North Academic Ring near Block 1 (${distMeters} m)`;
    else if (nxtJ.includes('parivartan')) instruction = `Head toward the Parivartan festival arena grounds (${distMeters} m)`;

    steps.push({
      title: `Step ${i + 1}: ${instruction}`,
      detail: `Look for campus milestone signage. Paved road is illuminated and fully accessible.`,
      icon: 'arrow'
    });
  }

  steps.push({
    title: `Arrive at ${endBuilding.name}`,
    detail: `Enter through the primary glass portico. You have reached your destination (${endBuilding.floors}).`,
    icon: 'destination'
  });

  return steps;
}

export function computeCampusRoute(
  startBuilding: CampusBuilding,
  endBuilding: CampusBuilding
): CampusRoute {
  const startJunc = BUILDING_TO_ROAD[startBuilding.id] || 'junction_north';
  const endJunc = BUILDING_TO_ROAD[endBuilding.id] || 'junction_snb';
  const pathJunctions = findShortestRoadPath(startJunc, endJunc);

  const points: [number, number, number][] = [
    (startBuilding.roadPoint || startBuilding.position) as [number, number, number],
    ...pathJunctions.map((j) => (ROAD_GRAPH[j]?.pos || [0, 0.35, 0]) as [number, number, number]),
    (endBuilding.roadPoint || endBuilding.position) as [number, number, number]
  ];

  let totalDistMeters = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];
    totalDistMeters += Math.hypot(p2[0] - p1[0], p2[2] - p1[2]) * 8;
  }
  const roundedDist = Math.round(totalDistMeters);
  const walkMinutes = Math.max(1, Math.round(roundedDist / 70));

  const steps = generateStepByStepDirections(startBuilding, endBuilding, pathJunctions);

  return {
    startBuilding,
    endBuilding,
    points,
    distanceMeters: roundedDist,
    walkMinutes,
    steps: steps as any
  };
}
