'use client';
import { useState } from 'react';
import type { Apartment, ResidentialLevel } from '@/types/property';
import { formatRent } from '@/data/property';
// Only this presentation map changes when real SVG plans arrive.
const layouts = {
  standard: [
    { x: 7, y: 8, w: 39, h: 35 },
    { x: 54, y: 8, w: 39, h: 35 },
    { x: 54, y: 57, w: 39, h: 35 },
    { x: 7, y: 57, w: 39, h: 35 },
  ],
  penthouse: [
    { x: 7, y: 8, w: 39, h: 35 },
    { x: 54, y: 8, w: 39, h: 84 },
    { x: 7, y: 57, w: 39, h: 35 },
  ],
};
export function FloorPlanViewer({
  floor,
  units,
  selected,
  onSelect,
}: {
  floor: ResidentialLevel;
  units: Apartment[];
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  const [preview, setPreview] = useState<Apartment | null>(null);
  const regions = floor === '04' ? layouts.penthouse : layouts.standard;
  return (
    <div className="floor-plan-viewer">
      <div className="plan-meta">
        <span>FLOOR {floor}</span>
        <span>{units.length} RESIDENCES</span>
      </div>
      <div className="plan-canvas">
        <svg viewBox="0 0 100 100" aria-hidden="true" className="plan-svg">
          <rect
            x="3"
            y="3"
            width="94"
            height="94"
            fill="none"
            stroke="currentColor"
            strokeWidth=".2"
            strokeDasharray="1 1"
          />
          <rect
            x="43"
            y="45"
            width="14"
            height="10"
            fill="none"
            stroke="currentColor"
            strokeWidth=".25"
          />
          <text x="50" y="51" textAnchor="middle" fontSize="2.1" fill="currentColor">
            LIFT
          </text>
          {regions.map((r, i) => (
            <rect
              key={i}
              x={r.x}
              y={r.y}
              width={r.w}
              height={r.h}
              fill="none"
              stroke="currentColor"
              strokeWidth=".45"
            />
          ))}
        </svg>
        {units.map((unit, i) => {
          const r = regions[i];
          return (
            <button
              key={unit.id}
              className={`apartment-hotspot status-${unit.status}`}
              style={{ left: `${r.x}%`, top: `${r.y}%`, width: `${r.w}%`, height: `${r.h}%` }}
              aria-pressed={unit.id === selected}
              aria-label={`Aurel ${unit.unitNumber}, ${unit.rooms} rooms, ${unit.interiorArea} square metres, ${unit.status}`}
              onMouseEnter={() => setPreview(unit)}
              onMouseLeave={() => setPreview(null)}
              onFocus={() => setPreview(unit)}
              onBlur={() => setPreview(null)}
              onClick={() => onSelect(unit.id)}
            >
              <span>{unit.unitNumber}</span>
              <small>{unit.rooms} rooms</small>
              <span className="unit-status">{unit.status}</span>
            </button>
          );
        })}
      </div>
      <div className="apartment-preview" aria-live="polite">
        {preview ? (
          <>
            <strong>AUREL {preview.unitNumber}</strong>
            <span>
              {preview.interiorArea} m² · {formatRent(preview.monthlyRent)} / month
            </span>
          </>
        ) : (
          <>
            <strong>Select a residence</strong>
            <span>Explore the spaces on this floor.</span>
          </>
        )}
      </div>
      <p className="plan-disclaimer">
        Conceptual arrangement only. Not an architectural floor plan.
      </p>
    </div>
  );
}
