import React, { useState } from "react";
import PortalWelcomeMessage from "../../../../components/PortalWelcomeMessage/PortalWelcomeMessage";
import NavigationCard from "../../../../components/NavigationCard/NavigationCard";
import { Row, Container } from "react-bootstrap";

const DefaultOnderzoekenTab = () => {
	return (
		<>
			<PortalWelcomeMessage name="onderzoeken" />
			<Container>
				<Row className="justify-content-center">
					<NavigationCard
						title="Nieuwe onderzoek plaatsen"
						content="Hier kan je nieuwe onderzoeken plaatsen voor ervaringsdeskundigen. Je kan hierbij aangeven wat voor soort onderzoek het is en nog meer relevante details van de onderzoek"
						linkTo="./nieuw"
					/>
					<NavigationCard
						title="Lopende onderzoeken"
						content="Hier kan je lopende onderzoeken bekijken. Daarnaast kan je hier ook details zien van de onderzoek en als het nodig is de onderzoek zelf wijzigen als het nog niet gestart is."
						linkTo="./lopende-onderzoeken"
					/>
					<NavigationCard
						title="Oude onderzoeken inzien"
						content="Bekijk hier oude onderzoeken die al zijn afgerond. Je kan hierbij ook de details en de resultaten van de onderzoek bekijken."
						linkTo="./oude-onderzoeken"
					/>
				</Row>
			</Container>
		</>
	);
};

export default DefaultOnderzoekenTab;