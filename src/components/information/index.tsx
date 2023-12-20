import {FunctionComponent, useState} from "react";
import {FiAlertCircle} from "react-icons/fi";
import {IoClose} from "react-icons/io5";

interface IInformation {
    message: string;
}


export const InformationComponent: FunctionComponent<IInformation> = ({
                                                                          message
                                                                      }: IInformation) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    }

    return (
        <div style={{cursor: "pointer"}}>
            {!open &&
                <FiAlertCircle size={15} onClick={handleOpen}/>
            }

            {open &&
                <div
                    style={{
                        background: "#dddddd",
                        maxHeight: "32px",
                        borderRadius: "4px",
                        padding: "8px",
                        display: "flex",
                        justifyContent: "center"
                    }}>
                    <div style={{display: "flex", justifyContent: 'center', marginBottom: '2px'}}>
                        {message}
                        <IoClose style={{marginLeft: '6px'}} onClick={handleOpen}/>
                    </div>
                </div>
            }

        </div>
    );
}