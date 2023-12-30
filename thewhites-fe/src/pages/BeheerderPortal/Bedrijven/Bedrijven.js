import React, { useState } from "react";
import PortalWelcomeMessage from "../../../components/PortalWelcomeMessage/PortalWelcomeMessage";

const BedrijvenBHP = () => {
	const [beheerdersnaam] = useState("Test Beheerder"); // moet de beheerdersnaam nog uit de database halen/ die inlogd is
	
	return (
		<>
			<PortalWelcomeMessage name="bedrijven" text="Hier bevindt zich een lijst met alle bedrijven." username={beheerdersnaam} />
		</>
	);
};

export default BedrijvenBHP;