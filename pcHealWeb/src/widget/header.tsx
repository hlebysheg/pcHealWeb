import { Link } from "react-router-dom";
import * as React from "react";
import { Button, Layout, Menu } from "antd";
import { useStore } from "effector-react";
import { $isAuth, $user } from "../features/login";

const buttonLogin = () => {
  const name = useStore($user);
  const isAuth = useStore($isAuth); 
  if(isAuth){
    return <div>
    <span>{name}</span>
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

export const Header: React.FC = () => {
  const headerButtons = [
    buttonLogin,
    buttonPcheal,
  ];

  return (
    <header>
      <Menu
        theme={"light"}
        mode="horizontal"
        color="white"
        style={{ minWidth: 0, flex: "auto", justifyContent: "center" }}
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