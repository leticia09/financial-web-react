import React, {FunctionComponent, useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

interface IInput {
    label: string;
    disabled: boolean;
    width: string;
    getValue: (value: string) => void;
    inputValue: string;
    maskNumeric?: boolean;
    numericLimit?: number;
}

export const Input: FunctionComponent<IInput> = ({
                                                     label,
                                                     disabled,
                                                     width,
                                                     getValue,
                                                     inputValue,
                                                     maskNumeric = false,
                                                     numericLimit
                                                 }) => {
    const [labelValue, setLabelValue] = useState(label)
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    };

    useEffect(() => {
        if (inputValue) {
            const timer = setTimeout(() => {
                setLabelValue(null);
            }, 10);
            return () => clearTimeout(timer);
        }
    }, [inputValue, label]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = event.target.value;

        if (maskNumeric) {
            newValue = newValue.replace(/[^0-9]/g, "");
        }

        if (numericLimit && newValue.length > numericLimit) {
            newValue = newValue.slice(0, numericLimit);
        }

        getValue(newValue);
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
                    value={inputValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                    label={labelValue}
                    id="outlined-size-small"
                    size="small"
                    disabled={disabled}
                />
            </Box>
        </div>
    );
};
