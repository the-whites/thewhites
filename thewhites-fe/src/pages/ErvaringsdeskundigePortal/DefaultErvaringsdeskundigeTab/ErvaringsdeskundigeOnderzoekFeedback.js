import React from "react";
import { Card, Col, Form, Row } from "react-bootstrap";

export const ErvaringsdeskundigeOnderzoekFeedback = ({onderzoek}) => {

	const handleSubmit = () => {

	};

	return (
		<Row>
			<Col md={12}>
				<Card className="text-center">
					<Card.Header><h3>Onderzoek Feedback</h3></Card.Header>
					<Card.Body>
						<Form onSubmit={handleSubmit}>
							<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
								<Form.Label>Example textarea</Form.Label>
								<Form.Control as="textarea" rows={3} />
							</Form.Group>
						</Form>
						
					</Card.Body>
				</Card>
			
			</Col>
		</Row>
	);
};
