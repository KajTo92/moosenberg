'use client';
import { apartments, elevatorLevels } from '@/data/property';
import type { LevelId } from '@/types/property';
import { FloorPlanViewer } from './FloorPlanViewer';
import { ApartmentDetails } from '@/features/apartment-selector/components/ApartmentDetails';
export function ResidenceExplorer({
  floor,
  selected,
  onFloorSelect,
  onApartmentSelect,
  onInterest,
}: {
  floor: LevelId;
  selected: string | null;
  onFloorSelect: (level: LevelId) => void;
  onApartmentSelect: (id: string) => void;
  onInterest: (unit: string) => void;
}) {
  const units = apartments.filter((unit) => unit.floor === floor);
  const apartment = units.find((unit) => unit.id === selected);
  return (
    <section
      id="residences"
      className="residences section-padding"
      aria-labelledby="residences-heading"
    >
      <div className="residence-heading">
        <h2 id="residences-heading" tabIndex={-1}>
          FIND YOUR
          <br />
          PERSPECTIVE.
        </h2>
        <div className="floor-tabs" role="group" aria-label="Building levels">
          {elevatorLevels.map((level) => (
            <button key={level} onClick={() => onFloorSelect(level)} aria-pressed={floor === level}>
              {level}
            </button>
          ))}
        </div>
      </div>
      {floor === 'UG' ? (
        <div className="garage">
          <span className="garage-level">UG</span>
          <div>
            <h3>
              UNDERGROUND
              <br />
              GARAGE
            </h3>
            <p>
              Resident parking
              <br />
              EV charging ready
              <br />
              Direct elevator access
            </p>
            <p className="plan-disclaimer">
              Illustrative amenities for this fictional development.
            </p>
          </div>
        </div>
      ) : (
        <div className="residence-grid">
          <FloorPlanViewer
            key={floor}
            floor={floor}
            units={units}
            selected={selected}
            onSelect={onApartmentSelect}
          />
          {apartment ? (
            <ApartmentDetails apartment={apartment} onInterest={onInterest} />
          ) : (
            <aside className="empty-details">
              <span className="large-floor">{floor}</span>
              <h3>
                A SPACE
                <br />
                TO CALL YOURS.
              </h3>
              <p>Select a residence on the plan to discover its details.</p>
            </aside>
          )}
        </div>
      )}
    </section>
  );
}
