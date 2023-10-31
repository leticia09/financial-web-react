import {FunctionComponent, useState} from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";

interface IDropdownSingleSelect {
    label: string;
    data: any[];
    disabled: boolean;
    width: string;
    idProperty: string,
    descriptionProperty: string,
    getValue: (value: any) => void;
    value?: {};
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        },
    },
};

export const DropdownSingleSelect: FunctionComponent <IDropdownSingleSelect> = ({
                                                            label,
                                                            data,
                                                            disabled,
                                                            width,
                                                            getValue,
                                                            idProperty,
                                                            descriptionProperty,
                                                            value
                                                        }: IDropdownSingleSelect) => {
    const [selectedValue, setSelectedValue] = useState(value || '');

    function handleChange(event) {
        setSelectedValue(event.target.value);
        getValue(event.target.value);
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
                    sx={{textAlign: "start"}}
                    size="small"
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    value={selectedValue}
                    onChange={handleChange}
                    MenuProps={MenuProps}
                    input={<OutlinedInput label={label}
                    />}
                >
                    {data.map((item) => (
                        <MenuItem
                            value={item[idProperty]}
                            key={item[idProperty]}
                        >
                            {item[descriptionProperty]}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}