import React from "react";
import PortalWelcomeMessage from "../../../components/PortalWelcomeMessage/PortalWelcomeMessage";

const DefaultBedrijvenPage = () => {
	return (
		<>
			<PortalWelcomeMessage name="bedrijven" />
			<p>Hier ziet u een overzicht van uw bedrijfsaccount.</p>
		</>
	);
};

export default DefaultBedrijvenPage;