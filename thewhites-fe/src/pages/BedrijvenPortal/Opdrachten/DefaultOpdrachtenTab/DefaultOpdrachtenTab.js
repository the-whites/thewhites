import React, { useState } from "react";
import PortalWelcomeMessage from "../../../../components/PortalWelcomeMessage/PortalWelcomeMessage";
import NavigationCard from "../../../../components/NavigationCard/NavigationCard";
import { Row, Container } from "react-bootstrap";

const DefaultOpdrachtenTab = () => {
	const [bedrijfsnaam] = useState("Test Bedrijf"); // moet de beheerdersnaam nog uit de database halen/ die inlogd is
	
	return (
		<>
			<PortalWelcomeMessage name="opdrachten" text="Hier kunt u opdrachten plaatsen, uw lopende onderzoeken bekijken en wijzigen en oude onderzoeken inzien." username={bedrijfsnaam} />
			<Container>
				<Row className="justify-content-center">
					<NavigationCard
						title="Nieuwe opdracht plaatsen"
						content="Hier kan je nieuwe opdrachten plaatsen voor ervaringsdeskundigen. Je kan hierbij aangeven wat voor soort opdracht het is en nog meer relevante details van de opdracht"
						linkTo="./nieuw"
					/>
					<NavigationCard
						title="Lopende opdrachten"
						content="Hier kan je lopende opdrachten bekijken. Daarnaast kan je hier ook details zien van de opdracht en als het nodig is de opdracht zelf wijzigen als het nog niet gestart is."
						linkTo="./lopende-opdrachten"
					/>
					<NavigationCard
						title="Oude opdrachten inzien"
						content="Bekijk hier oude opdrachten die al zijn afgerond. Je kan hierbij ook de details en de resultaten van de opdracht bekijken."
						linkTo="./oude-opdrachten"
					/>
				</Row>
			</Container>
		</>
	);
};

export default DefaultOpdrachtenTab;