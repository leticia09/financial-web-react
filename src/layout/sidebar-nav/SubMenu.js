import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
// backgroud: #1e2a36;
const SidebarLink = styled(Link)`
  display: flex;
  color:#b7c0cd;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 16px;
  padding: 20px;
  margin-left 0;
  &:hover {
    color: white;
    cursor: pointer;
    background-color: #1d2531;
  }
  &:focus {
    background-color: #1d2531;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 14px;
`;

const DropdownLink = styled(Link)`
  color: #b7c0cd;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 13px;
  &:hover {
    color: #4099ff;
    cursor: pointer;
  }
  &:focus {
    color: #4099ff;
  }
`;

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);
  return (
    <>
      <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index}>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;
