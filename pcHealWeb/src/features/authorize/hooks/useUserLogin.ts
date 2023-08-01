import { useMutation } from 'react-query';
import axios  from '../../axiosInstance/axiosInstance'

export type LoginInfo = {
    password: string,
    name: string,
    email: string,
}
export type TokenResponse = {
    accesToken: string,
    refreshToken: string,
}

const postUserData = async (data: LoginInfo) => {
  const res: TokenResponse = await axios.post<TokenResponse>("user/login", data).then(res => res.data)

  return res;
};

export const useUserLogin = () => {
  return useMutation((data: LoginInfo) => postUserData(data), {});
};