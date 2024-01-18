import React, { useState } from "react";
import PortalWelcomeMessage from "../../../components/PortalWelcomeMessage/PortalWelcomeMessage";
import {Footer, Header}  from "../../../components/Footer/Footer";

const Chat = () => {
	const [bedrijfsnaam] = useState("Test Bedrijf"); // moet de beheerdersnaam nog uit de database halen/ die inlogd is
	
	return (
		<>
			<PortalWelcomeMessage name="chat" username={bedrijfsnaam} />
			<p>Hier kunt u chats starten met ervaringsdeskundige.</p>

		</>
	);
};
  

export default Chat;