import {forwardRef, FunctionComponent} from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";


interface IToast {
    severity: string;
    duration: number;
    width: string;
    message?: string;
    open: boolean;
    onClose: (value: boolean) => void;
}

const Alert = forwardRef(function Alert(props, ref)  {
    return (
        <MuiAlert
            elevation={6}
            ref={ref}
            variant="filled"
            {...props}
            direction="right"
        />
    );
});
export const Toast: FunctionComponent = ({severity, width, duration, message, open, onClose}: IToast) => {
    const closeAlertError = () => {
        onClose(false);
    };

    // @ts-ignore
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
}