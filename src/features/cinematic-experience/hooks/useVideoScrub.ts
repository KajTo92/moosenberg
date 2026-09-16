'use client';
import { useEffect, useRef, useState, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from '@/lib/gsap/motion';
import { cinematicConfig as config, storyBeats } from '../config/story';
import { beatOpacity, clamp, videoTime } from '../utils/progress';

type MediaMode = 'loading' | 'ready' | 'fallback' | 'reduced';
export function useVideoScrub(
  root: RefObject<HTMLElement | null>,
  video: RefObject<HTMLVideoElement | null>,
) {
  const [mode, setMode] = useState<MediaMode>('loading');
  const [interactive, setInteractive] = useState(false);
  const skipRef = useRef<() => void>(() => document.getElementById('residences')?.scrollIntoView());
  useEffect(() => {
    const section = root.current;
    const media = video.current;
    if (!section || !media) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add(
      {
        reduced: '(prefers-reduced-motion: reduce)',
        mobile: '(max-width: 767px)',
        full: '(min-width: 0px)',
      },
      (context) => {
        const reduced = Boolean(context.conditions?.reduced);
        const mobile = Boolean(context.conditions?.mobile);
        let disposed = false,
          failed = false,
          progress = 0,
          raf = 0,
          lastSeek = 0;
        let active = false;
        const revealEase = gsap.parseEase(motion.reveal);
        const beats = section.querySelectorAll<HTMLElement>('[data-story-beat]');
        const elevator = section.querySelector<HTMLElement>('[data-elevator]');
        const progressLine = section.querySelector<HTMLElement>('[data-progress-line]');
        section.style.setProperty(
          '--scroll-screens',
          String(mobile ? config.mobileScrollScreens : config.desktopScrollScreens),
        );
        section.dataset.static = String(reduced);
        section.dataset.bypass = 'false';
        setMode(reduced ? 'reduced' : 'loading');
        setInteractive(false);
        const activate = (next: boolean) => {
          if (next !== active) {
            active = next;
            setInteractive(next);
          }
          if (elevator) {
            elevator.inert = !next;
            elevator.setAttribute('aria-hidden', String(!next));
          }
        };
        const paint = () => {
          const filmProgress = clamp(progress / config.filmEnd);
          beats.forEach((element, index) => {
            const beat = storyBeats[index];
            const opacity = beatOpacity(filmProgress, beat.start, beat.end);
            element.style.opacity = String(opacity);
            element.style.transform = `translateY(${(1 - opacity) * 18}px)`;
            element.setAttribute('aria-hidden', String(opacity < 0.5));
          });
          const reveal = clamp(
            (progress - config.elevatorStart) / (config.elevatorInteractive - config.elevatorStart),
          );
          const easedReveal = revealEase(reveal);
          const whiteOpacity =
            reveal < 0.4
              ? revealEase(reveal / 0.4)
              : reveal <= 0.6
                ? 1
                : revealEase((1 - reveal) / 0.4);
          const imageReveal = revealEase(clamp((reveal - 0.42) / 0.16));
          section.style.setProperty('--elevator-opacity', String(easedReveal));
          section.style.setProperty('--elevator-image-opacity', String(imageReveal));
          section.style.setProperty('--video-opacity', String(1 - imageReveal));
          section.style.setProperty('--transition-white-opacity', String(whiteOpacity));
          section.style.setProperty('--film-shade', String(0.12 - reveal * 0.07));
          if (progressLine) progressLine.style.transform = `scaleX(${progress})`;
          activate(progress >= config.elevatorInteractive);
        };
        const fallback = () => {
          if (disposed || failed || reduced) return;
          failed = true;
          setMode('fallback');
          // Keep the current decoded image/poster; never trap the user in a failed film.
          cancelAnimationFrame(raf);
        };
        const tick = (now: number) => {
          raf = 0;
          if (disposed || failed || reduced || document.hidden) return;
          if (media.seeking) {
            raf = requestAnimationFrame(tick);
            return;
          }
          if (Number.isFinite(media.duration) && media.readyState >= 1) {
            const target = videoTime(progress, media.duration, config.filmEnd);
            const delta = target - media.currentTime;
            if (Math.abs(delta) > config.seekTolerance) {
              if (now - lastSeek >= (mobile ? 32 : 16)) {
                // The film has a keyframe every two frames, so seek directly to the
                // newest scroll position as soon as the previous decode completes.
                try {
                  media.currentTime = target;
                  lastSeek = now;
                } catch {
                  fallback();
                  return;
                }
              }
              raf = requestAnimationFrame(tick);
            }
          }
        };
        const wake = () => {
          if (!raf && !failed && !reduced && !document.hidden) raf = requestAnimationFrame(tick);
        };
        const ready = () => {
          if (!disposed && !failed) {
            setMode('ready');
            wake();
          }
        };
        media.addEventListener('loadedmetadata', ready);
        media.addEventListener('loadeddata', ready);
        media.addEventListener('seeked', wake);
        media.addEventListener('error', fallback);
        document.addEventListener('visibilitychange', wake);
        let trigger: ScrollTrigger | undefined;
        if (!reduced) {
          // CSS sticky owns pin geometry, avoiding JS pin/unpin layout shifts.
          trigger = ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: () => `+=${section.offsetHeight - window.innerHeight}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              progress = self.progress;
              paint();
              wake();
            },
            onRefresh: (self) => {
              progress = self.progress;
              paint();
              wake();
            },
          });
          media.src = config.video;
          media.load();
          if (media.readyState >= 1) ready();
        } else {
          media.removeAttribute('src');
          media.load();
        }
        skipRef.current = () => {
          if (reduced || failed) {
            trigger?.kill();
            trigger = undefined;
            section.dataset.bypass = 'true';
            progress = 1;
            paint();
            section.scrollIntoView({ behavior: 'instant' });
          } else if (trigger) {
            window.scrollTo({
              top: trigger.start + (trigger.end - trigger.start) * 0.94,
              behavior: 'instant',
            });
            progress = 0.94;
            paint();
            wake();
          }
          requestAnimationFrame(() =>
            elevator?.querySelector<HTMLButtonElement>('button')?.focus({ preventScroll: true }),
          );
        };
        paint();
        return () => {
          disposed = true;
          cancelAnimationFrame(raf);
          trigger?.kill();
          media.removeEventListener('loadedmetadata', ready);
          media.removeEventListener('loadeddata', ready);
          media.removeEventListener('seeked', wake);
          media.removeEventListener('error', fallback);
          document.removeEventListener('visibilitychange', wake);
          media.pause();
          media.removeAttribute('src');
          media.load();
        };
      },
    );
    return () => {
      mm.revert();
      skipRef.current = () => {};
    };
  }, [root, video]);
  return { mode, interactive, skipRef };
}
