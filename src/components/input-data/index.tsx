import {FunctionComponent, useEffect, useState} from "react";
import * as React from 'react';
import "./input-data.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
interface IInputDataComponent {
    label: string;
    disabled?: boolean;
    width?: string;
    getValue: (value: Date) => void;
    inputValue?: string;
    viewMode?: boolean;
}

export const InputDataComponent: FunctionComponent <IInputDataComponent> = ({label, disabled, width, getValue, inputValue, viewMode }: IInputDataComponent) => {
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        setSelectedDate(null);
    }, []);
    const handleChange = (date: Date) => {
        setSelectedDate(date);
        getValue(date);
    };
    return (
        <div style={{width: width}}>
            <DatePicker
                selected={selectedDate}
                onChange={handleChange}
                dateFormat="dd/MM/yyyy"
                className="form-field"
                id={label}
                placeholderText={label}/>
        </div>
    );
}