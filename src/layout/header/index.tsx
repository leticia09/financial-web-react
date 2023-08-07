import {FunctionComponent} from "react";
import './header.css'
import * as AiIcons from "react-icons/ai";
import * as FcIcons from "react-icons/fc";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import {ILoginInformation} from "../../interfaces/loginInformation";

interface IInput {
    prop: any;
    showSidebar: boolean;
    name: string;
    getValue: (value: boolean) => void;
}

export const Header: FunctionComponent = ({showSidebar, prop, getValue}: IInput) => {

    const navigate = useNavigate();

    function out() {
        navigate("/");
    }

    function change() {
        if (showSidebar) {
            getValue(false);
        } else {
            getValue(true);
        }
    }

    return (
        <Box
            component="main"
            sx={{
                position: "absolute",
                top: "0",
                minWidth: "100%",
                width: "100%",
                fontSize: "0.80rem",
                background: "#fff",
                color: "#333",
                fontWeight: "800",
                height: "60px",
                boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.1)",
            }}
        >
            <div className="header">
                <div className="dash">
                    {showSidebar && <div></div>}
                    <div className="dash_button">
                        <AiIcons.AiOutlineBars size={35} onClick={() => change()}/>
                    </div>
                </div>

                <div className="options">
                    {prop.loginInformation.sex === 1 && (
                        <div className="icon_user">
                            <FcIcons.FcBusinesswoman size={20}/>
                        </div>
                    )}
                    {prop.loginInformation.sex === 2 && (
                        <div className="icon_user">
                            <FcIcons.FcBusinessman size={20}/>
                        </div>
                    )}

                    <div className="user_name">{prop.loginInformation.user}</div>
                    <div className="icon">
                        <AiIcons.AiOutlineLogout onClick={() => out()} size={30}/>
                    </div>
                </div>
            </div>
        </Box>

    );
}