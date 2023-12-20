import './creation.css'
import {FunctionComponent} from "react";
import {ButtonComponent} from "../button";
import {FooterRegister} from "../footer-register";
import {BsBackspace} from "react-icons/bs";
import {GiCheckMark} from "react-icons/gi";
import {Toast} from "../toast";
import {BlockComponent} from "../block";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

interface ICreation {
    titles: string;
    Form: JSX.Element[];
    save: () => Promise<void>
    pathBack: string;
    toastMessage: string;
    severityType: 'success' | 'info' | 'warning' | 'error';
    open: boolean;
    handleClose: (reason: string) => void;
    hasBlock?: boolean;
    columns?: any[];
    rows?: any[];
    blocksNumber?: any[];
    disabledSaveButton: boolean;
    handleAddMember?: () => void;
    titlesButton: string;
    hasButton?: boolean;
    showLineProgress?: boolean;
}

export const Creation: FunctionComponent<ICreation> = ({
                                                           titles,
                                                           Form,
                                                           save,
                                                           pathBack,
                                                           toastMessage,
                                                           severityType,
                                                           open,
                                                           handleClose,
                                                           hasButton,
                                                           hasBlock,
                                                           blocksNumber,
                                                           columns,
                                                           rows,
                                                           disabledSaveButton,
                                                           handleAddMember,
                                                           titlesButton,
                                                           showLineProgress
                                                       }: ICreation) => {


    const handleSave = () => {
        save();
    };

    const handleCloseToast = () => {
        handleClose("");
    };

    const handleButton = () => {
        handleAddMember();
    }

    return (
        <div className='creation-content'>
            {showLineProgress &&
                <Box sx={{marginTop: "58px", marginLeft: "-5px", width: '100.6%'}}>
                    <LinearProgress/>
                </Box>
            }
            <div className="content-member">

                <div className="labels-member">
                    <h3>{titles}</h3>
                </div>
                <div className="line"/>

                {Form}

                {hasBlock && blocksNumber && (
                    <div className="blocks-container">
                        {blocksNumber.map((block: any, index) => (
                            <div className="block" key={index}>
                                <BlockComponent
                                    title={block.label}
                                    columns={columns}
                                    rows={rows[index]}
                                />
                            </div>
                        ))}
                    </div>
                )}
                {hasButton &&
                    <div className="add-button-member">
                        <ButtonComponent
                            label={titlesButton}
                            disabled={false}
                            width="140px"
                            height="30px"
                            cursor="pointer"
                            borderRadius="4px"
                            color="white"
                            background="#46ba52"
                            border="none"
                            padding="2px"
                            marginBottom="20px"
                            fontWeight="400"
                            action={handleButton}/>
                    </div>
                }


                <FooterRegister
                    disabled={disabledSaveButton}
                    path={pathBack}
                    widthButton="100px"
                    getValue={handleSave}
                    iconBack={<BsBackspace size={20}/>}
                    iconCheck={<GiCheckMark size={20}/>}
                />

                <Toast
                    severity={severityType}
                    width="100%"
                    duration={3000}
                    message={toastMessage}
                    open={open}
                    onClose={handleCloseToast}
                />
            </div>
        </div>
    );
}