import {FunctionComponent, useState} from "react";
// @ts-ignore
import {Creation} from "../../../components/creation/index.tsx";
// @ts-ignore
import {Messages} from "../../../internationalization/message/index.ts";
// @ts-ignore
import useLoginStore from "../../login/store/useLoginStore.ts";
// @ts-ignore
import useFormBankStore from "./store/useFormBankStore.ts";
// @ts-ignore
import {BankDataForm} from "./form/bankForm.tsx";
// @ts-ignore
import {ValidateForm} from "./validade-factory/validadeFactory.ts";
// @ts-ignore
import {BankDataManagementService} from "../service/index.tsx";
import {useNavigate} from "react-router-dom";

export const RegisterBankData: FunctionComponent = () => {
    const loginStore = useLoginStore();
    const formStore = useFormBankStore();
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const registerBankService = BankDataManagementService();
    const navigate = useNavigate();

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const save = async () => {
        formStore.formList.userAuthId = loginStore.userId;

        setIsLoading(true);

        try {
            const response = await registerBankService.saveRegisterBank(formStore.formList);
            if (response.data.message === "success") {
                setOpen(true);
                setSeverity("sucess");
                setToastMessage(Messages.messages.operationSuccess);
                navigate("/grupos/dados-bancarios");
                setIsLoading(false);
            } else {
                setOpen(false);
                setSeverity("error");
                setToastMessage(Messages.titles.errorMessage);
            }

        } catch (e) {
            setIsLoading(false);
            setSeverity("error");
            setToastMessage(Messages.titles.errorMessage);
            setOpen(true);
        }
    }

    return (
        <Creation
            titles={Messages.titles.registerBankData}
            Form={
                <BankDataForm/>
            }
            titlesButton={Messages.titles.addCard}
            save={save}
            disabledSaveButton={ValidateForm(formStore.formList)}
            pathBack="/grupos/dados-bancarios"
            toastMessage={toastMessage}
            severityType={severity}
            isLoading={isLoading}
            open={open}
            handleClose={handleClose}
            hasBlock={true}
            columns={formStore.columns}
            rows={formStore.rows}
            loginStore={loginStore}
            blocksNumber={formStore.formList.accounts}
        />
    );
}