import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import "./PortalWelcomeMessage.css";

const PortalWelcomeMessage = ( {name, text, username} ) => {
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
