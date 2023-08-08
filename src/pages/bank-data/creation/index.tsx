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

export const RegisterBankData: FunctionComponent = () => {
    const loginStore = useLoginStore();
    const formStore = useFormBankStore();
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const handleAddMember = () => {

    }

    const saveMember = async (event) => {

    }
    return (
        <Creation
            titles={Messages.titles.registerBankData}
            Form={
                <BankDataForm
                    accountForm={formStore.formList}
                />
            }
            titlesButton={Messages.titles.addAccount}
            handleAddMember={handleAddMember}
            save={saveMember}
            pathBack="/grupos/membros"
            toastMessage={toastMessage}
            severityType={severity}
            isLoading={isLoading}
            open={open}
            handleClose={handleClose}
        />
    );
}