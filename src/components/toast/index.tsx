import { forwardRef, FunctionComponent } from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

interface IToast {
    severity: 'success' | 'info' | 'warning' | 'error';
    duration: number;
    width: string;
    message?: string;
    open: boolean;
    onClose: (reason: string) => void;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return (
        <MuiAlert
            elevation={6}
            ref={ref}
            variant="filled"
            {...props}
        />
    );
});

export const Toast: FunctionComponent<IToast> = ({
                                                     severity,
                                                     width,
                                                     duration,
                                                     message,
                                                     open,
                                                     onClose,
                                                 }: IToast) => {
    const closeAlertError = () => {
        onClose("timeout");
    };

    return (
        <Stack spacing={2} sx={{ width: width }}>
            <Snackbar
                open={open}
                autoHideDuration={duration}
                onClose={closeAlertError}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert
                    onClose={closeAlertError}
                    severity={severity}
                    sx={{ width: "100%" }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </Stack>
    );
};
