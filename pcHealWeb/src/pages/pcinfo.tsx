import { HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect, useState } from "react";
import { $isAuth, $token } from "../features/login";
import { useStore } from "effector-react";
import { host_hub } from "../const";
import { Col, Row, notification } from "antd";
import security from "../assets/security.jpg";

type PCInfoMessage = {
  cpuName: string;
  cpuTemp: number;
  cpuLoad: number;
  cpuFrenq: number;

  gpuName: string;
  gpuTemp: number;
  gpuLoad: number;
};
export const PcInfoPage = () => {
  const [connection, setConnection] = useState<any>();
  const isAuth = useStore($isAuth);
  const [pcHeal, setPcHeal] = useState<PCInfoMessage | null>(null);
  const tokens = useStore($token);
  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl(host_hub + "/api/pchealh/hub", {
        accessTokenFactory: () => {
          return `${tokens.accesToken}`;
        },
        withCredentials: false,
      })
      .withAutomaticReconnect()
      .build();
    connect.start();
    console.log(connect);
    setConnection(connect);
  }, []);

  useEffect(() => {
    if (connection == undefined) {
      return;
    }
    connection.on("Notify", (msg: string) => {
      console.log(msg);
      notification.warning({
        message: "Температура превысила 100 градусов!",
      });
    });
    connection.on("PCInfo", (info: PCInfoMessage) => {
      console.log(info.cpuName);
      setPcHeal(info);
    });
  }, [connection]);
  if (!isAuth) {
    return (
      <Row justify={"center"} style={{display: 'flex', flexDirection: 'column'}}>
        <Row  justify={"center"}>
          <h3>Authorize first!</h3>
        </Row>
        <Row justify={"center"}>
          <img src={security} />
        </Row>
      </Row>
    );
  }
  return (
    <div style={{ marginLeft: "auto", marginRight: "auto", width: "700px" }}>
      <Row justify={"center"} style={{ borderBottom: "1px solid black" }}>
        <h3>CPU parameter</h3>
      </Row>
      <Row justify={"center"} style={{ paddingTop: "2rem" }}>
        <Col span={6}>CPU name</Col>
        <Col span={12}>{pcHeal?.cpuName}</Col>
      </Row>
      <Row justify={"center"}>
        <Col span={6}>CPU temp</Col>
        <Col span={12}>{pcHeal?.cpuTemp.toFixed(2) + "°C"}</Col>
      </Row>
      <Row justify={"center"}>
        <Col span={6}>CPU load</Col>
        <Col span={12}>{pcHeal?.cpuLoad.toFixed(2) + "%"}</Col>
      </Row>
      <Row justify={"center"}>
        <Col span={6}>CPU frenq</Col>
        <Col span={12}>{pcHeal?.cpuFrenq.toFixed(2)}</Col>
      </Row>
      {/* GRAPHIC */}
      <Row justify={"center"} style={{ borderBottom: "1px solid black" }}>
        <h3>Graphic parameter</h3>
      </Row>

      <Row justify={"center"} style={{ paddingTop: "2rem" }}>
        <Col span={6}>GPU name</Col>
        <Col span={12}>{pcHeal?.gpuName}</Col>
      </Row>
      <Row justify={"center"}>
        <Col span={6}>GPU load</Col>
        <Col span={12}>{pcHeal?.gpuLoad.toFixed(2) + "%"}</Col>
      </Row>
      <Row justify={"center"}>
        <Col span={6}>GPU temp</Col>
        <Col span={12}>{pcHeal?.gpuTemp.toFixed(2) + "°C"}</Col>
      </Row>
    </div>
  );
};
