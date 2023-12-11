import {FunctionComponent, useEffect, useState} from "react";
import * as React from 'react';
import "./input-data.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import {format, isAfter} from "date-fns";
interface IInputDataComponent {
    label: string;
    disabled?: boolean;
    width?: string;
    getValue: (value: string) => void;
    inputValue?: string;
    viewMode?: boolean;
    disabledDates?: Date[];
}

export const InputDataComponent: FunctionComponent <IInputDataComponent> = ({label, disabled, width, getValue, inputValue, viewMode,disabledDates }: IInputDataComponent) => {
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        setSelectedDate(null);
    }, []);
    const handleChange = (date: Date) => {
        setSelectedDate(date);
        const formattedDate = format(date, "dd/MM/yyyy");
        getValue(formattedDate);
    };

    const isDateDisabled = (date) => {
        return disabledDates && disabledDates.some((disabledDate) => isAfter(date, disabledDate));
    };

    return (
        <div style={{width: width}}>
            <DatePicker
                selected={selectedDate}
                onChange={handleChange}
                dateFormat="dd/MM/yyyy"
                className="form-field"
                id={label}
                placeholderText={label}
                filterDate={isDateDisabled}
            />
        </div>
    );
}