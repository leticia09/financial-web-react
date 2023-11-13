import {FunctionComponent, useState} from "react";
import usePointFormStore from "../store/usePointFormStore";
import {useNavigate} from "react-router-dom";
import {PointsService} from "../../service";
import {Messages} from "../../../../internationalization/message";
import {Creation} from "../../../../components/creation";
import {TransferForm} from "../form/transferForm";
import {ValidateFormTransfer} from "../validate-factory/validateForms";
import {ValidateError} from "../../../../validate-error/validate-error";


export const TransferProgram: FunctionComponent = () => {
    const formStore = usePointFormStore();
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    const [toastMessage, setToastMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const pointsService = PointsService();

    const handleClose = (reason: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const save = async () => {
        setIsLoading(true);

        try {
            const response = await pointsService.transfer(formStore.formTransfer);
            setOpen(true);
            setSeverity(response.data.severity);
            setToastMessage(ValidateError(response.data.message));
            formStore.resetFormStore();

            setTimeout(() => {
                setOpen(false);
                setIsLoading(false);
                navigate("/grupos/programa-pontos");
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
            titles={Messages.titles.transfer_}
            Form={
                [
                    <TransferForm/>
                ]
            }
            titlesButton={Messages.titles.addTransfer}
            save={save}
            disabledSaveButton={ValidateFormTransfer(formStore.formTransfer)}
            pathBack="/grupos/programa-pontos"
            toastMessage={toastMessage}
            severityType={severity}
            showLineProgress={isLoading}
            open={open}
            handleClose={handleClose}
            hasButton={false}
        />
    );

}