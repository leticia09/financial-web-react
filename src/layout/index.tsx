import {FunctionComponent, useState} from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
// @ts-ignore
import {Header} from "./header/index.tsx";
// @ts-ignore
import {Sidebar} from "./sidebar/index.tsx";
import {ILoginInformation} from "../interfaces/loginInformation";
// @ts-ignore
import {Home} from "./home/index.tsx";

export const Layout: FunctionComponent = (loginInformation: ILoginInformation) => {

    const [showSidebar, setShowSidebar] = useState(true);

    function changeShowSidebar() {
        showSidebar ? setShowSidebar(false) : setShowSidebar(true);
    }

    return (
        <Box sx={{display: "flex", maxWidth: "100%"}}>

            <Header
                showSidebar={showSidebar}
                prop={loginInformation}
                getValue={changeShowSidebar}
            />

            <Sidebar
                showSidebar={showSidebar}
                width="240px"
            />

            <Home loginInformation={loginInformation}/>
        </Box>
    );
}