import './creation.css'
import {FunctionComponent} from "react";
// @ts-ignore
import {ButtonComponent} from "../button/index.tsx";
// @ts-ignore
import {FooterRegister} from "../footer-register/index.tsx";
import {BsBackspace} from "react-icons/bs";
import {GiCheckMark} from "react-icons/gi";
// @ts-ignore
import {Toast} from "../toast/index.tsx";
// @ts-ignore
import {LoadingComponent} from "../loading/index.tsx";

interface ICreation {
    titles: string;
    Form: JSX.Element[];
    titlesButton: string;
    handleAddMember: () => void;
    save: () => void;
    pathBack: string;
    toastMessage: string;
    severityType: string;
    isLoading: boolean;
    open: boolean;
    handleClose: () => void;
}
//todo: Verificar a parte do toast - não está aparecendo
//todo: backend está deixando criar membros com o mesmo nome
export const Creation: FunctionComponent = ({
                                                titles,
                                                Form,
                                                titlesButton,
                                                handleAddMember,
                                                save,
                                                pathBack,
                                                toastMessage,
                                                severityType,
                                                isLoading,
                                                open,
                                                handleClose
                                            }: ICreation) => {

    const handleSave = () => {
        save();
    };

    const handleAdd = () => {
        handleAddMember();
    };

    const close = () => {
        handleClose();
    };

    return (
        <>
            <div className="content-member">

                <div className="labels-member">
                    <h3>{titles}</h3>
                </div>
                <div className="line"/>

                {Form}

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
                        border="2px solid #46ba52"
                        padding="2px"
                        marginBottom="20px"
                        fontWeight="400"
                        action={handleAdd}/>
                </div>

                <FooterRegister
                    path={pathBack}
                    disabled={false}
                    widthButton="100px"
                    getValue={handleSave}
                    iconBack={<BsBackspace size={20}/>}
                    iconCheck={<GiCheckMark size={20}/>}
                />

                <Toast
                    severity={severityType}
                    width="100%"
                    duration={2000}
                    message={toastMessage}
                    open={open}
                    onClose={close}
                />
                {isLoading && (
                    <LoadingComponent/>
                )}
            </div>
        </>
    );
}