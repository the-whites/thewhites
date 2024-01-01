import React, { useState } from "react";
import PortalWelcomeMessage from "../../../components/PortalWelcomeMessage/PortalWelcomeMessage";

const OverzichtOnderzoeken = () => {
	const [ErvaringsdeskundigeNaam] = useState("Test Ervaringsdeskundige"); // moet de beheerdersnaam nog uit de database halen/ die inlogd is
	
	return (
		<>
			<PortalWelcomeMessage name="Onderzoeken" text="Hier kunt u kiezen uit onderzoeken om aan deel te nemen." username={ErvaringsdeskundigeNaam} />
		</>
	);
};

export default OverzichtOnderzoeken;