export type ResidentialLevel = '01' | '02' | '03' | '04';
export type LevelId = 'UG' | ResidentialLevel;
export type ApartmentStatus = 'available' | 'reserved' | 'rented';
export type Apartment = {
  id: string;
  unitNumber: string;
  floor: ResidentialLevel;
  rooms: number;
  interiorArea: number;
  terraceArea: number;
  monthlyRent: number;
  status: ApartmentStatus;
  orientation: string;
};
// Renderer-independent contract shared by the schematic and future GLB viewer.
export type BuildingSelection = {
  selectedFloor: LevelId | null;
  selectedApartment: string | null;
  onFloorSelect: (floor: LevelId) => void;
  onApartmentSelect: (id: string) => void;
};
