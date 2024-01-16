import React, { useEffect, createContext, useState } from "react";
import Cookies from "js-cookie";
import { postApi, fetchApi } from "../hooks/useApi";
import { ROLES } from "../constants/roles";
import useUpdateLoginState from "../hooks/useUpdateLoginState";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedIn } from "../redux/loginSlice";
import { setToken } from "../components/AxiosInstance";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();
export const CustomLoginContext = createContext("");
export const AuthContext = createContext("");

export const UserProvider = ({ children }) => {
	const [username, setUsername] = useState("");
	const [role, setRole] = useState("");
	const [userId, setUserId] = useState();
	const [googleCredentials, setGoogleCredentials] = useState("");
	const loggedIn = useSelector((state) => state.login_status.isLoggedIn);
	const dispatch = useDispatch();
	const navigate = useNavigate();


	useEffect(() => {
		if (googleCredentials)
		{
			const getJwtToken = async () => {
				const response = await postApi({route: "api/Login/login_google", body: JSON.stringify(googleCredentials)});
		
				if (response.status == 200) {
					console.log("Authenticated.");
					setToken(response.data.token);
					dispatch(setLoggedIn(true));
				}
			};
			getJwtToken();
		}

	}, [googleCredentials]);

	useEffect(() => {
		if (loggedIn)
		{
			const getGebruikerInfo = async () => {
				const response = await fetchApi({route: "api/Login/profileInfo"});
		
				if (response.status == 200) {
					setUsername(response.data.voornaam + " " + response.data.achternaam);
					setRole(response.data.rol);
					setUserId(response.data.id);
					console.log(response.data);
					const isFirstLogin = Cookies.get("firstLogin") === undefined;
					if (isFirstLogin) {
						Cookies.set("firstLogin", "false", { expires: 1 }); // Cookie verloopt na 1 dagen TEST
						navigate("/profielPagina"); 
					}
				}
			};
			getGebruikerInfo();	
		}
	}, [loggedIn, navigate]);

	const setValidRole = (newRole) => {
		if (ROLES[newRole]) {
			setRole(newRole);
		} else {
			console.error(`Invalid role: ${newRole} set. Valid roles are: ${ROLES.join(", ")}`);
		}
	};

	useUpdateLoginState(loggedIn, setLoggedIn);


	return (
		<CustomLoginContext.Provider value={{googleCredentials, setGoogleCredentials}}>
			<UserContext.Provider value={{ username, setUsername, role, setRole: setValidRole, userId, setUserId}}>
				{children}
			</UserContext.Provider>
		</CustomLoginContext.Provider>
	);
	
};