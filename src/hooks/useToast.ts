import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";

const useToast = () => {
  const toastHelpers = useContext(ToastContext);

  return toastHelpers;
};

export default useToast;
