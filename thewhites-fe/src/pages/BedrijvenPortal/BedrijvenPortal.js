import React from "react";
import { Outlet } from "react-router-dom";
import NavbarPortal from "../../components/NavbarPortal/NavbarPortal";
import { Footer } from "../../components/Footer/Footer";


const Bedrijvenportal = () => {
	return (
		<>
			<NavbarPortal 
				portalName="Bedrijf Portaal"
				portalPath="/bedrijf"
				links={[
					{ name: "Onderzoeken", path: "./onderzoeken" },
					{ name: "Chat", path: "./chat" },
					{ name: "Profiel", path: "./profiel" }
				]} 
			/>
			<Outlet />
			</>
	);
};

export default Bedrijvenportal;