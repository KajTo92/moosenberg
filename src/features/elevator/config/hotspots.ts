import type { LevelId } from '@/types/property';

export type ElevatorHotspot = {
  level: LevelId;
  image: string;
  x: number;
  y: number;
};

// Coordinates are percentages of the source image (1672 x 941).
// Tune only this file if the elevator photo or illuminated overlays change.
export const elevatorHotspots: readonly ElevatorHotspot[] = [
  { level: '04', image: '/images/button4.png', x: 73.92, y: 19.08 },
  { level: '03', image: '/images/button3.png', x: 73.92, y: 31.66 },
  { level: '02', image: '/images/button2.png', x: 73.92, y: 43.96 },
  { level: '01', image: '/images/button1.png', x: 73.92, y: 56.22 },
  { level: 'UG', image: '/images/buttonug.png', x: 73.92, y: 68.55 },
];
