import {FunctionComponent, useState} from "react";
import {Creation} from "../../../components/creation";
import {Messages} from "../../../internationalization/message";
import {useNavigate} from "react-router-dom";
import {EntranceForm} from "./form";
import useEntranceStore from "../store/useEntranceStore";
import {ValidateError} from "../../../validate-error/validate-error";
import {EntranceService} from "../service";

export const EntranceCreation: FunctionComponent = () => {
    const formStore = useEntranceStore();
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    const [toastMessage, setToastMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const entranceService = EntranceService();

    const handleClose = (reason: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const save = async () => {
        setIsLoading(true);

        try {
            const response = await entranceService.create(formStore.formList);
            setOpen(true);
            setSeverity(response.data.severity);
            setToastMessage(ValidateError(response.data.message));

            setTimeout(() => {
                setOpen(false);
                if (response.data.severity === "success")
                    navigate("/receitas");
                setIsLoading(false);
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
            titles={Messages.titles.registerEntrance}
            Form={[
                <EntranceForm key={0}/>
            ]}
            titlesButton={Messages.titles.addCard}
            save={save}
            disabledSaveButton={formStore.formList.length === 0}
            pathBack="/receitas"
            toastMessage={toastMessage}
            severityType={severity}
            showLineProgress={isLoading}
            open={open}
            handleClose={handleClose}
            hasBlock={true}
            columns={[]}
            rows={[]}
        />
    );
}