import Link from 'next/link';
export default function NotFound() {
  return (
    <main className="section-padding residence-page">
      <p className="eyebrow">AUREL</p>
      <h1>
        SPACE
        <br />
        NOT FOUND.
      </h1>
      <Link className="text-link" href="/#residences">
        Return to residences ↗
      </Link>
    </main>
  );
}
