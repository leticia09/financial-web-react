import {FunctionComponent, useEffect, useState} from "react";
import {Creation} from "../../../components/creation";
import {Messages} from "../../../internationalization/message";
import useLoginStore from "../../login/store/useLoginStore";
import {useNavigate} from "react-router-dom";
import useGlobalStore from "../../global-informtions/store/useGlobalStore";
import {MembersManagementService} from "../../members/service";
import {GlobalService} from "../../global-informtions/service";
import {EntranceForm} from "./form";
import useEntranceStore from "../store/useEntranceStore";

export const EntranceCreation: FunctionComponent = () => {
    const loginStore = useLoginStore();
    const formStore = useEntranceStore();
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    const [toastMessage, setToastMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const globalStore = useGlobalStore();
    const membersManagementService = MembersManagementService();
    const service = GlobalService();

    useEffect(() => {
        const fetchData = async () => {

            // const memberResponse = await membersManagementService.getMembersDropdown(loginStore.userId);
            // globalStore.setMember(memberResponse.data.data);
            //
            // const programResponse = await service.getProgram(loginStore.userId);
            // globalStore.setProgram(programResponse.data.data);
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

        // formStore.formList.userAuthId = loginStore.userId;
        //
        // formStore.formList.accounts.forEach(account => {
        //     account.cards.forEach(card => {
        //         let owner = globalStore.members.filter(mem => mem.name === card.owner)[0]
        //         let program = globalStore.program.filter(pro => pro.description === card.program)[0];
        //         card.program = program ? program.id : null;
        //         card.owner = owner ? owner.id.toString() : null;
        //     })
        // });
        //
        // try {
        //     let response: { data: { message: string; severity: string; }; };
        //     if(formStore.formType === "CREATE") {
        //         response = await registerBankService.saveRegisterBank(formStore.formList);
        //     }
        //     if(formStore.formType === "EDIT") {
        //         response = await registerBankService.editBank(formStore.formList);
        //     }
        //
        //     if (response.data.message === "success") {
        //         setOpen(true);
        //         setSeverity("success");
        //         setToastMessage(Messages.messages.operationSuccess);
        //
        //         setTimeout(() => {
        //             setOpen(false);
        //             setIsLoading(false);
        //             if (response.data.severity === "success")
        //                 navigate("/grupos/dados-bancarios");
        //         }, 2000);
        //
        //     } else {
        //         setOpen(true);
        //         setSeverity("error");
        //         setToastMessage(ValidateError(response.data.message));
        //         setIsLoading(false);
        //     }
        //
        // } catch (e) {
        //     setIsLoading(false);
        //     setSeverity("error");
        //     setToastMessage(Messages.titles.errorMessage);
        //     setOpen(true);
        // }
    }

    return (
        <Creation
            titles={Messages.titles.registerEntrance}
            Form={[
                <EntranceForm/>
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