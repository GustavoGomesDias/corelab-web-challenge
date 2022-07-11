import { FilterInfo } from "../../../../types/filter"
import { IVehicle } from "../../../../types/Vehicle"
import { handleMakeFilterList, handleMakeSearchList, removeFromList } from "./helpers/handleReducerActions"

export interface VehicleControlState {
  allVehicles: IVehicle[]
  favorites: IVehicle[]
  searchResultVehicles: IVehicle[]
  filterResultVehicles: IVehicle[]
}

export interface VehicleControlAction {
  type: 'ADD_ALL_VEHICLES' | 'REMOVE_FROM_VEHICLES_LIST' | 'ADD_IN_FAVORITE' | 'REMOVE_FROM_FAVORITE' | 'ADD_IN_SEARCH_LIST' | 'CLEAR_SEARCH_LIST' | 'ADD_IN_FILTER_LIST' | 'CLEAR_FILTER_LIST'
  vehicles?: IVehicle[]
  vehicle?: IVehicle
  info?: string
  id?: string

  filterInfo?: FilterInfo
}

const reducer = (state: VehicleControlState, action: VehicleControlAction): VehicleControlState => {
  if (action.type === 'ADD_ALL_VEHICLES') {

    return {
      allVehicles: [...(action.vehicles as IVehicle[])],
      favorites: [...state.favorites],
      searchResultVehicles: [...state.searchResultVehicles],
      filterResultVehicles:  [...state.filterResultVehicles],
    }
  }

  if (action.type === 'REMOVE_FROM_VEHICLES_LIST') {
    const list = removeFromList(state.allVehicles, (action.id as string));
    const favList = removeFromList(state.favorites, (action.id as string));

    return {
      allVehicles: [...list],
      favorites: [...favList],
      searchResultVehicles: [...state.searchResultVehicles],
      filterResultVehicles:  [...state.filterResultVehicles],
    }
  }

  if (action.type === 'REMOVE_FROM_FAVORITE') {
    const list = removeFromList(state.favorites, (action.id as string));

    return {
      allVehicles: [...state.allVehicles],
      favorites: [...list],
      searchResultVehicles: [...state.searchResultVehicles],
      filterResultVehicles:  [...state.filterResultVehicles],
    }
  }

  if (action.type === 'ADD_IN_SEARCH_LIST') {
    const searchList = handleMakeSearchList(state.allVehicles, action.info as string);

    return {
      allVehicles: [...state.allVehicles],
      favorites: [...state.allVehicles],
      searchResultVehicles: [...searchList],
      filterResultVehicles:  [],
    }
  }

  if (action.type === 'ADD_IN_FILTER_LIST') {
    const filterList = handleMakeFilterList(state.allVehicles, action.filterInfo as FilterInfo);

    return {
      allVehicles: [...state.allVehicles],
      favorites: [...state.allVehicles],
      searchResultVehicles: [],
      filterResultVehicles:  [...filterList],
    }
  }

  if (action.type === 'CLEAR_SEARCH_LIST') {

    return {
      allVehicles: [...state.allVehicles],
      favorites: [...state.allVehicles],
      searchResultVehicles: [],
      filterResultVehicles:  [...state.filterResultVehicles],
    }
  }
  if (action.type === 'CLEAR_FILTER_LIST') {

    return {
      allVehicles: [...state.allVehicles],
      favorites: [...state.allVehicles],
      searchResultVehicles: [...state.searchResultVehicles],
      filterResultVehicles:  [],
    }
  }

  return {
    allVehicles: [],
    favorites: [],
    searchResultVehicles: [],
    filterResultVehicles: [],
  }
}

export default reducer;