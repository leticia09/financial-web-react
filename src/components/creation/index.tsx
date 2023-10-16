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
// @ts-ignore
import {BlockComponent} from "../block/index.tsx";

interface ICreation {
    titles: string;
    Form: JSX.Element[];
    save: () => void;
    pathBack: string;
    toastMessage: string;
    severityType: string;
    isLoading: boolean;
    open: boolean;
    handleClose: () => void;
    hasBlock: boolean;
    columns: [];
    rows: [];
    blocksNumber: [];
    disabledSaveButton: boolean;
}

//todo: Verificar a parte do toast - não está aparecendo
//todo: backend está deixando criar membros com o mesmo nome
export const Creation: FunctionComponent = ({
                                                titles,
                                                Form,
                                                save,
                                                pathBack,
                                                toastMessage,
                                                severityType,
                                                isLoading,
                                                open,
                                                handleClose,
                                                hasBlock,
                                                blocksNumber,
                                                columns,
                                                rows,
                                                disabledSaveButton
                                            }: ICreation) => {

    const handleSave = () => {
        save();
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