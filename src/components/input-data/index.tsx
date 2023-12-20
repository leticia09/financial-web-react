import {FunctionComponent, useEffect, useState} from "react";
import * as React from 'react';
import "./input-data.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import {format, isAfter, isBefore} from "date-fns";
interface IInputDataComponent {
    label: string;
    disabled?: boolean;
    width?: string;
    getValue: (value: string) => void;
    inputValue?: any;
    viewMode?: boolean;
    disabledDates?: Date[];
    after?: boolean,
    before?: boolean
}

export const InputDataComponent: FunctionComponent <IInputDataComponent> = ({label, disabled, width, getValue, inputValue = null, viewMode,disabledDates,after, before }: IInputDataComponent) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [isDateSelected, setIsDateSelected] = useState(false);

    useEffect(() => {
        if(inputValue === null) {
            setSelectedDate(null);
        }

        setIsDateSelected(false);
    }, [inputValue]);

    const handleChange = (date: Date) => {
        setSelectedDate(date);
        const formattedDate = format(date, "dd/MM/yyyy");
        getValue(formattedDate);
        setIsDateSelected(true);
    };

    const isDateDisabled = (date) => {
        if(disabledDates && after) {
            return disabledDates && disabledDates.some((disabledDate) => isAfter(date, disabledDate));
        } else if (disabledDates && before) {
            return disabledDates && disabledDates.some((disabledDate) => isBefore(date, disabledDate));
        } else return date;
    };

    return (
        <div style={{width: width, position: 'relative', zIndex: 999, marginLeft: "8px", marginRight: "8px"}}>
            <DatePicker
                selected={selectedDate}
                onChange={handleChange}
                dateFormat="dd/MM/yyyy"
                className="form-field"
                id={label}
                placeholderText={label}
                filterDate={isDateDisabled}
            />
            { isDateSelected &&
                <label className={`input-label ${isDateSelected ? "active" : ""}`} htmlFor={label}>
                    {label}
                </label>
            }

        </div>
    );
}