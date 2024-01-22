import React from "react";
import NavbarPortal from "../NavbarPortal/NavbarPortal";

const BedrijfNavbar = () => {

	return (
		<NavbarPortal 
			portalName="Bedrijf Portaal"
			portalPath="/bedrijf"
			links={[
				{ name: "Onderzoeken", path: "/bedrijf/onderzoeken" },
				{ name: "Chat", path: "/bedrijf/chat" },
				{ name: "Profiel", path: "/bedrijf/profiel" },
				{ name: "Meldingen", path: "/meldingen" }
			]} 
		/>
	);
};

export default BedrijfNavbar;
