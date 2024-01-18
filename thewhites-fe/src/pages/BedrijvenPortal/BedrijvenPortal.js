import React from "react";
import { Outlet } from "react-router-dom";
import BedrijfNavbar from "../../components/NavbarPortal/BedrijfNavbar";


const Bedrijvenportal = () => {
	return (
		<>
			<BedrijfNavbar />
			<Outlet />
			</>
	);
};

export default Bedrijvenportal;