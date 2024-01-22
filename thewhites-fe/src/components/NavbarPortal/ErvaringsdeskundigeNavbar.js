import React from "react";
import NavbarPortal from "./NavbarPortal";

const ErvaringsdeskundigeNavbar = () => {

	return (
		<NavbarPortal 
			portalName="Ervaringsdeskundige Portaal" 
			portalPath="/ervaringsdeskundige"
			links={[
				{ name: "Onderzoeken", path: "/ervaringsdeskundige/overzicht" },
				{ name: "Profiel", path: "/ervaringsdeskundige/profiel" },
				{ name: "Meldingen", path: "/meldingen"}
			]} 
		/>
	);
};

export default ErvaringsdeskundigeNavbar;
