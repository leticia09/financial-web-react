import React, {FunctionComponent} from "react";
import styled from "styled-components";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";

const SidebarNav = styled.nav`
`;

const SidebarWrap = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
`;

export const SidebarNavigation: FunctionComponent = () => {
    return (
        <div>
            <IconContext.Provider value={{ color: "#fff" }}>
                <SidebarNav>
                    <SidebarWrap>
                        {SidebarData.map((item, index) => {
                            return <SubMenu item={item} key={index} />;
                        })}
                    </SidebarWrap>
                </SidebarNav>
            </IconContext.Provider>
        </div>
    );
}