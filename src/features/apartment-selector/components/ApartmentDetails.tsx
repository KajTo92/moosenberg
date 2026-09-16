'use client';
import Link from 'next/link';
import { formatRent } from '@/data/property';
import type { Apartment } from '@/types/property';
export function ApartmentDetails({
  apartment,
  onInterest,
}: {
  apartment: Apartment;
  onInterest: (unit: string) => void;
}) {
  return (
    <aside className="apartment-details" aria-label={`Details for Aurel ${apartment.unitNumber}`}>
      <div className="detail-topline">
        <span className={`status status-${apartment.status}`}>{apartment.status}</span>
        <span>FLOOR {apartment.floor}</span>
      </div>
      <h3 id="apartment-details-heading" tabIndex={-1}>
        AUREL
        <br />
        {apartment.unitNumber}
      </h3>
      <p className="room-count">{apartment.rooms} ROOMS</p>
      <dl className="apartment-specs">
        <div>
          <dt>Interior</dt>
          <dd>{apartment.interiorArea} m²</dd>
        </div>
        <div>
          <dt>Terrace</dt>
          <dd>{apartment.terraceArea} m²</dd>
        </div>
        <div>
          <dt>Orientation</dt>
          <dd>{apartment.orientation}</dd>
        </div>
      </dl>
      <p className="rent">
        {formatRent(apartment.monthlyRent)}
        <span> / month</span>
      </p>
      <Link className="solid-link" href={`/residences/${apartment.id}`}>
        Explore residence <span aria-hidden="true">↗</span>
      </Link>
      <button className="text-link" onClick={() => onInterest(apartment.id)}>
        Register interest <span aria-hidden="true">↗</span>
      </button>
    </aside>
  );
}
