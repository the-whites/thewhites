import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { fetchApi, postApi } from "../../../hooks/useApi";
import { formatResponseError } from "../../../util/Util";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";

export const ErvaringsdeskundigeOnderzoekFeedback = ({onderzoek}) => {
	const navigate = useNavigate();
	const [error, setError] = useState(null);
	const [feedback, setFeedback] = useState("");
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const isStarted = new Date(onderzoek.startDatum).getTime() < Date.now();

	useEffect(() => {
		const fetchFeedback = async () => {
			const response = await fetchApi({route: "api/ErvaringsDeskundige/mijn-onderzoek-feedback/" + onderzoek.id});
			console.log(response);

			if (response && response.status == 200)
			{
				setFeedback(response.data.feedback);
			}
		};

		fetchFeedback();
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		setShowConfirmModal(true);
	};

	const handleConfirm = async () => {
		const body = {
			feedback: feedback
		}
		const response = await postApi({route: "api/ErvaringsDeskundige/mijn-onderzoek-feedback/" + onderzoek.id, body: body}).catch((e) =>	{
			console.log((e.response && e.response.data));
			setError((<Alert variant="danger">
				{formatResponseError(e)}
			</Alert>));
		});

		if (response && response.status == 200)
		{
			setError(<Alert variant="success">
				De bewerking was successvol!
			</Alert>);
		}
		console.log(response);
	}

	return (<>
		{showConfirmModal && <ConfirmationModal show={showConfirmModal} title="Weet je het zeker?" handleConfirm={() => { handleConfirm(); setShowConfirmModal(false); }} handleClose={() => setShowConfirmModal(false)}>
			<h4>Jouw nieuwe feedback:</h4>
			<p>{feedback}</p>
		</ConfirmationModal> }
		<Row>
			<Col md={12}>
				<Card className="text-center">
					<Card.Header><h3>Onderzoek Feedback</h3></Card.Header>
					<Form onSubmit={handleSubmit}>
						<Form.Group >
							<Card.Body>
								{error}
								{!isStarted && <Alert>
									Omdat het onderzoek nog niet gestart is, kun je nog geen feedback geven.
								</Alert>}
								<Form.Label><h4>Feedback</h4></Form.Label>
								<Form.Control 
									as="textarea" 
									placeholder="Schrijf hier je feedback na het maken van de opdracht..."
									value={feedback}
									onChange={(e) => setFeedback(e.target.value)}
									rows={5} 
									disabled={!isStarted}
								/>
						
							</Card.Body>
							<Card.Footer>
								<Button variant="success" type="submit" disabled={!isStarted}>
							Opslaan
								</Button>
							</Card.Footer>
						</Form.Group>
					</Form>
				</Card>
			
			</Col>
		</Row>
	</>);
};
