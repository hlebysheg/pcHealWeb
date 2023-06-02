import { Link } from "react-router-dom";
import * as React from "react";
import { Button, Menu } from "antd";
import { useStore } from "effector-react";
import { $isAuth, $user, logout } from "../features/login";
import { LogoutOutlined } from "@ant-design/icons";
import pcIncon from '../assets/mac-mini.png';
const buttonLogin = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const name = useStore($user);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isAuth = useStore($isAuth); 
  if(isAuth){
    return <div onClick={() => logout()}>
    <span>{name}</span>
    <LogoutOutlined />
  </div>
  }
  return (
    <Link to={"/login"}>
      <Button type="text">Login</Button>
    </Link>
  );
};

const buttonPcheal = () => {
  return (
    <Link to={"/pcinfo"}>
      <Button type="text">Pcheal</Button>
    </Link>
  );
};

const headerIcon = () => {
  return (
    <div style={{display: "flex", alignItems: "center"}}><img style={{width: "30px", height: "40px"}} src={pcIncon}/></div>
  )
}

export const Header: React.FC = () => {
  const headerButtons = [
    buttonPcheal,
    buttonLogin,
    headerIcon
  ];

  return (
    <header style={{display: "flex"}}>
      
      <Menu
        theme={"light"}
        mode="horizontal"
        color="white"
        style={{ minWidth: 0, flex: "auto", justifyContent: "end" }}
        defaultSelectedKeys={["0"]}
        items={headerButtons.map((el, index) => {
          const key = index + 1;
          return {
            key,
            label: el(),
          };
        })}
      />
    </header>
  );
};