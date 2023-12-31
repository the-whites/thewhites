import React from "react";
import { Outlet } from "react-router-dom";
import NavbarPortal from "../../components/NavbarPortal/NavbarPortal";


const Bedrijvenportal = () => {
	return (
		<>
			<NavbarPortal />
			<Outlet />
		</>
	);
};

export default Bedrijvenportal;