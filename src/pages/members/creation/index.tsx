import {FunctionComponent, useEffect, useState} from "react";
import './creationMember.css'
import {useNavigate} from "react-router-dom";
import {RegisterMembersService} from "./service";
import useLoginStore from "../../login/store/useLoginStore";
import {MemberForm} from "./form/";
import useFormStore from "./store/useFormStore";
import {Messages} from "../../../internationalization/message";
import {Creation} from "../../../components/creation";
import {BankDataManagementService} from "../../bank-data/service";
import useGlobalStore from "../../global-informtions/store/useGlobalStore";
import {ValidateError} from "../../../validate-error/validate-error";


export const RegisterMember: FunctionComponent = () => {
    const loginStore = useLoginStore();
    const formStore = useFormStore();
    const globalStore = useGlobalStore();
    const bankDataManagementService = BankDataManagementService();
    const registerMembersService = RegisterMembersService();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    const [toastMessage, setToastMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        formStore.resetFormStore();
    }, []);

    const handleClose = (reason: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const handleAddMember = () => {
        const updateList = [...formStore.formList];
        updateList.push(
            {
                id: null,
                name: '',
                index: updateList.length,
                userAuthId: loginStore.userId
            }
        )
        formStore.setFormList(updateList);
    }

    const saveMember = async () => {
        setIsLoading(true);

        formStore.formList.forEach(form => {
            form.userAuthId = loginStore.userId;
        })

        try {
            const response = await registerMembersService.createMember(formStore.formList);
            if (response.data.message === "Sucesso") {
                setOpen(true);
                setSeverity("success");
                setToastMessage(Messages.titles.addMember);

                const memberResponse = await bankDataManagementService.getMembers(loginStore.userId);
                globalStore.setMember(memberResponse.data.data);

                setTimeout(() => {
                    setOpen(false);
                    navigate("/grupos/membros");
                    setIsLoading(false);
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

    return (
        <Creation
            titles={Messages.titles.registerMembers}
            Form={
                formStore.formList.map((member, i) => (
                    <MemberForm
                        key={member.index}
                        i={i}
                        hasDelete={i > 0}
                    />
                ))
            }
            titlesButton={Messages.titles.addMembers}
            handleAddMember={handleAddMember}
            save={saveMember}
            pathBack="/grupos/membros"
            toastMessage={toastMessage}
            severityType={severity}
            showLineProgress={isLoading}
            open={open}
            disabledSaveButton={!formStore.formList[0].name}
            hasButton={true}
            handleClose={handleClose}
        />
    );
}