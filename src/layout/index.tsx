import {FunctionComponent, useState} from "react";
import Box from "@mui/material/Box";
import { ILoginInformation } from "interfaces/loginInformation";
import {Header} from "./header";
import {Sidebar} from "./sidebar";
import {Home} from "./home";


export const Layout: FunctionComponent = (loginInformation: ILoginInformation) => {

    const [showSidebar, setShowSidebar] = useState(true);

    function changeShowSidebar() {
        showSidebar ? setShowSidebar(false) : setShowSidebar(true);
    }

    return (
        <Box sx={{display: "flex", maxWidth: "100%", overflowX: "auto"}}>

            <Header
                showSidebar={showSidebar}
                prop={loginInformation}
                getValue={changeShowSidebar}
            />

            <Sidebar
                showSidebar={showSidebar}
                width="240px"
            />

            <Home/>
        </Box>
    );
}