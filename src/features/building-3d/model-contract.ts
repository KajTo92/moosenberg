import type { LevelId } from '@/types/property';
export const buildingNodes = {
  base: 'Building_Base',
  roof: 'Roof',
  levels: {
    UG: 'UG',
    '01': 'Floor_01',
    '02': 'Floor_02',
    '03': 'Floor_03',
    '04': 'Floor_04',
  } satisfies Record<LevelId, string>,
} as const;
