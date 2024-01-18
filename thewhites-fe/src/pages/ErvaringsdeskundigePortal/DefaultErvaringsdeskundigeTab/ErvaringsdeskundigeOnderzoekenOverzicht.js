import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { fetchApi } from "../../../hooks/useApi";
import { OnderzoekInfo } from "../../../components/OnderzoekInfo/OnderzoekInfo";
import { ErvaringsdeskundigeOnderzoekFeedback } from "./ErvaringsdeskundigeOnderzoekFeedback";
import { ErvaringsdeskundigeOnderzoekInhoud } from "./ErvaringsdeskundigeOnderzoekInhoud";

export const ErvaringsdeskundigeOnderzoekenOverzicht = () => {
	const [currentOnderzoek, setCurrentOnderzoek] = useState(null);
	const [onderzoeken, setOnderzoeken] = useState([]);

	useEffect(() => {
		const fetchDeelgenomenOnderzoeken = async () => {
			const response = await fetchApi({route: "api/ErvaringsDeskundige/mijn-onderzoeken"});

			if (response && response.status == 200)
			{
				setOnderzoeken(response.data);
			}
		};

		fetchDeelgenomenOnderzoeken();
	}, []);

	return (<>
		{currentOnderzoek && <>
			<OnderzoekInfo onderzoek={currentOnderzoek} />
			<ErvaringsdeskundigeOnderzoekInhoud onderzoek={currentOnderzoek} />
			<br />
			<ErvaringsdeskundigeOnderzoekFeedback onderzoek={currentOnderzoek} />
		</>}

		<Row className="justify-content-md-center" hidden={currentOnderzoek ? "hidden" : ""}>
			<Col md={6} className="d-flex justify-content-center">
				<Card className="w-100">
					<Card.Header><h3>Deelgenomen onderzoeken</h3></Card.Header>
					<ListGroup variant="flush">
						{onderzoeken.map(onderzoek => (						
							<ListGroup.Item key={onderzoek.id} className="d-flex flex-wrap justify-content-between">
								<span>{onderzoek.titel}</span>
								<Button variant="primary" onClick={() => setCurrentOnderzoek(onderzoek)}>Bekijken</Button>
							</ListGroup.Item>
						))}

					</ListGroup>
				</Card>
			</Col>
		</Row>
	</>);
};
