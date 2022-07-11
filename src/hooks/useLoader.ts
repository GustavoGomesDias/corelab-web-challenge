import { useContext } from "react";
import { LoadContext } from "../context/LoadContext";

const useLoad = () => {
  const loadHelpers = useContext(LoadContext);

  return loadHelpers;
};

export default useLoad;
