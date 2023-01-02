import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const emitToast = toast<string>;

function Toast() {
  return <ToastContainer position="top-right" autoClose={5000} closeOnClick limit={3} />;
}

export default Toast;
