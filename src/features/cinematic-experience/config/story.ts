export type StoryBeat = {
  id: string;
  start: number;
  end: number;
  eyebrow?: string;
  title?: string;
  body?: string;
  align?: 'left' | 'center' | 'right';
};
export const cinematicConfig = {
  video: '/video/Moosenberg-scroll-kf2.mp4',
  poster: '/images/moosenberg-poster.webp',
  // Scroll travel follows the longer 28.8-second film; the ending holds the elevator frame.
  desktopScrollScreens: 8.5,
  mobileScrollScreens: 5,
  filmEnd: 0.86,
  elevatorStart: 0.84,
  elevatorInteractive: 0.92,
  seekTolerance: 1 / 30,
  seekTimeoutMs: 8000,
};
export const storyBeats: StoryBeat[] = [
  {
    id: 'arrival',
    start: 0,
    end: 0.22,
    eyebrow: 'Moosenberg 12 · Switzerland',
    title: 'A NEW PERSPECTIVE\nON LIVING.',
    body: 'Move-in April 2027',
    align: 'left',
  },
  {
    id: 'approach',
    start: 0.19,
    end: 0.49,
    title: 'CALM\nBY DESIGN.',
    body: 'Four floors. Open landscapes. A quieter way to live.',
    align: 'left',
  },
  {
    id: 'interior',
    start: 0.46,
    end: 0.82,
    title: 'DESIGNED FROM\nTHE INSIDE OUT.',
    body: 'Light. Space. Perspective.',
    align: 'left',
  },
  { id: 'elevator', start: 0.84, end: 0.98, eyebrow: 'Explore the building', align: 'center' },
];
