import type { BuildingSelection } from '@/types/property';
// Loaded only by a future renderer switch. No Canvas, models or Three.js in phase one.
export default function BuildingExperience3D({ selectedFloor }: BuildingSelection) {
  return (
    <div role="status">
      The building model is being prepared{selectedFloor ? ` for floor ${selectedFloor}` : ''}.
      Please use the floor selector.
    </div>
  );
}
