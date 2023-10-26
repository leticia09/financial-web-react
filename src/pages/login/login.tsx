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
// @ts-ignore
import useGlobalStore from "../global-informtions/store/useGlobalStore.ts";
// @ts-ignore
import {BankDataManagementService} from "../bank-data/service/index.tsx";
// @ts-ignore
import {GlobalService} from "../global-informtions/service/index.tsx";

export const Login: FunctionComponent = () => {
    const navigate = useNavigate();
    const loginService = LoginService();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = useState(false);
    const {setAuth, setUser, setUserId, setSex} = useLoginStore();
    const globalStore = useGlobalStore();
    const bankDataManagementService = BankDataManagementService();
    const globalService = GlobalService();

    const handleClose = (reason: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSingIn(true);
        }
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

                    const memberResponse = await bankDataManagementService.getMembers(response.data.data.id);
                    globalStore.setMember(memberResponse.data.data);

                    const modalityResponse = await globalService.getModality();
                    globalStore.setModality(modalityResponse.data);

                    const bankResponse = await globalService.getBank(response.data.data.id);
                    globalStore.setBank(bankResponse.data.data);

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

                <div className='login-fields'>
                    <Input
                        label={Messages.titles.login}
                        disabled={false}
                        width="350px"
                        getValue={(value) => setEmail(value)}
                    />

                    <InputPassword
                        label={Messages.titles.password}
                        disabled={false}
                        width="350px"
                        getValue={(value) => setPassword(value)}
                        handleKeyPress={handleKeyPress}
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
                            border="none"
                            marginBottom="20px"
                            fontWeight="600"
                            action={handleSingIn}
                        />
                    </div>
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