import React, { useState } from "react";
import PortalWelcomeMessage from "../../../components/PortalWelcomeMessage/PortalWelcomeMessage";

const ProfielUpdate = () => {
	const [bedrijfsnaam] = useState("Test Bedrijf"); // moet de beheerdersnaam nog uit de database halen/ die inlogd is
	
	return (
		<>
			<PortalWelcomeMessage name="profiel" text="Hier kunt u de profiel van het bedrijf aanpassen." username={bedrijfsnaam} />
		</>
	);
};

export default ProfielUpdate;