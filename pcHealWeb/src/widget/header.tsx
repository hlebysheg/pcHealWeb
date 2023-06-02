import { Link } from "react-router-dom";
import * as React from "react";
import { Button, Menu } from "antd";
import { useStore } from "effector-react";
import { $isAuth, $user, logout } from "../features/login";
import { LogoutOutlined } from "@ant-design/icons";
import pcIncon from '../assets/mac-mini.png';
import { useLocation } from 'react-router-dom'

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
    {element: buttonPcheal, key: 2, path: 'pcinfo'},
    {element: buttonLogin, key: 3, path: 'login'},
    {element: headerIcon, key: 4, path: 'nonepath'},
  ];
  const [selected, setSelected] = React.useState(["0"]);
  const location = useLocation();
  React.useEffect(() => {
    const pathName = location.pathname;
    const selectedBtn = headerButtons.filter(el => pathName.includes(el.path));
    setSelected(selectedBtn.map(el => el.key.toString()))
  }, [location])
  return (
    <header style={{display: "flex"}}>
      
      <Menu
        theme={"light"}
        mode="horizontal"
        color="white"
        style={{ minWidth: 0, flex: "auto", justifyContent: "end" }}
        defaultSelectedKeys={["0"]}
        selectedKeys={selected}
        items={headerButtons.map((el) => {
          return {
            key: el.key,
            label: el.element(),
          };
        })}
      />
    </header>
  );
};

function useRouteMatch() {
  throw new Error("Function not implemented.");
}
