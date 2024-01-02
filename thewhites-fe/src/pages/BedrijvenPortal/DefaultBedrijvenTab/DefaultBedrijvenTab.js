import React from "react";
import { Container, Row } from "react-bootstrap";
import NavigationCard from "../../../components/NavigationCard/NavigationCard";
import PortalWelcomeMessage from "../../../components/PortalWelcomeMessage/PortalWelcomeMessage";

const DefaultBedrijvenPage = () => {
	return (
		<>
			<PortalWelcomeMessage name="bedrijven" text="" username="Test Bedrijf" />
		</>
	);
};

export default DefaultBedrijvenPage;