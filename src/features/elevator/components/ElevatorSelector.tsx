import Image from 'next/image';
import { elevatorLevels } from '@/data/property';
import { elevatorHotspots } from '../config/hotspots';
import type { LevelId } from '@/types/property';
export function ElevatorSelector({
  selected,
  onSelect,
}: {
  selected: LevelId | null;
  onSelect: (level: LevelId) => void;
}) {
  return (
    <div className="elevator-hotspot-stage">
      <div className="elevator-hotspots" role="group" aria-label="Choose your floor">
        {elevatorLevels.map((level) => {
          const hotspot = elevatorHotspots.find((item) => item.level === level);
          if (!hotspot) return null;

          return (
            <button
              key={level}
              className="elevator-hotspot"
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
              aria-pressed={selected === level}
              aria-label={level === 'UG' ? 'UG, underground garage' : `Floor ${level}`}
              onClick={() => onSelect(level)}
            >
              {/* The transparent PNG is the illuminated button state. */}
              <Image src={hotspot.image} alt="" width={127} height={118} draggable={false} />
              <span className="sr-only">{level}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
