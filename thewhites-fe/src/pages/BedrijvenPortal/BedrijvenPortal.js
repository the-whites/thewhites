import React from "react";
import { Outlet } from "react-router-dom";
import NavbarPortal from "../../components/NavbarPortal/NavbarPortal";


const Bedrijvenportal = () => {
	return (
		<>
			<NavbarPortal 
				portalName="Bedrijfs Portaal"
				portalPath="/bedrijf"
				links={[
					{ name: "Opdrachten", path: "/bedrijf/opdrachten" },
					{ name: "chat", path: "/bedrijf/chat" },
					{ name: "Profiel", path: "/bedrijf/profiel" }
				]} 
			/>
			<Outlet />
		</>
	);
};

export default Bedrijvenportal;