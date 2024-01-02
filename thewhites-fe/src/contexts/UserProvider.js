import React, { useEffect, useContext, createContext, useState } from "react";
import { AuthContext } from "../App";
import { CustomLoginContext } from "../App";
import { postApi } from "../hooks/useApi";
import { fetchApi } from "../hooks/useApi";
import { ROLES } from "../constants/roles";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [username, setUsername] = useState("");
	const [role, setRole] = useState("");

	const {loggedIn, setLoggedIn} = useContext(AuthContext);
	const {googleCredentials} = useContext(CustomLoginContext);

	useEffect(() => {
		if (googleCredentials)
		{
			const getJwtToken = async () => {
				const response = await postApi({route: "api/Login/login_google", body: JSON.stringify(googleCredentials)});
		
				if (response.status == 200) {
					console.log("Authenticated.");
					setLoggedIn(true);
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
					setUsername(response.data.voornaam); // Dit moet uiteindelijk de gebruikersnaam worden
					setRole(response.data.rol);
				}
			};
			getGebruikerInfo();	
		}
	}, [loggedIn]);

	const setValidRole = (newRole) => {
		if (ROLES[newRole]) {
			setRole(newRole);
		} else {
			console.error(`Invalid role: ${newRole} set. Valid roles are: ${ROLES.join(", ")}`);
		}
	};

	return (
		<UserContext.Provider value={{ username, setUsername, role, setRole: setValidRole }}>
			{children}
		</UserContext.Provider>
	);
};
