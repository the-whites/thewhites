import React, { useState } from "react";
import PortalWelcomeMessage from "../../../components/PortalWelcomeMessage/PortalWelcomeMessage";

const ErvaringsdeskundigeBHP = () => {
	const [beheerdersnaam] = useState("Test Beheerder"); // moet de beheerdersnaam nog uit de database halen/ die inlogd is
	
	
	return (
		<>
			<PortalWelcomeMessage name="ervaringsdeskundige"  />
			<p>Hier bevindt zich een lijst met alle ervaringsdeskundigen.</p>
		</>
	);
};

export default ErvaringsdeskundigeBHP;