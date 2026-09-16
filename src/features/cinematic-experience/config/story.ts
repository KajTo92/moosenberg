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
  video: '/video/moosenberg-experience.mp4',
  poster: '/images/moosenberg-poster.webp',
  // Scroll travel in viewport heights; the final 18% holds the elevator frame.
  desktopScrollScreens: 5.5,
  mobileScrollScreens: 3.2,
  filmEnd: 0.82,
  elevatorStart: 0.8,
  elevatorInteractive: 0.88,
  seekTolerance: 1 / 30,
  seekTimeoutMs: 8000,
};
export const storyBeats: StoryBeat[] = [
  {
    id: 'arrival',
    start: 0,
    end: 0.16,
    eyebrow: 'Moosenberg 12 · Switzerland',
    title: 'A NEW PERSPECTIVE\nON LIVING.',
    body: 'Move-in April 2027',
    align: 'left',
  },
  {
    id: 'approach',
    start: 0.14,
    end: 0.36,
    title: 'CALM\nBY DESIGN.',
    body: 'Four floors. Open landscapes. A quieter way to live.',
    align: 'left',
  },
  {
    id: 'interior',
    start: 0.38,
    end: 0.72,
    title: 'DESIGNED FROM\nTHE INSIDE OUT.',
    body: 'Light. Space. Perspective.',
    align: 'left',
  },
  { id: 'elevator', start: 0.84, end: 0.94, eyebrow: 'Explore the building', align: 'center' },
];
