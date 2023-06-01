import { HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect, useState } from "react";
import { $token } from "../features/login";
import { useStore } from "effector-react";
import { host } from "../const";
type PCInfoMessage = {
    cPUName:string
    cPUTemp:number
    cPULoad:number
    cPUFrenq:number

    gPUName:string
    gPUTemp:number
    gPULoad:number
}
export const PcInfoPage = () => {
    const [connection, setConnection] = useState<any>();
    const tokens = useStore($token)
    useEffect(() => {
        const connect = new HubConnectionBuilder()
            .withUrl(host+"/api/pchealh/hub", {
                accessTokenFactory: () => {
                    return `${tokens.accesToken}`
                }
            })
            .withAutomaticReconnect()
            .build();
            connect.start()
            console.log(connect)
        setConnection(connect);
    }, [])

    useEffect(() => {
        if(connection == undefined){
            return;
        }
        connection.on("Notify", (msg: string) => {
            console.log(msg);
        })
        connection.on("Receive", (info: PCInfoMessage) => {
            console.log(info);
        })
    }, [connection])
    return (
        <div>
            pcinfo
        </div>
    )
}