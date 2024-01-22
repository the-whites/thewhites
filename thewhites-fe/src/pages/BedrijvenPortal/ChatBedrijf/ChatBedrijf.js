import React, { useState } from "react";
import PortalWelcomeMessage from "../../../components/PortalWelcomeMessage/PortalWelcomeMessage";
import {Footer, Header}  from "../../../components/Footer/Footer";
import { MultiChat } from "../../../components/Chat/MultiChat";
import { Container } from "react-bootstrap";

const Chat = () => {
	
	return (
		<>
			<h1>Bedrijf chat omgeving</h1>
			<Container>
				<MultiChat />
			</Container>

		</>
	);
};
  

export default Chat;