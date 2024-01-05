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
						content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt tincidunt velit, quis condimentum ligula euismod in."
						linkTo="./nieuw"
					/>
					<NavigationCard
						title="Lopende opdrachten"
						content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt tincidunt velit, quis condimentum ligula euismod in."
						linkTo="./profiel"
					/>
					<NavigationCard
						title="Oude opdrachten inzien"
						content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt tincidunt velit, quis condimentum ligula euismod in."
						linkTo="./profiel"
					/>
				</Row>
			</Container>
		</>
	);
};

export default DefaultOpdrachtenTab;