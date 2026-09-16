'use client';
import { useState } from 'react';
import { apartments, formatRent } from '@/data/property';
export function Availability({ onSelect }: { onSelect: (id: string) => void }) {
  const [availableOnly, setAvailableOnly] = useState(false);
  const units = apartments.filter((unit) => !availableOnly || unit.status === 'available');
  return (
    <section id="availability" className="availability section-padding">
      <div className="availability-heading">
        <h2>THE RESIDENCES.</h2>
        <label className="availability-filter">
          <input
            type="checkbox"
            checked={availableOnly}
            onChange={(event) => setAvailableOnly(event.target.checked)}
          />{' '}
          Available only
        </label>
      </div>
      <div className="table-scroll">
        <table>
          <caption className="sr-only">
            Illustrative Aurel residence availability and monthly rents in CHF
          </caption>
          <thead>
            <tr>
              <th>Residence</th>
              <th>Floor</th>
              <th>Rooms</th>
              <th>Interior</th>
              <th>Monthly rent</th>
              <th>Status</th>
              <th>
                <span className="sr-only">Details</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {units.map((unit) => (
              <tr key={unit.id}>
                <th scope="row">{unit.unitNumber}</th>
                <td>{unit.floor}</td>
                <td>{unit.rooms}</td>
                <td>{unit.interiorArea} m²</td>
                <td>{formatRent(unit.monthlyRent)}</td>
                <td>
                  <span className={`status status-${unit.status}`}>{unit.status}</span>
                </td>
                <td>
                  <button
                    aria-label={`View residence ${unit.unitNumber}`}
                    onClick={() => onSelect(unit.id)}
                  >
                    View <span aria-hidden="true">↗</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="plan-disclaimer">
        Fictional residences. Illustrative monthly rents and availability.
      </p>
    </section>
  );
}
