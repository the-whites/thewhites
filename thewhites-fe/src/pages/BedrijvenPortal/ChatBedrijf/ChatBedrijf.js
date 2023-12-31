import React, { useState } from "react";
import PortalWelcomeMessage from "../../../components/PortalWelcomeMessage/PortalWelcomeMessage";

const Chat = () => {
	const [bedrijfsnaam] = useState("Test Bedrijf"); // moet de beheerdersnaam nog uit de database halen/ die inlogd is
	
	return (
		<>
			<PortalWelcomeMessage name="chat" text="Hier kunt u chats starten met ervaringsdeskundige." username={bedrijfsnaam} />
		</>
	);
};

export default Chat;