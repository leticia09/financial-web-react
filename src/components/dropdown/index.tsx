import {FunctionComponent, useState} from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";

interface IDropdownSingleSelect {
    label: string;
    data: [{ id: number, description: string }];
    disabled: boolean;
    width: string;
    getValue: (value: string) => void;
}

export const DropdownSingleSelect: FunctionComponent = ({
                                                            label,
                                                            data,
                                                            disabled,
                                                            width,
                                                            getValue
                                                        }: IDropdownSingleSelect) => {
    const [value, setValue] = useState('');

    function handleChange(event) {
        getValue(event.target.value);
        setValue(event.target.value);
    }

    return (
        <div>
            <FormControl required sx={{m: 1, width: width}} disabled={disabled}>
                <InputLabel
                    id="demo-multiple-name-label"
                    size="small"
                >
                    {label}
                </InputLabel>
                <Select
                    sx={{ textAlign: "start" }}
                    size="small"
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    value={value}
                    onChange={handleChange}
                    input={<OutlinedInput label={label}/>}
                >
                    {data.map((item) => (
                        <MenuItem
                            value={item.id}
                            key={item.description}
                        >
                            {item.description}
                        </MenuItem>))}
                </Select>
            </FormControl>
        </div>
    );
}