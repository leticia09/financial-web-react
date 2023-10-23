import {FunctionComponent, useState} from "react";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface IInputPassword {
    label: string;
    disabled: boolean;
    width: string;
    getValue: (value: string) => void;
    handleKeyPress?: (event: any) => void;
}
export const InputPassword: FunctionComponent <IInputPassword> = ({label, disabled, width, getValue, handleKeyPress}: IInputPassword) => {

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (event) => {
        getValue(event.target.value)
    };

    return (
        <div>
            <FormControl
                sx={{ m: 1, width: width }}
                variant="outlined"
            >
                <InputLabel
                    required
                    size="small"
                    htmlFor="outlined-adornment-password">
                    {label}
                </InputLabel>
                <OutlinedInput
                    size="small"
                    id="outlined-adornment-password"
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label={label}
                />
            </FormControl>
        </div>
    );
}