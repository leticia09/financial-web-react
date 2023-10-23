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
    const [severity, setSeverity] = useState('success');
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
        formStore.formList.userAuthId = loginStore.userId;

        setIsLoading(true);

        try {
            const response = await registerBankService.saveRegisterBank(formStore.formList);
            if (response.data.message === "success") {
                setOpen(true);
                setSeverity("success");
                setToastMessage(Messages.messages.operationSuccess);
                setIsLoading(false);

                setTimeout(() => {
                    setOpen(false);
                    navigate("/grupos/dados-bancarios");
                }, 2000);

            } else {
                setOpen(true);
                setSeverity("error");
                switch (response.data.message) {
                    case "REQUIRED_FIELDS_MISSING":
                        setToastMessage(Messages.messages.requiredFields);
                        break;
                    case "BANK_NAME_ALREADY_EXISTS":
                        setToastMessage(Messages.messages.bankNameAlreadyExists);
                        break;
                    case "DUPLICATE_ACCOUNT_NUMBER":
                        setToastMessage(Messages.messages.duplicateAccountNumber);
                        break;
                    case "DUPLICATE_CARD_NUMBER":
                        setToastMessage(Messages.messages.duplicateCardNumber);
                        break;
                    default:
                        setToastMessage(Messages.titles.errorMessage);

                }

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