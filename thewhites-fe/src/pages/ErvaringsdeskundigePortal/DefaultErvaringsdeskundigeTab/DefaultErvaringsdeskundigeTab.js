import React from "react";
import PortalWelcomeMessage from "../../../components/PortalWelcomeMessage/PortalWelcomeMessage";
import { ErvaringsdeskundigeOnderzoekenOverzicht } from "./ErvaringsdeskundigeOnderzoekenOverzicht";
import { Container } from "react-bootstrap";

const DefaultErvaringsdeskundigePage = () => {
	return (
		<>
			<br />
			<Container>
				<PortalWelcomeMessage name="Ervaringsdeskundige" />
				<p>Hier kunt u kiezen om mee te doen aan onderzoeken of u profiel wijzingen</p>
				<br />
				<ErvaringsdeskundigeOnderzoekenOverzicht />
			</Container>
		</>
	);
};

export default DefaultErvaringsdeskundigePage;