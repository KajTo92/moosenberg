import { Showroom } from '@/components/layout/Showroom';
import { property } from '@/data/property';
export default function Home() {
  return (
    <>
      <Showroom>
        <section id="location" className="location section-padding">
          <p className="eyebrow">MOOSENBERG 12</p>
          <h2>
            BETWEEN LANDSCAPE
            <br />
            AND CONNECTION.
          </h2>
          <p className="location-copy">
            Quiet residential surroundings. Open views towards the lake and mountains. Swiss
            countryside within reach of everyday connections.
          </p>
          <div className="location-coordinate">
            SWITZERLAND<span>Room to breathe.</span>
          </div>
        </section>
      </Showroom>
      <footer className="site-footer">
        <a href="#experience" className="wordmark">
          AUREL.
        </a>
        <p>{property.disclaimer}</p>
        <span>A SPACE CODE CONCEPT</span>
      </footer>
    </>
  );
}
