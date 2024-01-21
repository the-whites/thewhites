import React, { useState } from "react";
import PortalWelcomeMessage from "../../../components/PortalWelcomeMessage/PortalWelcomeMessage";
import {Footer, Header}  from "../../../components/Footer/Footer";
import { MultiChat } from "../../ErvaringsdeskundigePortal/ChatErvaringsdeskundige/MultiChat";
import { Container } from "react-bootstrap";

const Chat = () => {
	const [bedrijfsnaam] = useState("Test Bedrijf"); // moet de beheerdersnaam nog uit de database halen/ die inlogd is
	
	return (
		<>
			<PortalWelcomeMessage name="chat" username={bedrijfsnaam} />
			<Container>
				<MultiChat />
			</Container>

		</>
	);
};
  

export default Chat;