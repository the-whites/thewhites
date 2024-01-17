import React, { useState } from "react";
import PortalWelcomeMessage from "../../../components/PortalWelcomeMessage/PortalWelcomeMessage";

const Onderzoeken = () => {
	const [beheerdersnaam] = useState("Test Beheerder"); // moet de beheerdersnaam nog uit de database halen/ die inlogd is

	return (
		<>
			<PortalWelcomeMessage name="onderzoeken" />
			<p>Hier bevindt zich een lijst met alle onderzoeken.</p>
		</>
	);
};

export default Onderzoeken;