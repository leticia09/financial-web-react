import React, {FunctionComponent, useState} from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

interface IInput {
    label: string;
    disabled: boolean;
    width: string;
    getValue: (value: any) => void;
    inputValue?: any;
    maskNumeric?: boolean;
    numericLimit?: number;
    viewMode?: boolean;
    invalidField?: boolean;
    invalidMessage?: string;
    maskDate?: boolean;
    price?: boolean;
}

export const Input: FunctionComponent<IInput> = ({
                                                     label,
                                                     disabled,
                                                     width,
                                                     getValue,
                                                     inputValue,
                                                     maskNumeric = false,
                                                     numericLimit,
                                                     viewMode = false,
                                                     invalidField = false,
                                                     invalidMessage,
                                                     maskDate,
                                                     price
                                                 }: IInput) => {
    const [labelValue, setLabelValue] = useState(label)
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = event.target.value;

        if (maskNumeric) {
            newValue = newValue.replace(/[^0-9]/g, "");
        }

        if (numericLimit && newValue.length > numericLimit) {
            newValue = newValue.slice(0, numericLimit);
        }

        if (price) {
            let valueNew = newValue.split(' ');
            if (valueNew[1]) {
                const parts = valueNew[1].split(',');
                let integerPart = parts[0].replace(/[^\d]/g, '');

                integerPart = parseInt(integerPart, 10).toLocaleString('pt-BR');

                newValue = valueNew[0] + ' ' + integerPart;
                if(parts[1] !== undefined) {
                    newValue = newValue  + ',' + parts[1];
                }
            }
        }




        if (maskDate) {
            if (newValue.length === 2 && !newValue.includes('/')) {
                newValue += '/';
            }
            const regex = /^[0-9/]*$/;
            if (!regex.test(newValue)) {
                return;
            }
            const [month, year] = newValue.split("/");
            if (parseInt(month, 10) < 1 || parseInt(month, 10) > 12) {
                return;
            }
        }

        getValue(newValue);
    };

    return (
        <div>
            {invalidField &&
                <div className="title-input-content" style={{width: width}}>
                    <span>{invalidMessage}</span>
                </div>
            }
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
