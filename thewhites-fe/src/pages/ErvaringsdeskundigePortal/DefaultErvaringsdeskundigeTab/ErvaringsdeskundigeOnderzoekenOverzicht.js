import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { fetchApi, postApi } from "../../../hooks/useApi";
import { OnderzoekInfo } from "../../../components/OnderzoekInfo/OnderzoekInfo";
import { ErvaringsdeskundigeOnderzoekFeedback } from "./ErvaringsdeskundigeOnderzoekFeedback";
import { ErvaringsdeskundigeOnderzoekInhoud } from "./ErvaringsdeskundigeOnderzoekInhoud";
import { formatResponseError } from "../../../util/Util";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";

export const ErvaringsdeskundigeOnderzoekenOverzicht = () => {
	const [currentOnderzoek, setCurrentOnderzoek] = useState(null);
	const [onderzoeken, setOnderzoeken] = useState([]);
	const [showVerlaatConfirmModal, setShowVerlaatConfirmModal] = useState(false);
	const [verlaatOnderzoekId, setVerlaatOnderzoekId] = useState(null);
	const [error, setError] = useState(null);

	const fetchDeelgenomenOnderzoeken = async () => {
		const response = await fetchApi({route: "api/ErvaringsDeskundige/mijn-onderzoeken"});

		console.log(response);

		if (response && response.status == 200)
		{
			setOnderzoeken(response.data);
		}
	};

	useEffect(() => {
		fetchDeelgenomenOnderzoeken();
	}, []);

	const handleVerlaten = async (onderzoekId) => {
		setVerlaatOnderzoekId(onderzoekId);
		setShowVerlaatConfirmModal(true);
	};

	const handleConfirmVerlaten = async () => {
		if (verlaatOnderzoekId == null)
			return setError("Er is iets foutgegaan bij het verlaten van dit onderzoek. Herlaad de pagina en probeer opnieuw.");

		const response = await postApi({route: "api/ErvaringsDeskundige/mijn-onderzoek-verlaten/" + verlaatOnderzoekId}).catch((e) =>	{
			setError((<Alert variant="danger">
				{formatResponseError(e)}
			</Alert>));
		});

		if (response && response.status == 200)
		{
			setError(<Alert variant="success">
				Onderzoek successvol verlaten.
			</Alert>);
		}
		console.log(response);

		await fetchDeelgenomenOnderzoeken();
	};

	return (<>
		{currentOnderzoek && <>
			<OnderzoekInfo onderzoek={currentOnderzoek} />
			<ErvaringsdeskundigeOnderzoekInhoud onderzoek={currentOnderzoek} />
			<br />
			<ErvaringsdeskundigeOnderzoekFeedback onderzoek={currentOnderzoek} />
			<br />
			<Button variant="outline-secondary" onClick={() => setCurrentOnderzoek(null)}>
				Terug
			</Button>
			<br />
			<br />
		</>}

		{error}
		{showVerlaatConfirmModal && <ConfirmationModal 
			show={showVerlaatConfirmModal} 
			title="Weet je het zeker?" 
			handleConfirm={() => { 
				handleConfirmVerlaten(); 
				setShowVerlaatConfirmModal(false); 
			}} 
			handleClose={() => {
				setShowVerlaatConfirmModal(false);
			}}
		>
			<h4>Je staat op het punt om onderzoek &apos;{onderzoeken.find(x => x.id === verlaatOnderzoekId)?.titel}&apos; te verlaten.</h4>
		</ConfirmationModal>}

		<Row className="justify-content-md-center" hidden={currentOnderzoek ? "hidden" : ""}>
			<Col md={6} className="d-flex justify-content-center">
				<Card className="w-100">
					<Card.Header><h3>Deelgenomen onderzoeken</h3></Card.Header>
					<ListGroup variant="flush">
						{onderzoeken.length == 0 && <ListGroup.Item className="d-flex flex-wrap justify-content-between">
							Geen onderzoeken gevonden.
						</ListGroup.Item>}
						

						{onderzoeken.map(onderzoek => (						
							<ListGroup.Item key={onderzoek.id} className="d-flex flex-wrap justify-content-between">
								<span>{onderzoek.titel}</span>
								<div>								
									<Button variant="outline-danger" onClick={() => handleVerlaten(onderzoek.id)}>Verlaten</Button>
									<Button variant="primary" onClick={() => setCurrentOnderzoek(onderzoek)}>Bekijken</Button>
								</div>
							</ListGroup.Item>
						))}

					</ListGroup>
				</Card>
			</Col>
		</Row>
	</>);
};
