import React from "react";
import { Outlet } from "react-router-dom";
import NavbarPortal from "../../components/NavbarPortal/NavbarPortal";



const Ervaringsdeskundigeportal = () => {
	
	return (
		<>
			<NavbarPortal 
				portalName="Ervaringsdeskundige Portaal" 
				portalPath="/ervaringsdeskundige"
				links={[
					{ name: "Chat", path: "/ervaringsdeskundige/chat" },
					{ name: "Onderzoeken", path: "/ervaringsdeskundige/overzicht" },
					{ name: "Profiel", path: "/ervaringsdeskundige/profiel" }
				]} 
			/>
			<Outlet />
		</>
	);
};

export default Ervaringsdeskundigeportal;