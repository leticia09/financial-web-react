import {forwardRef, FunctionComponent, useState} from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {IMaskInput} from "react-imask";
// @ts-ignore
import PropTypes from "prop-types";
import "./input-cpf.css"

interface IInputCPF {
    label: string;
    disabled: boolean;
    width: string;
    getValue: (value: string) => void;
}

const textMaskCpf = forwardRef(function TextMaskCustom(props: any, ref) {
    const {onChange, ...other} = props;
    return (
        <IMaskInput
            {...other}
            mask="000.000.000-00"
            definitions={{
                "#": /[1-11]/,
            }}
            inputRef={ref}
            onAccept={(value) => onChange({target: {name: props.name, value}})}
            overwrite
        />
    );
});

textMaskCpf.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
export const InputCPF: FunctionComponent <IInputCPF> = ({label, disabled, width, getValue}: IInputCPF) => {

    const [cpf, setCpf] = useState("");

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    };

    const handleChange = (event) => {
        setCpf(event.target.value);
        getValue(event.target.value)
    };

    return (
        <div>
            {cpf.length > 1 && cpf.length < 14 &&
                <div className="title-input-content" style={{width: width}}>
                    <span>*CPF Incorreto*</span>
                </div>
            }
            <Box
                component="form"
                sx={{
                    "& > :not(style)": {
                        m: 1,
                        width: {width},
                    },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    required
                    disabled={disabled}
                    onChange={handleChange}
                    name={label}
                    label={label}
                    onKeyDown={handleKeyPress}
                    id="outlined-size-small"
                    size="small"
                    InputProps={{
                        inputComponent: textMaskCpf,
                    }}
                />
            </Box>
        </div>
    );
}