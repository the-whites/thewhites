import React from "react";
import { Outlet } from "react-router-dom";
import NavbarPortal from "../../components/NavbarPortal/NavbarPortal";


const Beheerdersportal = () => {
	return (
		<>
			<NavbarPortal 
				portalName="Beheerders Portaal" 
				portalPath="/beheerder"
				links={[
					{ name: "Ervaringsdeskundige", path: "/beheerder/ervaringsdeskundigBHP" },
					{ name: "Onderzoeken", path: "/beheerder/onderzoeken" },
					{ name: "Bedrijven", path: "/beheerder/bedrijven" }
				]} 
			/>
			<Outlet />
		</>
	);
};

export default Beheerdersportal;