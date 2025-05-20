import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const handleErrorTostify = (msg) => {
  toast.error(msg);
};

export const handleSucessTostify = (msg) => {
  toast.success(msg);
};
