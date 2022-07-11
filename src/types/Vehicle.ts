export interface IVehicle {
  _id: string;
  name: string;
  description: string;
  plate: string;
  isFavorite: boolean;
  year: number;
  color: string;
  price: number;
  createdAt: Date;
}

export type VehicleCard = Omit<IVehicle, 'createdAt'>;
