import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import ErvaringsdeskundigeNavbar from "../../components/NavbarPortal/ErvaringsdeskundigeNavbar";
import { ProfielContext } from "../../contexts/UserProvider";



const Ervaringsdeskundigeportal = () => {
	return (
		<>
			<ErvaringsdeskundigeNavbar />
			<Outlet />
		</>
	);
};

export default Ervaringsdeskundigeportal;