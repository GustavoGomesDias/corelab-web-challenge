import { useMemo, useReducer } from "react"
import useLoad from "../../../hooks/useLoader"
import useToast from "../../../hooks/useToast"
import api from "../../../services/fetchAPI/init"
import { FilterInfo } from "../../../types/filter"
import { IVehicle } from "../../../types/Vehicle"
import reducer, { VehicleControlAction, VehicleControlState } from "./reducer/controlReducer"
import VehicleControlContext from "./VehicleContext"

export interface VehicleControlProviderProps {
  children: JSX.Element | JSX.Element[]
}

const VehicleControlProvider = ({ children }: VehicleControlProviderProps): JSX.Element => {
  const { addToast } = useToast();

  const [vehicleState, dispatchVehicleAction] = useReducer(reducer, {
    allVehicles: [],
    favorites: [],
    searchResultVehicles: [],
    filterResultVehicles: [],
  });

  const handleAddAllVehicles = async () => {
    const response = await api.get('/');

    if (response.data.error) {
      addToast(response.data.error);

      return;
    }

    const vehicles = response.data.content as IVehicle[];
    dispatchVehicleAction({
      type: 'ADD_ALL_VEHICLES',
      vehicles: vehicles,
    });
  }

  const handleRemoveVehicle = async (id: string) => {
    const response = await api.delete(`/${id}`);

    if (response.data.error) {
      addToast(response.data.error);

      return;
    }
    
    dispatchVehicleAction({
      type: 'REMOVE_FROM_VEHICLES_LIST',
      id,
    });
  }

  const handleAddVehicleInFavorites = async (vehicle: IVehicle) => {
    console.log(vehicle);
    const { isFavorite, _id, ...rest } = vehicle;
    const response = await api.put('/', {
      id: _id,
      ...rest,
      isFavorite: true,
    });

    if (response.data.error) {
      addToast(response.data.error);

      return;
    }
    
    dispatchVehicleAction({
      type: 'ADD_IN_FAVORITE',
      vehicle: {
        _id,
        ...rest,
        isFavorite: true,
      },
    });
  }

  const handleRemoveVehicleFromFavorites = async (vehicle: IVehicle) => {
    const { isFavorite, _id, ...rest } = vehicle;
    const response = await api.put('/', {
      id: _id,
      ...rest,
      isFavorite: false,
    });
    if (response.data.error) {
      addToast(response.data.error);

      return;
    }
    
    dispatchVehicleAction({
      type: 'REMOVE_FROM_FAVORITE',
      id: vehicle._id,
    });
  }

  const handleAddVehiclesInSearchList = (info: string) => {
    dispatchVehicleAction({
      type: 'ADD_IN_SEARCH_LIST',
      info,
    });
  }

  const handleClearSearchList = () => {
    dispatchVehicleAction({
      type: 'CLEAR_SEARCH_LIST',
    });
  }

  const handleAddVehiclesInFilterList = (filterInfo: FilterInfo) => {
    dispatchVehicleAction({
      type: 'ADD_IN_FILTER_LIST',
      filterInfo,
    })
  }

  const handleClearFilterList = () => {
    dispatchVehicleAction({
      type: 'CLEAR_FILTER_LIST',
    });
  }

  const context = useMemo(() => ({
    allVehicles: vehicleState.allVehicles,
  favorites: vehicleState.favorites,
  searchResultVehicles: vehicleState.searchResultVehicles,
  filterResultVehicles: vehicleState.filterResultVehicles,

  handleAddAllVehicles,
  handleRemoveVehicle,

  handleAddVehicleInFavorites,
  handleRemoveVehicleFromFavorites,

  handleAddVehiclesInSearchList,
  handleClearSearchList,

  handleAddVehiclesInFilterList,
  handleClearFilterList,
  }), [vehicleState]);

  return (
    <VehicleControlContext.Provider value={context}>
      {children}
    </VehicleControlContext.Provider>
  );

}

export default VehicleControlProvider;