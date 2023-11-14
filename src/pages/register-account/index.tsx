import {FunctionComponent, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Messages} from "../../internationalization/message";
import '../login/login.css'
import {Input} from "../../components/input";
import {InputPassword} from "../../components/password";
import {ButtonComponent} from "../../components/button";
import {DropdownSingleSelect} from "../../components/dropdown";
import {InputCPF} from "../../components/input-cpf-validation";
import {validateEmail} from "../../utils/validateEmail";
import {RegisterAccountService} from "./service";
import {Toast} from "../../components/toast";
import {ValidateError} from "../../validate-error/validate-error";

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
    const [severity, setSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
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

                setSeverity(response.data.severity)
                setToastMessage(ValidateError(response.data.message));
                setOpen(true);

                setTimeout(() => {
                    setOpen(false);
                    if(response.data.severity === "success")
                        navigate("/login");
                }, 2000);


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