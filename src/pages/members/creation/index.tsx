import {FunctionComponent, useEffect, useState} from "react";
import './creationMember.css'
import {useNavigate} from "react-router-dom";
import {GiCheckMark} from "react-icons/gi";
import {BsBackspace} from "react-icons/bs";
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
import useFormStore from "./form/useFormStore.ts";
// @ts-ignore
import {Messages} from "../../../internationalization/message/index.ts";


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
    }, [])

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
                email: '',
                cpf: '',
                permission: 0,
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

        if (event) {
            try {
                const response = await registerMembersService.createMember(formStore.formList);
                if (response.data.message === "Sucesso") {
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
    }

    return (
        <>
            <div className="content-member">

                <div className="labels-member">
                    <h3>{Messages.titles.registerMembers}</h3>
                </div>

                {formStore.formList.map((member, i) => {
                    return (<MemberForm
                        key={member.index}
                        i={i}
                        hasDelete={i > 0}
                    />);
                })}

                <div className="add-button-member">
                    <ButtonComponent
                        label={Messages.titles.addMembers}
                        disabled={false}
                        width="140px"
                        height="30px"
                        cursor="pointer"
                        borderRadius="4px"
                        color="white"
                        background="#46ba52"
                        border="2px solid #46ba52"
                        padding="2px"
                        marginBottom="20px"
                        fontWeight="400"
                        action={handleAddMember}/>
                </div>

                <FooterRegister
                    path="/grupos/membros"
                    disabled={false}
                    widthButton="100px"
                    getValue={saveMember}
                    iconBack={<BsBackspace size={20}/>}
                    iconCheck={<GiCheckMark size={20}/>}
                />

                <Toast
                    severity={severity}
                    width="100%"
                    duration={2000}
                    message={toastMessage}
                    open={open}
                    onClose={handleClose}
                />
                {isLoading && (
                    <LoadingComponent/>
                )}
            </div>
        </>
    );
}