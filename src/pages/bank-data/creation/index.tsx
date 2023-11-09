import {FunctionComponent, useState} from "react";
import {Creation} from "../../../components/creation";
import {Messages} from "../../../internationalization/message";
import useLoginStore from "../../login/store/useLoginStore";
import useFormBankStore from "./store/useFormBankStore";
import {BankDataForm} from "./form/bankForm";
import {ValidateForm} from "./validade-factory/validadeFactory";
import {BankDataManagementService} from "../service";
import {useNavigate} from "react-router-dom";
import {ValidateError} from "../../../validate-error/validate-error";

export const RegisterBankData: FunctionComponent = () => {
    const loginStore = useLoginStore();
    const formStore = useFormBankStore();
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    const [toastMessage, setToastMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const registerBankService = BankDataManagementService();
    const navigate = useNavigate();

    const handleClose = (reason: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const save = async () => {
        setIsLoading(true);
        formStore.formList.userAuthId = loginStore.userId;

        try {
            const response = await registerBankService.saveRegisterBank(formStore.formList);
            if (response.data.message === "success") {
                setOpen(true);
                setSeverity("success");
                setToastMessage(Messages.messages.operationSuccess);

                setTimeout(() => {
                    setOpen(false);
                    setIsLoading(false);
                    navigate("/grupos/dados-bancarios");
                }, 2000);

            } else {
                setOpen(true);
                setSeverity("error");
                setToastMessage(ValidateError(response.data.message));
                setIsLoading(false);
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
            Form={[
                <BankDataForm/>
            ]}
            titlesButton={Messages.titles.addCard}
            save={save}
            disabledSaveButton={ValidateForm(formStore.formList)}
            pathBack="/grupos/dados-bancarios"
            toastMessage={toastMessage}
            severityType={severity}
            showLineProgress={isLoading}
            open={open}
            handleClose={handleClose}
            hasBlock={true}
            columns={formStore.columns}
            rows={formStore.rows}
            blocksNumber={formStore.formList.accounts}
        />
    );
}