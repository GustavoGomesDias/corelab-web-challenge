import { FilterInfo } from "../../../../../types/filter";
import { IVehicle } from "../../../../../types/Vehicle";

export const removeFromList = (vehicleList: IVehicle[], id: string): IVehicle[] => {
  const vehicleIndex = vehicleList.map((vehicle) => vehicle._id).indexOf(id);

  if (vehicleIndex > -1) {
    vehicleList.splice(vehicleIndex, 1)
  }

  return vehicleList;
}

export const handleMakeSearchList = (vehicleList: IVehicle[], info: string): IVehicle[] => {
  // eslint-disable-next-line array-callback-return
  const searchList = vehicleList.filter((vehicle) => {
    const keys = Object.keys(vehicle);

    for (const key of keys) {
      // eslint-disable-next-line eqeqeq
      if ((vehicle as unknown as Record<string, unknown>)[key] == info) {
        return vehicle;
      }
    }
  });

  return searchList;
}

export const handleMakeFilterList = (vehicleList: IVehicle[], filter: FilterInfo): IVehicle[] => {
  const filterList: IVehicle[] = [];

  vehicleList.forEach((vehicle) => {
    if (filter.minPrice && filter.maxPrice) {
      if (vehicle.price > filter.minPrice && vehicle.price < filter.maxPrice) filterList.push(vehicle);
    } else {
      if (vehicle.price > filter.minPrice) {
        filterList.push(vehicle)
      }

      if (vehicle.price < filter.maxPrice) {
        filterList.push(vehicle)
      }
    }
  })

  vehicleList.forEach((vehicle) => {
    const filterKeys = Object.keys(filter);

    for (const key in filterKeys) {
      if ((filter as unknown as Record<string, unknown>)[key] === (vehicle as unknown as Record<string, unknown>)[key]) {
        const index = filterList.map((item) => (item as unknown as Record<string, unknown>)[key]).indexOf((vehicle as unknown as Record<string, unknown>)[key]);

        if (index < 0) {
          filterList.push(vehicle);
        }
      }
    }
  });

  return filterList;
}