import { message, notification } from "antd";
import axios from "axios";
import { createEffect, createEvent, createStore, sample } from "effector";
import { host } from "../../const";

export const loginEvent = createEvent<LoginInfo>();
export const logout = createEvent();
export const $isAuth = createStore(false).reset(logout)
export const $user = createStore("").reset(logout)
export const $token = createStore({
    accesToken: "",
    refreshToken: "",
}).reset(logout)
export type LoginInfo = {
    password: string,
    name: string,
    email: string,
}
export type tokenResponse = {
    accesToken: string,
    refreshToken: string,
}

export const LoginFx = createEffect((Login: LoginInfo) => {
    console.log(Login)
    return axios.post(`${host}/api/UserLogin/log`, Login).then(res => res.data)
});

$token.on(LoginFx.doneData, (_, res: tokenResponse) => {
    console.log(res);
    return res
})
$isAuth.on(LoginFx.doneData, () => {
    notification.open({
        message: "Авторизация выполнена !",
    })
    return true
})
$isAuth.on(LoginFx.failData, () => {
    notification.open({
        message: "Неверный логин / пароль",
    })
    return false
})
sample({
    clock: loginEvent /* 1 */,
    target: LoginFx /* 4 */,
})

$user.on(loginEvent, (_,val) => val.name)

loginEvent.watch(el => {
    message.open({
        type: 'loading',
        content: 'Action in progress..',
        duration: 2,
      });
})
