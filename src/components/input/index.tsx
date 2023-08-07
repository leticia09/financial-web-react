import {FunctionComponent} from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

interface IInput {
    label: string;
    disabled: boolean;
    width: string;
    getValue: (value: string) => void;
}
export const Input: FunctionComponent = ({label, disabled, width, getValue}: IInput) => {
    const handleChange = (event) => {
        getValue(event.target.value)
    };

    return (
        <div>
            <Box
                component="form"
                sx={{
                    "& > :not(style)": {m: 1, width: width},
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    required
                    onChange={handleChange}
                    label={label}
                    id="outlined-size-small"
                    size="small"
                    disabled={disabled}
                />
            </Box>
        </div>
    );
}