import {FunctionComponent, useEffect, useState} from "react";
import {Creation} from "../../../../components/creation";
import {Messages} from "../../../../internationalization/message";
import {UseForm} from "./useForm";
import {ValidateFormUse} from "../validate-factory/validateForms";
import useUpdateFormStore from "../store/useUpdateFormStore";
import {PointsService} from "../../service";
import {useNavigate} from "react-router-dom";
import {ValidateError} from "../../../../validate-error/validate-error";
import useGlobalStore from "../../../global-informtions/store/useGlobalStore";
import useLoginStore from "../../../login/store/useLoginStore";
import {MembersManagementService} from "../../../members/service";


export const UsePoint: FunctionComponent = () => {
    const loginStore = useLoginStore();
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    const [toastMessage, setToastMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const formStore = useUpdateFormStore();
    const pointsService = PointsService();
    const navigate = useNavigate();
    const globalStore = useGlobalStore();
    const membersManagementService = MembersManagementService();


    useEffect(() => {
        const fetch = async () => {
            const memberResponse = await membersManagementService.getMembersDropdown(loginStore.userId);
            globalStore.setMember(memberResponse.data.data);
        };
        fetch();
    }, []);

    const handleClose = (reason: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };


    const save = async () => {
        setIsLoading(true);
        const payload = {
            programId: formStore.formUse.programId,
            value: formStore.formUse.value,
            userAuthId: loginStore.userId,
            ownerId: formStore.formUse.ownerId
        }
        formStore.setUserAuthId(loginStore.userId)
        try {
            const response = await pointsService.use(payload);
            setOpen(true);
            setSeverity(response.data.severity);
            setToastMessage(ValidateError(response.data.message));

            setTimeout(() => {
                setOpen(false);
                setIsLoading(false);
                if(response.data.severity === "success")
                navigate("/grupos/programa-pontos");
            }, 3000);

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