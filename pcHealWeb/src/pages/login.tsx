import { Button, Card, Col, Form, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { $isAuth, loginEvent } from "../features/login";
import { useStore } from "effector-react/effector-react.mjs";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const auth = useStore($isAuth);

  function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }
  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }
  function handleSubmit(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    loginEvent({
      name: name,
      email: "",
      password: password,
    });
  }
  useEffect(() => {
    if (auth) {
      setTimeout(() => {
        return navigate("/pcinfo");
      }, 2000);
    }
  }, [auth]);
  return (
    <div style={{ marginLeft: "auto", marginRight: "auto", marginTop: "3rem" }}>
      <Row justify="center">
        <Col xl={6} lg={8} md={10} sm={12} xs={24}>
          <Card style={{ marginTop: 45 }}>
            <Col span={24} className="typo-grey typo-center">
              <h2>PcHealWeb Login</h2>
            </Col>
            <Form layout="vertical" onSubmitCapture={handleSubmit}>
              <Form.Item
                label="Name"
                name="Name"
                style={{ marginBottom: 15 }}
              >
                <Input value={name} onChange={handleChangeName} />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Password is required" }]}
                style={{ marginBottom: 15 }}
              >
                <Input.Password name="password" value={password} onChange={handleChangePassword} />
              </Form.Item>

              <Row gutter={[8, 8]} style={{ marginTop: 15, display:"flex", justifyContent: "center" }} justify="end">
                <Col
                >
                  <Button type="primary" htmlType="submit">
                    Log in
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
