import React from "react";
import NavbarPortal from "../NavbarPortal/NavbarPortal";

const BeheerderNavbar = () => {

	return (
		<NavbarPortal 
			portalName="Beheerders Portaal" 
			portalPath="/beheerder"
			links={[
				{ name: "Ervaringsdeskundige", path: "/beheerder/ervaringsdeskundigBHP" },
				{ name: "Onderzoeken", path: "/beheerder/onderzoeken" },
				{ name: "Bedrijven", path: "/beheerder/bedrijven" },
				{ name: "Meldingen", path: "/meldingen"}
			]} 
		/>
	);
};

export default BeheerderNavbar;
