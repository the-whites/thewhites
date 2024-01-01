import React, { createContext, useState } from "react";

const roles = {
	beheerder: "beheerder",
	bedrijf: "bedrijf",
	ervaringsdeskundige: "ervaringsdeskundige"
};

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [username, setUsername] = useState("");
	const [role, setRole] = useState("");

	const setValidRole = (newRole) => {
		if (roles[newRole]) {
			setRole(newRole);
		} else {
			console.error(`Invalid role: ${newRole} set. Valid roles are: ${roles.join(", ")}`);
		}
	};

	return (
		<UserContext.Provider value={{ username, setUsername, role, setRole: setValidRole, roles }}>
			{children}
		</UserContext.Provider>
	);
};
