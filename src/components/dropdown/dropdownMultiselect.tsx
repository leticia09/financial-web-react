import {FunctionComponent, useEffect, useState} from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import "./dropdown.css"
import {Checkbox} from "@mui/material";
import ListItemText from '@mui/material/ListItemText';

interface IDropdownSingleSelect {
    label: string;
    data: any[];
    disabled: boolean;
    width: string;
    idProperty: string,
    descriptionProperty: string,
    getValue: (value: Array<string | number>) => void;
    value?: Array<string | number>;
    getAction?: () => void;
    labelAction?: string
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

export const DropdownMultiSelect: FunctionComponent<IDropdownSingleSelect> = ({
                                                                                  label,
                                                                                  data,
                                                                                  disabled,
                                                                                  width,
                                                                                  getValue,
                                                                                  idProperty,
                                                                                  descriptionProperty,
                                                                                  value,
                                                                                  labelAction,
                                                                                  getAction
                                                                              }: IDropdownSingleSelect) => {
    const [selectedValue, setSelectedValue] = useState(value);

    function handleChange(event) {
        if (event.target.value !== 0) {
            setSelectedValue(event.target.value);
            getValue(event.target.value);
        }
    }

    function handleChangeAction() {
        getAction();
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
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    value={selectedValue}
                    multiple
                    onChange={handleChange}
                    MenuProps={MenuProps}
                    renderValue={(selected) => selected.join(', ')}
                    input={<OutlinedInput label={label}
                    />}
                >
                    {data.length > 0 && data.map((item: {}) =>
                        <MenuItem
                            value={item[descriptionProperty]}
                            key={item[idProperty]}
                        >
                            <Checkbox checked={selectedValue.includes(item[descriptionProperty] as string | number)}/>
                            <ListItemText primary={item[descriptionProperty]}/>
                        </MenuItem>)}
                </Select>
            </FormControl>
        </div>
    );
}