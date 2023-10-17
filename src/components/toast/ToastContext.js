import { createContext, useContext, useState } from "react";
import {Toast} from "./index.tsx";

const ToastContext = createContext();

export function useToast() {
    return useContext(ToastContext);
}

export function ToastProvider({ children }) {
    const [toastState, setToastState] = useState({
        open: false,
        severity: "",
        message: "",
    });

    const showToast = (severity, message) => {
        setToastState({ open: true, severity, message });
    };

    const hideToast = () => {
        setToastState({ ...toastState, open: false });
    };

    return (
        <ToastContext.Provider value={{ showToast, hideToast }}>
            {children}
            {toastState.open && (
                <Toast severity={toastState.severity}  duration={5000} message={toastState.message} />
            )}
        </ToastContext.Provider>
    );
}
