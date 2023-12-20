import {FunctionComponent, useEffect, useState} from "react";
import '../../members/creation/creationMember.css'
import {useNavigate} from "react-router-dom";
import useLoginStore from "../../login/store/useLoginStore";
import {Messages} from "../../../internationalization/message";
import {Creation} from "../../../components/creation";
import useGlobalStore from "../../global-informtions/store/useGlobalStore";
import {TicketsForm} from "./form/ticketsForm";
import useTicketsStore from "../store/useTicketsStore";
import {TicketsService} from "../service";
import {ValidateError} from "../../../validate-error/validate-error";


export const TicketsCreation: FunctionComponent = () => {
    const loginStore = useLoginStore();
    const globalStore = useGlobalStore();
    const formStore = useTicketsStore();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    const [toastMessage, setToastMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const service = TicketsService();


    const handleClose = (reason: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const save = async () => {
        setIsLoading(true);

        try {
            const response = await service.create({name: formStore.name, cardFinancialEntityRequestList: formStore.formList, userAuthId: loginStore.userId});
            setOpen(true);
            setSeverity(response.data.severity);
            setToastMessage(ValidateError(response.data.message));

            setTimeout(() => {
                setOpen(false);
                if (response.data.severity === "success")
                    navigate("/grupos/dados-bancarios");
                setIsLoading(false);
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
            titles={Messages.titles.registerTickets}
            Form={[
                    <TicketsForm key={0}/>
                ]}
            titlesButton={Messages.titles.addTickets}
            save={save}
            pathBack="/grupos/dados-bancarios"
            disabledSaveButton={formStore.formList.length === 0}
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