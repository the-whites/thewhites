import React, { useState } from "react";
import PortalWelcomeMessage from "../../../components/PortalWelcomeMessage/PortalWelcomeMessage";

const Opdrachten = () => {
	const [bedrijfsnaam] = useState("Test Bedrijf"); // moet de beheerdersnaam nog uit de database halen/ die inlogd is
	
	return (
		<>
			<PortalWelcomeMessage name="opdrachten" text="Hier kunt u opdrachten plaatsen." username={bedrijfsnaam} />
		</>
	);
};

export default Opdrachten;