import React, { useState } from "react";
import PortalWelcomeMessage from "../../../components/PortalWelcomeMessage/PortalWelcomeMessage";
import { Button, Card, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { fetchApi } from "../../../hooks/useApi";

const OverzichtOnderzoeken = () => {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState([]);
	const [geselecteerdeOnderzoek, setGeselecteerdeOnderzoek] = useState(null);
  
	const handleSearch = async () => {
		const response = await fetchApi({route: "api/Onderzoek/onderzoeken"});
		console.log(response);
		
		// Filter items based on the search query
		const filteredResults = response.data.filter(item =>
			item.titel.toLowerCase().includes(query.toLowerCase()) || item.beschrijving.toLowerCase().includes(query.toLowerCase())
		);
	
		// Update the state with the filtered results
		setResults(filteredResults);
	};

	const handleDeelnemen = () => {

	};

	const getBeperkingCriterias = (beperkingCriteria) => {
		if (!beperkingCriteria || beperkingCriteria.length < 1)
			return <span>geen</span>;

		const lastItemId = beperkingCriteria[beperkingCriteria.length - 1].beperking.id;
		return beperkingCriteria.map((item) => (<span key={item.beperking.id}>{item.beperking.naam}{item.beperking.id == lastItemId ? "" : ","}</span>));
	};
	
	const getOnderzoekCategories = (onderzoekCategories) => {
		if (!onderzoekCategories || onderzoekCategories.length < 1)
			return <span>geen</span>;

		const lastItemId = onderzoekCategories[onderzoekCategories.length - 1].type.id;
		return onderzoekCategories.map((item) => (<span key={item.type.id}>{item.type.type}{item.type.id == lastItemId ? "" : ","}</span>));
	};

	const getLeeftijdCriteria = (leeftijdCriteria) => {
		if (!leeftijdCriteria || leeftijdCriteria.length < 1)
			return <span>geen</span>;

		const lastItemId = leeftijdCriteria.length - 1;
		return leeftijdCriteria.map((item, index) => (<span key={index}>{item.leeftijd}{index == lastItemId ? "" : ","}</span>));
	};

	const getPostcodeCriteria = (postcodeCriteria) => {
		if (!postcodeCriteria || postcodeCriteria.length < 1)
			return <span>geen</span>;

		const lastItemId = postcodeCriteria.length - 1;
		return postcodeCriteria.map((item, index) => (<span key={index}>{item.postcode}{index == lastItemId ? "" : ","}</span>));
	};

	return (<>
		<br />
		{geselecteerdeOnderzoek && <Container>
			<Row className="justify-content-md-center">
				<Col className="onderzoeken-search-item" md={4}>
					<Card className="text-center">
						<Card.Header>Onderzoek Specificaties</Card.Header>
						<Card.Body className="">
							<span className="d-block"><b>Bedrijf</b>: {geselecteerdeOnderzoek.bedrijf.naam}</span>
							<span className="d-block"><b>Link bedrijf</b>: <a href={geselecteerdeOnderzoek.bedrijf.link}>{geselecteerdeOnderzoek.bedrijf.link}</a> </span>
							<span className="d-block"><b>Beloning</b>: {geselecteerdeOnderzoek.beloning}</span>
							<br />
							<span className="d-block"><b>locatie</b>: {geselecteerdeOnderzoek.locatie}</span>
							<br />
							<span className="d-block"><b>Beperking criteria</b>: {getBeperkingCriterias(geselecteerdeOnderzoek.beperkingCriteria)}</span>
							<span className="d-block"><b>Onderzoek categorie criteria</b>: {getOnderzoekCategories(geselecteerdeOnderzoek.onderzoekCategories)}</span>
							<span className="d-block"><b>Leeftijd criteria</b>: {getLeeftijdCriteria(geselecteerdeOnderzoek.leeftijdCriteria)}</span>
							<span className="d-block"><b>Postcode criteria</b>: {getPostcodeCriteria(geselecteerdeOnderzoek.postcodeCriteria)}</span>
							<br />
							<span className="d-block"><b>Start datum</b>: {geselecteerdeOnderzoek.startDatum}</span>
							<span className="d-block"><b>Eind datum</b>: {geselecteerdeOnderzoek.eindDatum}</span>
						</Card.Body>
					</Card>
				</Col>
				<Col className="onderzoeken-search-item" md={8}>
					<Card className="text-center">
						<Card.Header>Onderzoek</Card.Header>
						<Card.Body>
							<Card.Title>{geselecteerdeOnderzoek.titel}</Card.Title>
							<Card.Text>
								{geselecteerdeOnderzoek.beschrijving}
							</Card.Text>
							
						</Card.Body>
					</Card>
				</Col>
			</Row>
			<Row className="justify-content-md-center">
				<Col md={8}>
					<Button 
						variant="outline-secondary" 
						id="search-bar-onderzoeken-sbmt"
						onClick={() => setGeselecteerdeOnderzoek(null)}
						
					>
						Terug
					</Button>

					<Button 
						variant="success" 
						id="search-bar-onderzoeken-sbmt"
						onClick={handleDeelnemen}
						
					>
						Deelnemen
					</Button>
				</Col>
			</Row>
		</Container>}
		<Container hidden={geselecteerdeOnderzoek ? "hidden" : ""}>
			<InputGroup className="mb-3">
				<Form.Control
					placeholder="Zoeken..."
					aria-label="Zoek waarde"
					aria-describedby="search-bar-onderzoeken-sbmt"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<Button 
					variant="outline-secondary" 
					id="search-bar-onderzoeken-sbmt"
					onClick={handleSearch}
				>
				Zoek
				</Button>
			</InputGroup>

			<Container>
				<Row className="justify-content-md-center">
					{results.map((item) => (
						<Col className="onderzoeken-search-item" key={item.id} md={7}>
							<Card className="text-center">
								<Card.Header>van {item.bedrijf.naam}</Card.Header>
								<Card.Body>
									<Card.Title>{item.titel}</Card.Title>
									<Card.Text>
										{item.beschrijving}
									</Card.Text>
									<Button variant="primary" onClick={() => setGeselecteerdeOnderzoek(item)}>Meer info</Button>
								</Card.Body>
								<Card.Footer className="text-muted">STARTDATE</Card.Footer>
							</Card>
						</Col>
					))}
				</Row>
			</Container>

	
		</Container>
	</>);
};

export default OverzichtOnderzoeken;