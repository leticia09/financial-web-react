import {FunctionComponent, useState} from "react";
import {Link} from "react-router-dom";
import './login.css'
// @ts-ignore
import {Input} from "../../components/input/index.tsx";
// @ts-ignore
import {InputPassword} from "../../components/password/index.tsx";
// @ts-ignore
import {Messages} from "../../internationalization/message/index.ts";
// @ts-ignore
import {ButtonComponent} from "../../components/button/index.tsx";
import {useNavigate} from "react-router-dom";
// @ts-ignore
import {LoginService} from "./service/index.tsx";
// @ts-ignore
import useLoginStore from "./store/useLoginStore.ts";
// @ts-ignore
import {Toast} from "../../components/toast/index.tsx";

export const Login: FunctionComponent = () => {
    const navigate = useNavigate();
    const loginService = LoginService();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = useState(false);
    const {setAuth, setUser, setUserId, setSex} = useLoginStore();

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const handleSingIn = async (event) => {
        if (event) {
            const payload = {
                login: email,
                password: password,
            };

            try {
                const response = await loginService.auth(payload);
                if (response.data.message === "SUCCESS") {
                    setAuth(response.data.data.auth);
                    setUser(response.data.data.name);
                    setUserId(response.data.data.id);
                    setSex(response.data.data.sex);
                    navigate("/dashboard");
                } else {
                    setOpen(true);
                }

            } catch (e) {
                console.log('error:', e);
                setOpen(true);
            }
        }
    }

    return (
        <div className="login">
            <div className="content-login">
                <div className="title">
                    <h3>{Messages.titles.login}</h3>
                </div>
                <Input
                    label={Messages.titles.login}
                    disabled={false}
                    width="300px"
                    getValue={(value) => setEmail(value)}
                />

                <InputPassword
                    label={Messages.titles.password}
                    disabled={false}
                    width="300px"
                    getValue={(value) => setPassword(value)}
                />

                <div className="link">
                    <Link to="/register-account">
                        <span>{Messages.titles.createAccount}</span>
                    </Link>
                </div>

                <div>
                    <ButtonComponent
                        label={Messages.titles.loginEnter}
                        disabled={email.length === 0 || password.length === 0}
                        width="300px"
                        height="40px"
                        cursor="pointer"
                        borderRadius="6px"
                        color="white"
                        background="#05465f"
                        padding="2px"
                        marginBottom="20px"
                        fontWeight="600"
                        action={handleSingIn}
                    />
                </div>
                <Toast
                    severity={"error"}
                    width="100%"
                    duration={2000}
                    message={Messages.titles.userOrPasswordWrong}
                    open={open}
                    onClose={handleClose}
                />
            </div>
        </div>
    );
}