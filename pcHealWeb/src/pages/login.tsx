import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { $isAuth, loginEvent } from "../features/login";
import { useStore } from "effector-react/effector-react.mjs";
import {  useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const [name, setName] = useState("");
    
    const navigate = useNavigate();
    
    const [password, setPassword] = useState("");

    const auth = useStore($isAuth);

    function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>){
        setPassword(e.target.value);
    }
    function handleChangeName(e: React.ChangeEvent<HTMLInputElement>){
        setName(e.target.value);
    }
    function handleSubmit (e: React.FormEvent<HTMLElement>)  {
        e.preventDefault()
        loginEvent({
            name: name,
            email: "",
            password: password,
        })
      }
      useEffect(() => {
        if(auth){
            setTimeout(() => {return navigate("/pcinfo");}, 2000)
        }
      }, [auth])
    return (
        <div style={{width: "300px", marginLeft: "auto", marginRight: "auto", marginTop: "3rem"}}>
            <Form onSubmitCapture={handleSubmit} className="login-form">
                <Form.Item>
                    <Input
                        placeholder="Username"
                        value={name}
                        onChange={handleChangeName}
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        placeholder="Password"
                        value={password}
                        type="password"
                        onChange={handleChangePassword}
                    />
                </Form.Item>
                <Form.Item style={{justifyContent: "center", display: "flex"}}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                    >
                    Log in
                </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
