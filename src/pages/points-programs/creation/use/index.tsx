import {FunctionComponent, useEffect, useState} from "react";
import {Creation} from "../../../../components/creation";
import {Messages} from "../../../../internationalization/message";
import {UseForm} from "./useForm";
import {ValidateFormUse} from "../validate-factory/validateForms";
import useUpdateFormStore from "../store/useUpdateFormStore";
import {PointsService} from "../../service";
import {useNavigate} from "react-router-dom";
import {ValidateError} from "../../../../validate-error/validate-error";


export const UsePoint: FunctionComponent = () => {
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    const [toastMessage, setToastMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const formStore = useUpdateFormStore();
    const pointsService = PointsService();
    const navigate = useNavigate();


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
            setOpen(true);
            setSeverity(response.data.message);
            setToastMessage(ValidateError(response.data.message));

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
            showLineProgress={isLoading}
            open={open}
            hasButton={false}
            handleClose={handleClose}
        />
    );

}