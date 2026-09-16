'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useVideoScrub } from '../hooks/useVideoScrub';
import { cinematicConfig } from '../config/story';
import { StoryOverlay } from './StoryOverlay';
import { ElevatorSelector } from '@/features/elevator/components/ElevatorSelector';
import { floorPlanImages } from '@/features/elevator/config/floorPlans';
import type { LevelId } from '@/types/property';
export function CinematicExperience({
  selectedFloor,
  onFloorSelect,
  registerSkip,
}: {
  selectedFloor: LevelId | null;
  onFloorSelect: (floor: LevelId) => void;
  registerSkip: (skip: () => void) => void;
}) {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [isPlanExpanded, setIsPlanExpanded] = useState(false);
  const { mode, interactive, skipRef } = useVideoScrub(root, video);
  useEffect(() => {
    registerSkip(() => skipRef.current());
  }, [registerSkip, skipRef]);
  return (
    <section
      ref={root}
      className="cinematic"
      id="experience"
      aria-label="Scroll through your future home"
    >
      <div className="cinematic-stage">
        <video
          ref={video}
          className="experience-video"
          muted
          playsInline
          preload="auto"
          poster={cinematicConfig.poster}
          disablePictureInPicture
          aria-hidden="true"
          tabIndex={-1}
        />
        <div className="elevator-background" aria-hidden="true" />
        <div className="film-scrim" />
        <StoryOverlay />
        <div
          data-elevator
          className="elevator-experience"
          inert={!interactive}
          aria-hidden={!interactive}
        >
          <ElevatorSelector selected={selectedFloor} onSelect={onFloorSelect} />
          {selectedFloor && (
            <aside
              className={`floor-plan-popup${floorPlanImages[selectedFloor] ? ' has-floor-plan-image' : ''}`}
              aria-live="polite"
            >
              {floorPlanImages[selectedFloor] ? (
                <div className="floor-plan-image-wrap">
                  <button
                    className="floor-plan-image-button"
                    onClick={() => setIsPlanExpanded(true)}
                    aria-label={`Enlarge floor plan for level ${selectedFloor}`}
                  >
                    <Image
                      className="floor-plan-image"
                      src={floorPlanImages[selectedFloor]}
                      alt={`Floor plan for level ${selectedFloor}`}
                      width={1122}
                      height={1402}
                    />
                  </button>
                </div>
              ) : (
                <div className="floor-plan-placeholder" aria-hidden="true" />
              )}
            </aside>
          )}
          {selectedFloor && floorPlanImages[selectedFloor] && isPlanExpanded && (
            <dialog className="floor-plan-lightbox" open aria-label="Expanded floor plan">
              <button
                className="floor-plan-lightbox-close"
                onClick={() => setIsPlanExpanded(false)}
                aria-label="Close expanded floor plan"
              >
                Close ×
              </button>
              <button
                className="floor-plan-lightbox-dismiss"
                onClick={() => setIsPlanExpanded(false)}
                aria-label="Close expanded floor plan"
              >
                <Image
                  src={floorPlanImages[selectedFloor]}
                  alt={`Expanded floor plan for level ${selectedFloor}`}
                  width={1122}
                  height={1402}
                />
              </button>
            </dialog>
          )}
        </div>
        <div className={`experience-footer${interactive ? ' is-final' : ''}`}>
          <span className={`experience-caption${interactive ? ' is-final' : ''}`}>
            {interactive
              ? 'Click an elevator button to explore the floor plans.'
              : 'Scroll through your future home.'}
          </span>
          <button
            className="text-link light"
            onClick={() =>
              interactive
                ? document.getElementById('residences')?.scrollIntoView({ behavior: 'smooth' })
                : skipRef.current()
            }
          >
            {interactive ? 'View residences' : 'Skip experience'} <span aria-hidden="true">↗</span>
          </button>
        </div>
        {mode === 'fallback' && (
          <p className="media-notice" role="status">
            The film is unavailable on this device.{' '}
            <button onClick={() => skipRef.current()}>Choose a floor</button>
          </p>
        )}
        <div className="experience-progress" aria-hidden="true">
          <span data-progress-line />
        </div>
      </div>
    </section>
  );
}
