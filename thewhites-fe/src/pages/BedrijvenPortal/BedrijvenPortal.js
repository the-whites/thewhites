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
					{ name: "Opdrachten", path: "/bedrijf/opdrachten" },
					{ name: "Chat", path: "/bedrijf/chat" },
					{ name: "Profiel", path: "/bedrijf/profiel" }
				]} 
			/>
			<Outlet />
		</>
	);
};

export default Bedrijvenportal;