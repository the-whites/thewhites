import React from "react";
import PortalWelcomeMessage from "../../../components/PortalWelcomeMessage/PortalWelcomeMessage";

const DefaultBeheerderPage = () => {
	return (
		<>
			<PortalWelcomeMessage name="beheerders" />
			<p>Hier bevindt zich een lijst met alle bedrijven.</p>
		</>
	);
};

export default DefaultBeheerderPage;