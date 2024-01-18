import React from "react";
import NavbarPortal from "../NavbarPortal/NavbarPortal";

const BedrijfNavbar = () => {

	return (
		<NavbarPortal 
			portalName="Bedrijf Portaal"
			portalPath="/bedrijf"
			links={[
				{ name: "Onderzoeken", path: "./onderzoeken" },
				{ name: "Chat", path: "./chat" },
				{ name: "Profiel", path: "./profiel" },
				{ name: "Meldingen", path: "/meldingen" }
			]} 
		/>
	);
};

export default BedrijfNavbar;
