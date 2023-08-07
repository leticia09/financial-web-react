import {FunctionComponent} from "react";
import {CircularProgress} from "@mui/material";

export const LoadingComponent: FunctionComponent = () => {
    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <CircularProgress variant="indeterminate"/>
        </div>
    );
}