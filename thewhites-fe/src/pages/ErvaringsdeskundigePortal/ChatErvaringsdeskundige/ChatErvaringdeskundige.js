import React, { useState } from "react";
import PortalWelcomeMessage from "../../../components/PortalWelcomeMessage/PortalWelcomeMessage";

const ChatErvaringsdeskundige = () => {
	const [ErvaringsdeskundigeNaam] = useState("Test Ervaringsdeskundige"); // moet de beheerdersnaam nog uit de database halen/ die inlogd is
	
	return (
		<>
			<PortalWelcomeMessage name="chat" text="Hier kunt u chats starten met bedrijven of met de Stichting." username={ErvaringsdeskundigeNaam} />
		</>
	);
};

export default ChatErvaringsdeskundige;