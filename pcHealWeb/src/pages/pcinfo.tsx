import signalR, { HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect, useState } from "react";
import { $token } from "../features/login";
import { useStore } from "effector-react";
import { host, host_hub } from "../const";
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
    });
    connection.on("PCInfo", (info: PCInfoMessage) => {
      console.log(info);
    });
  }, [connection]);
  return <div>pcinfo</div>;
};
