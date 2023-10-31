import {FunctionComponent, useEffect, useState} from "react";
import {Creation} from "../../../../components/creation";
import {Messages} from "../../../../internationalization/message";
import {UseForm} from "./useForm";
import {ValidateFormUse} from "../validate-factory/validateForms";
import useUpdateFormStore from "../store/useUpdateFormStore";
import {PointsService} from "../../service";
import {useNavigate} from "react-router-dom";


export const UsePoint: FunctionComponent = () => {
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    const [toastMessage, setToastMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const formStore = useUpdateFormStore();
    const pointsService = PointsService();
    const navigate =  useNavigate();



    useEffect(() => {

    }, []);

    const handleClose = (reason: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };



    const save = async () => {
        setIsLoading(true);

        try {
            const response = await pointsService.use(formStore.formUse);
            if (response.data.message === "Sucesso") {
                setSeverity("success");
                setOpen(true);
                setToastMessage(Messages.messages.operationSuccess);
                setIsLoading(false);

                setTimeout(() => {
                    setOpen(false);
                    navigate("/grupos/programa-pontos");
                }, 2000);

            } else {
                setOpen(true);
                setSeverity("error");
                //setToastMessage(ValidateError(response.data.message));
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
            titles={Messages.titles.usePoints}
            Form={
                [
                    <UseForm/>
                ]
            }
            titlesButton={Messages.titles.addProgram}
            disabledSaveButton={ValidateFormUse("")}
            save={save}
            pathBack="/grupos/programa-pontos"
            toastMessage={toastMessage}
            severityType={severity}
            isLoading={isLoading}
            open={open}
            hasButton={false}
            handleClose={handleClose}
        />
    );

}