import {FunctionComponent, useEffect, useState} from "react";
import './creationMember.css'
import {useNavigate} from "react-router-dom";
// @ts-ignore
import {FooterRegister} from "../../../components/footer-register/index.tsx";
// @ts-ignore
import {Toast} from "../../../components/toast/index.tsx";
// @ts-ignore
import {RegisterMembersService} from "./service/index.tsx";
// @ts-ignore
import {LoadingComponent} from "../../../components/loading/index.tsx";
// @ts-ignore
import useLoginStore from "../../login/store/useLoginStore.ts";
// @ts-ignore
import {ButtonComponent} from "../../../components/button/index.tsx";
// @ts-ignore
import {MemberForm} from "./form/index.tsx";
// @ts-ignore
import useFormStore from "./store/useFormStore.ts";
// @ts-ignore
import {Messages} from "../../../internationalization/message/index.ts";
// @ts-ignore
import {Creation} from "../../../components/creation/index.tsx";



export const RegisterMember: FunctionComponent = () => {
    const loginStore = useLoginStore();
    const formStore = useFormStore();
    const registerMembersService = RegisterMembersService()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        formStore.resetFormStore();
    }, []);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const handleAddMember = () => {
        const updateList = [...formStore.formList];
        updateList.push(
            {
                name: '',
                index: updateList.length,
                userAuthId: loginStore.userId
            }
        )
        formStore.setFormList(updateList);
    }

    const saveMember = async (event) => {
        setIsLoading(true);

        formStore.formList.forEach(form => {
            form.userAuthId = loginStore.userId;
        })

        try {
            const response = await registerMembersService.createMember(formStore.formList);
            if (response.data.message === "Sucesso") {
                setOpen(true);
                setSeverity("sucess");
                setToastMessage(Messages.titles.addMember);
                navigate("/grupos/membros");
                setIsLoading(false);
            } else {
                setOpen(false);
                setSeverity("error");
                setToastMessage(Messages.titles.errorMessage);
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
            isLoading={isLoading}
            open={open}
            handleClose={handleClose}
        />
    );
}