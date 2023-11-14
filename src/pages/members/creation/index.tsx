import {FunctionComponent, useEffect, useState} from "react";
import './creationMember.css'
import {useNavigate} from "react-router-dom";
import {RegisterMembersService} from "./service";
import useLoginStore from "../../login/store/useLoginStore";
import {MemberForm} from "./form/";
import useFormStore from "./store/useFormStore";
import {Messages} from "../../../internationalization/message";
import {Creation} from "../../../components/creation";
import useGlobalStore from "../../global-informtions/store/useGlobalStore";
import {ValidateError} from "../../../validate-error/validate-error";
import {ValidateFormMember} from "./validate-factory";
import {MembersManagementService} from "../service";


export const RegisterMember: FunctionComponent = () => {
    const loginStore = useLoginStore();
    const formStore = useFormStore();
    const globalStore = useGlobalStore();
    const membersManagementService = MembersManagementService();
    const registerMembersService = RegisterMembersService();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
    const [toastMessage, setToastMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        formStore.setFormList([
            {
                id: null,
                index: 0,
                name: "",
                userAuthId: 0,
                color: '',
                status: 0
            }
        ])
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
                userAuthId: loginStore.userId,
                color: '',
                status: 0
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
            setOpen(true);
            setSeverity(response.data.severity);
            setToastMessage(ValidateError(response.data.message));

            const memberResponse = await membersManagementService.getMembersDropdown(response.data.data.id);
            globalStore.setMember(memberResponse.data.data);

            setTimeout(() => {
                setOpen(false);
                if (response.data.severity === "success")
                navigate("/grupos/membros");
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
            titles={Messages.titles.registerMembers}
            Form={
                formStore.formList.map((member, i) => (
                    <MemberForm
                        key={i}
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
            disabledSaveButton={ValidateFormMember(formStore.formList)}
            hasButton={true}
            handleClose={handleClose}
        />
    );
}