import { createContext } from "react"; 
import { FilterInfo } from "../../../types/filter";
import { IVehicle } from "../../../types/Vehicle";

export interface VehicleControlContextProps {
  allVehicles: IVehicle[]
  favorites: IVehicle[]
  searchResultVehicles: IVehicle[]
  filterResultVehicles: IVehicle[]

  handleAddAllVehicles(): Promise<void>
  handleRemoveVehicle(id: string): Promise<void>

  handleAddVehicleInFavorites(vehicle: IVehicle): Promise<void>
  handleRemoveVehicleFromFavorites(vehicle: IVehicle): Promise<void>

  handleAddVehiclesInSearchList(info: string): void
  handleClearSearchList(): void

  handleAddVehiclesInFilterList(filterInfo: FilterInfo): void
  handleClearFilterList(): void
}

const VehicleControlContext = createContext<VehicleControlContextProps>({} as VehicleControlContextProps);

export default VehicleControlContext;
