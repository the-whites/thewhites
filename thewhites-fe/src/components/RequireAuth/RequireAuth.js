import React from "react";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserProvider";
import { Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
	const { role } = useContext(UserContext);
	return (
		<>
			{allowedRoles.includes(role) ? (
				<Outlet />
			) : (
				<>je mag  deze pagina niet bekijken jongedame</>
			)}
		</>
	);
};

export default RequireAuth;
