import React from "react";
import { Outlet } from "react-router-dom";
import NavbarPortal from "../../components/NavbarPortal/NavbarPortal";
import BeheerderNavbar from "../../components/NavbarPortal/BeheerderNavbar";


const Beheerdersportal = () => {
	return (
		<>
			<BeheerderNavbar />
			<Outlet />
		</>
	);
};

export default Beheerdersportal;