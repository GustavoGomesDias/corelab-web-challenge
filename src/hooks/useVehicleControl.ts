import { useContext } from "react";
import VehicleControlContext from "../context/control/vehicle/VehicleContext";
const useVehicleControl = () => {
  const vehicleControl = useContext(VehicleControlContext);

  return vehicleControl;
};

export default useVehicleControl;
