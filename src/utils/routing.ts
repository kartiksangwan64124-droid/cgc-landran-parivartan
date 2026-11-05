import { CampusBuilding, CampusRoute, RouteStep } from '../types';
import { CAMPUS_BUILDINGS } from '../data/buildings';

/**
 * Helper utility: Route calculation & turn-by-turn walking generator
 */
export function computeCampusRoute(startId: string, endId: string): CampusRoute | null {
  const startB = CAMPUS_BUILDINGS.find((b) => b.id === startId);
  const endB = CAMPUS_BUILDINGS.find((b) => b.id === endId);
  if (!startB || !endB || startId === endId) return null;

  // Build logical pedestrian pathway along the Central Spine (x = 0)
  const startWp = startB.waypoints || [startB.position];
  const endWp = [...(endB.waypoints || [endB.position])].reverse();

  const startSpinePoint = startWp[startWp.length - 1];
  const endSpinePoint = endWp[0];

  const points3D = [
    [startB.position[0], 0.35, startB.position[2]],
    ...startWp,
    [0, 0.35, startSpinePoint[2]],
    [0, 0.35, endSpinePoint[2]],
    ...endWp,
    [endB.position[0], 0.35, endB.position[2]]
  ];

  // Deduplicate consecutive close points
  const cleanPoints = points3D.filter((pt, idx) => {
    if (idx === 0) return true;
    const prev = points3D[idx - 1];
    const dist = Math.hypot(pt[0] - prev[0], pt[2] - prev[2]);
    return dist > 0.5;
  });

  // Compute schematic distance & walk time
  let totalUnits = 0;
  for (let i = 1; i < cleanPoints.length; i++) {
    totalUnits += Math.hypot(
      cleanPoints[i][0] - cleanPoints[i - 1][0],
      cleanPoints[i][2] - cleanPoints[i - 1][2]
    );
  }
  const schematicMeters = Math.round(totalUnits * 6.5);
  const walkMinutes = Math.max(1, Math.round(schematicMeters / 70));

  // Generate beginner-friendly step-by-step walking directions
  const steps: RouteStep[] = [
    {
      title: `Start at ${startB.name}`,
      detail: `Exit the main doorway of ${startB.shortName} (${startB.code}) and join the paved pedestrian walkway.`,
      icon: 'start'
    }
  ];

  if (Math.abs(startB.position[0]) > 5) {
    steps.push({
      title: 'Join Central Academic Avenue',
      detail: `Walk ${startB.position[0] < 0 ? 'east' : 'west'} along the connecting corridor toward the Central Spine Road.`,
      icon: 'walk'
    });
  }

  const zDiff = endB.position[2] - startB.position[2];
  if (Math.abs(zDiff) > 6) {
    steps.push({
      title: `Head ${zDiff < 0 ? 'North (Up-Campus)' : 'South (Toward Main Gate)'} on Central Avenue`,
      detail: `Follow the tree-lined central boulevard ${
        Math.abs(zDiff) > 25 ? 'past the Central Plaza Fountain ' : ''
      }for approximately ${Math.round(Math.abs(zDiff) * 5.5)}m.`,
      icon: 'straight'
    });
  }

  if (Math.abs(endB.position[0]) > 5) {
    steps.push({
      title: `Turn into the ${endB.position[0] < 0 ? 'West' : 'East'} Zone Pathway`,
      detail: `Take the walkway leading toward ${endB.shortName} (look for the ${endB.category} signage badge ${endB.code}).`,
      icon: 'turn'
    });
  }

  steps.push({
    title: `Arrive at ${endB.name}`,
    detail: `${endB.beginnerTip}`,
    icon: 'finish'
  });

  return {
    startBuilding: startB,
    endBuilding: endB,
    points: cleanPoints as [number, number, number][],
    distanceMeters: schematicMeters,
    walkMinutes,
    steps
  };
}
