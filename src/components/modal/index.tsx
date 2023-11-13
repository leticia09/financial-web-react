import {FunctionComponent, useState} from "react";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import {FooterRegister} from "../footer-register";
import {GiCheckMark} from "react-icons/gi";
import {AiOutlineClose} from "react-icons/ai";
import {Toast} from "../toast";

interface IModal {
    openModal: boolean;
    setOpenModal: (value: boolean) => void;
    label: string;
    getValue: (value: any) => void;
    Form: JSX.Element[];
    toastMessage?: string;
    severityType?: 'success' | 'info' | 'warning' | 'error';
    openToast?: boolean;
    disabledSave: boolean;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: '2px',
};

export const ModalComponent: FunctionComponent<IModal> = ({
                                                              openModal,
                                                              setOpenModal,
                                                              label,
                                                              getValue,
                                                              Form,
                                                              toastMessage,
                                                              severityType,
                                                              disabledSave,
                                                              openToast
                                                          }: IModal) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpenModal(false);

    const handleChange = () => {
        getValue(true)
    };

    const handleCloseToast = (reason: string) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };


    return (
        <>
            <Modal
                open={openModal}
                onClose={handleClose}
                closeAfterTransition
                slots={{backdrop: Backdrop}}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={openModal}>

                    <Box sx={style}>
                        <Box sx={{padding: 2}}>
                            <div onClick={handleClose}
                                 style={{textAlign: "end", marginBottom: "-16px", cursor: "pointer"}}>
                                <AiOutlineClose size={20}/></div>
                            <Typography id="transition-modal-title" variant="h5" component="h2"
                                        sx={{borderBottom: "1px solid rgb(0, 0, 0, 0.2)"}}>
                                {label}
                            </Typography>
                            <Typography id="transition-modal-description" sx={{mt: 2}}>
                                {Form}
                            </Typography>
                        </Box>

                        <Box>
                            <FooterRegister
                                disabled={disabledSave}
                                widthButton="100px"
                                showBackButton={false}
                                getValue={handleChange}
                                iconCheck={<GiCheckMark size={20}/>}/>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
            <Toast
                severity={severityType}
                width="100%"
                duration={2000}
                message={toastMessage}
                open={openToast}
                onClose={handleCloseToast}
            />
        </>
    );
}