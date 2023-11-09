import {FunctionComponent, useState} from "react";
import {Creation} from "../../../components/creation";
import {Messages} from "../../../internationalization/message";
import useLoginStore from "../../login/store/useLoginStore";
import {useNavigate} from "react-router-dom";
import {GroupForm} from "./form";
import {GroupsService} from "../service";
import useGroupStore from "./store/useGroupStore";
import {ValidateError} from "../../../validate-error/validate-error";
import {ValidateGroupForm} from "./validate-factory/validate";

export const GroupsCreation: FunctionComponent = () => {
    const loginStore = useLoginStore();
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    const [toastMessage, setToastMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const service = GroupsService();
    const formStore = useGroupStore();

    const handleClose = (reason: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const save = async () => {
        setIsLoading(true);
        if (formStore.formList.specificGroups.length > 0) {
            formStore.formList.specificGroups.forEach(sp => {
                sp.userAuthId = loginStore.userId;
            })
        }

        const payload = {
            name: formStore.formList.name,
            userAuthId: loginStore.userId,
            specificGroups: formStore.formList.specificGroups,
        }

        try {
            const response = await service.create(payload);
            setOpen(true);
            setSeverity(response.data.message);
            setToastMessage(ValidateError(response.data.message));

            setTimeout(() => {
                setOpen(false);
                setIsLoading(false);
                navigate("/grupos/grupos");
            }, 2000);

        } catch (e) {
            setIsLoading(false);
            setSeverity("error");
            setToastMessage(Messages.titles.errorMessage);
            setOpen(true);
        }
    }

    return (
        <Creation
            titles={Messages.titles.registerGroups}
            Form={[
                <GroupForm/>
            ]}
            titlesButton={Messages.titles.addCard}
            save={save}
            disabledSaveButton={ValidateGroupForm(formStore.formList)}
            pathBack="/grupos/grupos"
            toastMessage={toastMessage}
            severityType={severity}
            open={open}
            handleClose={handleClose}
            showLineProgress={isLoading}
        />
    );
}