import { FunctionComponent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './login.css'
import { LoginService } from "./service";
import useLoginStore from "./store/useLoginStore";
import useGlobalStore from "../global-informtions/store/useGlobalStore";
import { GlobalService } from "../global-informtions/service";
import { Messages } from "../../internationalization/message";
import { Input } from "../../components/input";
import { InputPassword } from "../../components/password";
import { ButtonComponent } from "../../components/button";
import { Toast } from "../../components/toast";
import { MembersManagementService } from "../members/service";
import { LogoIcon } from "icons/assets/iconLogo";
import { motion } from "framer-motion";
import {getDefaultLocale} from "react-datepicker";


export const Login: FunctionComponent = () => {
    const navigate = useNavigate();
    const loginService = LoginService();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [open, setOpen] = useState(false);
    const { setAuth, setUser, setUserId, setSex } = useLoginStore();
    const globalStore = useGlobalStore();
    const membersManagementService = MembersManagementService();
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
                if (response.data.severity === "success") {
                    setAuth(response.data.data.auth);
                    setUser(response.data.data.name);
                    setUserId(response.data.data.id);
                    setSex(response.data.data.sex);
                    navigate("/splash");

                    const memberResponse = await membersManagementService.getMembersDropdown(response.data.data.id);
                    globalStore.setMember(memberResponse.data.data);

                    const modalityResponse = await globalService.getModality();
                    globalStore.setModality(modalityResponse.data);

                    const bankResponse = await globalService.getBank(response.data.data.id);
                    globalStore.setBank(bankResponse.data.data);

                    const typeOfScoreResponse = await globalService.getTypeOfScore();
                    globalStore.setTypeOfScore(typeOfScoreResponse.data.data);

                    const programResponse = await globalService.getProgram(response.data.data.id);
                    globalStore.setProgram(programResponse.data.data);

                    const statusResponse = await globalService.getStatus();
                    globalStore.setStatus(statusResponse.data.data);

                    const groupResponse = await globalService.getGroups(response.data.data.id);
                    globalStore.setMacroGroup(groupResponse.data.data);

                    const expense = await globalService.getExpense(response.data.data.id);
                    globalStore.setExpense(expense.data.data);

                    const ticket = await globalService.getTicket(response.data.data.id);
                    globalStore.setTickets(ticket.data.data);

                    const money = await globalService.getMoney(response.data.data.id);
                    globalStore.setMoney(money.data.data);

                    const entrance = await globalService.getEntrance(response.data.data.id);
                    let list = [];
                    entrance.data.data.forEach(res => {
                        list.push({
                            id: res.id,
                            description: res.source + " - " + res.type,
                            salary: res.currency + " " + res.salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
                            ownerId: res.owner.id,
                        })
                    })
                    globalStore.setEntrance(list)

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
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="content-info">
                <div className="info-title">
                    {Messages.titles.infoTitleLogin}
                </div>
                <div className="info-text">
                    {Messages.titles.infoTextLogin}
                </div>
            </motion.div>
            <motion.div className="content-login"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            >
                <div className="logo-content">
                    <LogoIcon width="150" height="150" />
                </div>
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
            </motion.div>
        </div >
    );
}