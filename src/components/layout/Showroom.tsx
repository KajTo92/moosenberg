'use client';
import { useCallback, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Navigation } from '../navigation/Navigation';
import { CinematicExperience } from '@/features/cinematic-experience/components/CinematicExperience';
import { ResidenceExplorer } from '@/features/floor-selector/components/ResidenceExplorer';
import { Availability } from './Availability';
import { apartments, property } from '@/data/property';
import type { LevelId } from '@/types/property';
const InterestDialog = dynamic(() =>
  import('./InterestDialog').then((module) => module.InterestDialog),
);
export function Showroom({ children }: { children: React.ReactNode }) {
  const [floor, setFloor] = useState<LevelId>('03');
  const [elevatorFloor, setElevatorFloor] = useState<LevelId | null>(null);
  const [selected, setSelected] = useState<string | null>('3.02');
  const [interest, setInterest] = useState<{ unit: string | null } | null>(null);
  const skip = useRef<() => void>(() => document.getElementById('residences')?.scrollIntoView());
  const registerSkip = useCallback((fn: () => void) => {
    skip.current = fn;
  }, []);
  const focusResidences = () =>
    requestAnimationFrame(() => {
      document.getElementById('residences')?.scrollIntoView({ behavior: 'instant' });
      document.getElementById('residences-heading')?.focus({ preventScroll: true });
    });
  const selectFloor = (level: LevelId) => {
    setFloor(level);
    setSelected(null);
    focusResidences();
  };
  const selectElevatorFloor = (level: LevelId) => {
    setElevatorFloor(level);
    setFloor(level);
    setSelected(null);
  };
  const selectApartment = (id: string) => {
    setSelected(id);
    requestAnimationFrame(() => {
      const heading = document.getElementById('apartment-details-heading');
      if (window.matchMedia('(max-width: 767px)').matches) {
        heading?.closest('aside')?.scrollIntoView({ behavior: 'instant' });
      }
      heading?.focus({ preventScroll: true });
    });
  };
  const selectFromAvailability = (id: string) => {
    const unit = apartments.find((item) => item.id === id);
    if (unit) {
      setFloor(unit.floor);
      setSelected(id);
      focusResidences();
    }
  };
  return (
    <>
      <Navigation onResidences={() => skip.current()} />
      <main>
        <CinematicExperience
          selectedFloor={elevatorFloor}
          onFloorSelect={selectElevatorFloor}
          registerSkip={registerSkip}
        />
        <ResidenceExplorer
          floor={floor}
          selected={selected}
          onFloorSelect={selectFloor}
          onApartmentSelect={selectApartment}
          onInterest={(unit) => setInterest({ unit })}
        />
        {children}
        <Availability onSelect={selectFromAvailability} />
        <section id="contact" className="contact section-padding">
          <p className="eyebrow">MOVE-IN {property.moveIn.toUpperCase()}</p>
          <h2>
            YOUR NEXT
            <br />
            PERSPECTIVE.
          </h2>
          <button className="contact-link" onClick={() => setInterest({ unit: null })}>
            Register interest <span aria-hidden="true">↗</span>
          </button>
          <div className="contact-address">
            {property.address}
            <br />
            {property.country}
          </div>
        </section>
      </main>
      {interest && <InterestDialog unit={interest.unit} onClose={() => setInterest(null)} />}
    </>
  );
}
