import {FunctionComponent, useState} from "react";
import useLoginStore from "../../../login/store/useLoginStore";
import usePointFormStore from "../store/usePointFormStore";
import {useNavigate} from "react-router-dom";
import {PointsService} from "../../service";
import {Messages} from "../../../../internationalization/message";
import {Creation} from "../../../../components/creation";
import {TransferForm} from "../form/transferForm";
import {ValidateError} from "../validate-factory/validate-error";


export const TransferProgram: FunctionComponent = () => {
    const loginStore = useLoginStore();
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
            if (response.data.message === "Sucesso") {
                setOpen(true);
                setSeverity("success");
                setToastMessage(Messages.messages.operationSuccess);
                setIsLoading(false);

                setTimeout(() => {
                    setOpen(false);
                    navigate("/grupos/programa-pontos");
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

    const handleAdd = () => {
        const updateList = [...formStore.formProgramList];
        updateList.push(
            {
                id: null,
                program: '',
                value: '',
                pointsExpirationDate: null,
                index: updateList.length,
                userAuthId: loginStore.userId,
                typeOfScore: '',
            }
        )
        formStore.setPointFormList(updateList);
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
            disabledSaveButton={false}
            pathBack="/grupos/programa-pontos"
            toastMessage={toastMessage}
            severityType={severity}
            isLoading={isLoading}
            open={open}
            handleClose={handleClose}
            hasButton={false}
        />
    );

}