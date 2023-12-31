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
					{ name: "Chat", path: "/ervaringsdeskundige/chatErvaringdeskundige" },
					{ name: "Onderzoeken", path: "/ervaringsdeskundige/OverzichtOnderzoeken" },
					{ name: "Profiel", path: "/ervaringsdeskundige/profiel" }
				]} 
			/>
			<Outlet />
		</>
	);
};

export default Ervaringsdeskundigeportal;