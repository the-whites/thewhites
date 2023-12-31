import React, { useState } from "react";
import PortalWelcomeMessage from "../../../components/PortalWelcomeMessage/PortalWelcomeMessage";

const ProfielErvaringsdeskundige = () => {
	const [ErvaringsdeskundigeNaam] = useState("Test Ervaringsdeskundige"); // moet de beheerdersnaam nog uit de database halen/ die inlogd is
	
	return (
		<>
			<PortalWelcomeMessage name="profiel" text="Hier kunt u de uw profiel wijzingen." username={ErvaringsdeskundigeNaam} />
		</>
	);
};

export default ProfielErvaringsdeskundige;