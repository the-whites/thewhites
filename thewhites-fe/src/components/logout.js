import { useSelector } from "react-redux";
import { postApi } from "../hooks/useApi";
import { getToken } from "./AxiosInstance";


export const logout = async () => {
	let token = getToken();
	await postApi({route: "api/Login/logout", token: token});
	sessionStorage.removeItem("ac_token");
};
