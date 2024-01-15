import React from "react";
import PortalWelcomeMessage from "../../../components/PortalWelcomeMessage/PortalWelcomeMessage";
import { Alert, Button, Card, Col, Container, Form, InputGroup, Pagination, Row } from "react-bootstrap";
import { fetchApi, postApi } from "../../../hooks/useApi";
import { OnderzoekInfo } from "./OnderzoekInfo";
import { formatResponseError, getFormattedDateLocale } from "../../../util/Util";



const itemsPerPage = 3;

const OverzichtOnderzoeken = () => {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState([]);
	const [geselecteerdeOnderzoek, setGeselecteerdeOnderzoek] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [error, setError] = useState(null);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentItems = results.slice(startIndex, endIndex);
  
	const handleSearch = async () => {
		const response = await fetchApi({route: "api/Onderzoek/onderzoeken"});
		
		console.log(response);

		// Filter items gebasseerd op zoekopdracht
		const filteredResults = response.data
			.filter(item => // Filter op woorden
				item.titel.toLowerCase().includes(query.toLowerCase()) || item.beschrijving.toLowerCase().includes(query.toLowerCase())
			).filter(item => // Filter onderzoeken die al verlopen zijn
				Date.now() < new Date(item.eindDatum).getTime()
			);
	
		// Update de results state met gevonden resultaten
		setResults(filteredResults);
	};

	const handleDeelnemen = async () => {
		const response = await postApi({route: "api/ErvaringsDeskundige/onderzoek-deelnemen/" + geselecteerdeOnderzoek.id}).catch((e) => {
			setError(<Alert variant="danger">
				{formatResponseError(e)}
			</Alert>);
		});

		console.log(response);

		if (response && response.status == 200)
		{
			setError(<Alert variant="success">
				De deelname was successvol! Zie de dashboard voor meer informatie.
			</Alert>);
		}
	};


	return (<>
		<br />
		{error}
		{geselecteerdeOnderzoek && <Container>

			<OnderzoekInfo onderzoek={geselecteerdeOnderzoek} />

			<Row className="justify-content-md-center">
				<Col md={8}>
					<Button 
						variant="outline-secondary" 
						id="search-bar-onderzoeken-sbmt"
						onClick={() => { setGeselecteerdeOnderzoek(null); setError(null);}}
					
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
		</Container> }
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
					<Col md={12}>
						<Pagination className="justify-content-md-center">
							{[...Array(Math.ceil(results.length / itemsPerPage))].map((_, index) => (
								<Pagination.Item
									key={index + 1}
									active={index + 1 === currentPage}
									onClick={() => setCurrentPage(index + 1)}
								>
									{index + 1}
								</Pagination.Item>
							))}
						</Pagination>
					</Col>

					{currentItems.map((item) => (
						<Col className="onderzoeken-search-item" key={item.id} md={7}>
							<Card className="text-center">
								<Card.Header>Bedrijf: {item.bedrijf.naam}</Card.Header>
								<Card.Body>
									<Card.Title>{item.titel}</Card.Title>
									<Card.Text>
										{item.beschrijving}
									</Card.Text>
									<Button variant="primary" onClick={() => setGeselecteerdeOnderzoek(item)}>Meer info</Button>
								</Card.Body>
								<Card.Footer className="text-muted">
									Van start op {getFormattedDateLocale(new Date(item.startDatum))}
								</Card.Footer>
							</Card>
						</Col>
					))}
				</Row>
			</Container>
	
		</Container>
	</>);
};

export default OverzichtOnderzoeken;
