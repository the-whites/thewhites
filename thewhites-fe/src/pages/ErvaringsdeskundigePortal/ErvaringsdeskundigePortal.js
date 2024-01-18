import React from "react";
import { Outlet } from "react-router-dom";
import ErvaringsdeskundigeNavbar from "../../components/NavbarPortal/ErvaringsdeskundigeNavbar";


const Ervaringsdeskundigeportal = () => {
	return (
		<>
			<ErvaringsdeskundigeNavbar />
			<Outlet />
		</>
	);
};

export default Ervaringsdeskundigeportal;