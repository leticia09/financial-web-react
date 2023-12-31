import {FunctionComponent} from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import {SidebarNavigation} from "../sidebar-nav";

interface ISidebar {
    showSidebar: boolean;
    width: string;
}
export const Sidebar: FunctionComponent <ISidebar> = ({showSidebar, width}: ISidebar) => {
    return (
        <Box>
            {showSidebar && (
                <Drawer
                    variant="permanent"
                    sx={{
                        width: width,
                        [`& .MuiDrawer-paper`]: {
                            width: width,
                            boxSizing: "border-box",
                            boxShadow: "2px 2px rgba(0, 0, 0, 0.1)",
                            background: "#263544",
                        },
                        [`& .MuiDrawer-paper::-webkit-scrollbar`]: {
                            width: "4px",
                            height: "4px",
                        },
                    }}
                >
                    <SidebarNavigation />
                </Drawer>
            )}
        </Box>
    );
}