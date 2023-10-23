import {FunctionComponent, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
// @ts-ignore
import {Messages} from "../../internationalization/message/index.ts";
import '../login/login.css'
// @ts-ignore
import {Input} from "../../components/input/index.tsx";
// @ts-ignore
import {InputPassword} from "../../components/password/index.tsx";
// @ts-ignore
import {ButtonComponent} from "../../components/button/index.tsx";
// @ts-ignore
import {DropdownSingleSelect} from "../../components/dropdown/index.tsx";
// @ts-ignore
import {InputCPF} from "../../components/input-cpf-validation/index.tsx";
// @ts-ignore
import {validateEmail} from "../../utils/validateEmail.tsx";
// @ts-ignore
import {RegisterAccountService} from "./service/index.tsx";
// @ts-ignore
import {Toast} from "../../components/toast/index.tsx";
// @ts-ignore

export const dataSex = [
    {
        id: 1,
        description: "Feminino"
    },
    {
        id: 2,
        description: "Masculino"
    }
];
export const RegisterAccount: FunctionComponent = () => {
    const navigate = useNavigate();
    const registerAccountService = RegisterAccountService();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [sex, setSex] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [toastMessage, setToastMessage] = useState('')

    const handleClose = (reason: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const saveRegisterAccount = async (event) => {
        if (event) {
            const payload = {
                name: name,
                login: email,
                password: password,
                cpf: cpf,
                sex: sex,
            };

            try {
                const response = await registerAccountService.auth(payload);
                if (response.data.message === "Sucesso") {
                    setSeverity('success')
                    setToastMessage(Messages.titles.userRegisterSucess)
                    setOpen(true);

                    setTimeout(() => {
                        setOpen(false);
                        navigate("/login");
                    }, 2000);

                } else {
                    setSeverity('error')
                    setToastMessage(Messages.titles.errorMessage)
                    setOpen(true);
                }

            } catch (e) {
                console.log('error:', e);
                setSeverity('error')
                setToastMessage(Messages.titles.errorMessage)
                setOpen(true);
            }
        }
    }
    return (
        <div className="login">
            <div className="content-info">
                <div className="info-title">
                    {Messages.titles.infoTitleLogin}
                </div>
                <div className="info-text">
                    {Messages.titles.infoTextLogin}
                </div>
            </div>
            <div className="content-login">
                <div className="login-img">
                    <div>{Messages.titles.financial}</div>
                </div>

                <Input
                    label={Messages.titles.name}
                    disabled={false}
                    width="300px"
                    getValue={(value) => setName(value)}
                />

                <InputCPF
                    label={Messages.titles.cpf}
                    disabled={false}
                    width="300px"
                    getValue={(value) => setCpf(value)}
                />

                <Input
                    label={Messages.titles.email}
                    disabled={false}
                    width="300px"
                    getValue={(value) => {
                        setEmail(value);
                        setIsValidEmail(validateEmail(value))
                    }}
                    invalidField={!isValidEmail && email.length > 1}
                    invalidMessage={Messages.messages.emailNotOk}
                />

                <DropdownSingleSelect
                label={Messages.titles.sex}
                data={dataSex}
                idProperty={"id"}
                descriptionProperty={"description"}
                disabled={false}
                width={"300px"}
                getValue={(value) => setSex(value)}
                />

                <InputPassword
                    label={Messages.titles.password}
                    disabled={false}
                    width="300px"
                    getValue={(value) => setPassword(value)}
                />

                <InputPassword
                    label={Messages.titles.comfirmPassword}
                    disabled={false}
                    width="300px"
                    getValue={(value) => setconfirmPassword(value)}
                />
                <div>
                    <ButtonComponent
                        label={Messages.titles.register}
                        disabled={
                            name.length === 0 ||
                            !isValidEmail ||
                            password.length === 0 ||
                            sex.length === 0 ||
                            cpf.length === 0 ||
                            password !== confirmPassword
                        }
                        width="300px"
                        height="40px"
                        cursor="pointer"
                        borderRadius="6px"
                        color="white"
                        background="#05465f"
                        padding="2px"
                        marginBottom="20px"
                        border='none'
                        fontWeight="600"
                        action={saveRegisterAccount}
                    />
                </div>

                <Link className="link" to="/login">
                    <span>{Messages.titles.back}</span>
                </Link>

                <Toast
                    severity={severity}
                    width="100%"
                    duration={2000}
                    message={toastMessage}
                    open={open}
                    onClose={handleClose}
                />

            </div>
        </div>
    );
}