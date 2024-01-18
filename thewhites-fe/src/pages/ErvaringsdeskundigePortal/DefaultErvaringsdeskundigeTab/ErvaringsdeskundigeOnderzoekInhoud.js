import React from "react";
import { Card, Col, Form, Row } from "react-bootstrap";

export const ErvaringsdeskundigeOnderzoekInhoud = ({onderzoek}) => {
	return (
		<Row>
			<Col md={12}>
				<Card className="text-center">
					<Card.Header><h3>Onderzoek Inhoud</h3></Card.Header>
					<Card.Body>
						<Card.Text>
							{onderzoek.inhoud}
						</Card.Text>
					</Card.Body>
				</Card>
			
			</Col>
		</Row>
	);
};
