import {FunctionComponent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Messages} from "../../../../internationalization/message";
import {Creation} from "../../../../components/creation";
import {ValidateError} from "../../../../validate-error/validate-error";
import useGlobalStore from "../../../global-informtions/store/useGlobalStore";
import useLoginStore from "../../../login/store/useLoginStore";
import {MembersManagementService} from "../../../members/service";
import {ReceiveForm} from "./receiveForm";
import usePointFormStore from "../../../points-programs/creation/store/usePointFormStore";
import {PointsService} from "../../../points-programs/service";
import movementBankStore from "../../store";
import {MovementBankService} from "../../service";


export const Receive: FunctionComponent = () => {
    const loginStore = useLoginStore();
    const formStore = movementBankStore();
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    const [toastMessage, setToastMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const service = MovementBankService();
    const membersManagementService = MembersManagementService();
    const globalStore = useGlobalStore();

    useEffect(() => {
        const fetchData = async () => {
            const memberResponse = await membersManagementService.getMembersDropdown(loginStore.userId);
            globalStore.setMember(memberResponse.data.data);
        };
        fetchData();
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
            const response = await service.receive(formStore.formList, loginStore.userId);
            setSeverity(response.data.severity);
            setToastMessage(ValidateError(response.data.message));
            setOpen(true);
            formStore.resetFormStore();

            setTimeout(() => {
                setOpen(false);
                setIsLoading(false);
                if(response.data.severity === "success")
                    navigate("/movimentacao-bancaria");
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
            titles={Messages.titles.receive}
            Form={
                [
                    <ReceiveForm/>
                ]
            }
            titlesButton={Messages.titles.addTransfer}
            save={save}
            disabledSaveButton={formStore.formList.length === 0}
            pathBack="/movimentacao-bancaria"
            toastMessage={toastMessage}
            severityType={severity}
            showLineProgress={isLoading}
            open={open}
            handleClose={handleClose}
            hasButton={false}
        />
    );

}