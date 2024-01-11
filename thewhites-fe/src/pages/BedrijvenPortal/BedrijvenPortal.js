import React from "react";
import { Outlet } from "react-router-dom";
import NavbarPortal from "../../components/NavbarPortal/NavbarPortal";


const Bedrijvenportal = () => {
	return (
		<>
			<NavbarPortal 
				portalName="Bedrijf Portaal"
				portalPath="/bedrijf"
				links={[
					{ name: "Opdrachten", path: "./opdrachten" },
					{ name: "Chat", path: "./chat" },
					{ name: "Profiel", path: "./profiel" }
				]} 
			/>
			<Outlet />
		</>
	);
};

export default Bedrijvenportal;