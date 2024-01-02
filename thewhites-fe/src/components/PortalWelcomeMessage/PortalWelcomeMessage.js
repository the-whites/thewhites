import { React, useContext }from "react";
import { Container, Row, Col } from "react-bootstrap";
import { UserContext } from "../../contexts/UserProvider";

import "./PortalWelcomeMessage.css";

const PortalWelcomeMessage = ( {name, text} ) => {
	const { username } = useContext(UserContext);

	return (
		<>
			<Container className="mt-4">
				<Row>
					<Col lg={12}>
						<h2 className="admin-welcome">Welkom bij het {name} scherm, {username}.</h2>
						<p>{text}</p>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default PortalWelcomeMessage;
