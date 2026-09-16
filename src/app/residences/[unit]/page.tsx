import Link from 'next/link';
import { notFound } from 'next/navigation';
import { apartments, formatRent, property } from '@/data/property';
export function generateStaticParams() {
  return apartments.map((apartment) => ({ unit: apartment.id }));
}
export default async function ResidencePage({ params }: { params: Promise<{ unit: string }> }) {
  const { unit } = await params;
  const apartment = apartments.find((item) => item.id === unit);
  if (!apartment) notFound();
  return (
    <main className="residence-page section-padding">
      <Link href="/#residences" className="text-link">
        ← Back to residences
      </Link>
      <p className="eyebrow">
        FLOOR {apartment.floor} / {apartment.status.toUpperCase()}
      </p>
      <h1>AUREL {apartment.unitNumber}</h1>
      <p className="residence-page-intro">{apartment.rooms} rooms. Your own perspective.</p>
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
          <dt>Monthly rent</dt>
          <dd>{formatRent(apartment.monthlyRent)}</dd>
        </div>
        <div>
          <dt>Move-in</dt>
          <dd>{property.moveIn}</dd>
        </div>
      </dl>
      <div className="prepared-view">
        <span>RESIDENCE EXPLORATION</span>
        <h2>
          A CLOSER LOOK.
          <br />
          COMING NEXT.
        </h2>
        <p>
          The interactive apartment view is being prepared. The areas and prices shown are fictional
          portfolio content.
        </p>
        <Link className="text-link" href="/#contact">
          Register interest ↗
        </Link>
      </div>
    </main>
  );
}
