import React, {FunctionComponent, useEffect, useState} from "react";
import {ChromePicker} from "react-color";
import "./color.css"
import {AiOutlineClose} from "react-icons/ai";

interface IColor {
    open: boolean;
    getValue: (value: any) => void;
    width: string;
    label: string;
    value?: string;
}

export const ColorPickerComponent: FunctionComponent<IColor> = ({getValue, width, label, value}: IColor) => {
    const [open, setOpen] = useState(false);
    const [labels, setLabel] = useState(label);
    const [color, setColor] = useState('#39436F');
    useEffect(() => {
      if(value) {
          setColor(value);
      }
    }, []);
    const handleColorChange = (value) => {
        setColor(value.hex);
        getValue(value.hex);
        setLabel(value.hex);
    };

    const handleOpen = (value: boolean) => {
        setOpen(value);
    };

    return (
        <div>
            <div className={"content-color-picker"} style={{
                width: width,
            }} onClick={() => handleOpen(!open)}>
                {!value &&
                    <span className={"content-color-picker-label"}>{labels}</span>
                }
                { value &&
                    <span className={"content-color-picker-label-value"}>{value}</span>
                }

            </div>
            {open &&
                <div style={{position: "absolute"}}>
                    <div style={{cursor: "pointer", textAlign: "end"}}><AiOutlineClose size={20}
                                                                                       onClick={() => handleOpen(false)}/>
                    </div>
                    <div><ChromePicker color={color} onChange={handleColorChange}/></div>
                </div>
            }

        </div>
    );
}