import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Container, Form, InputGroup, Pagination, Row } from "react-bootstrap";
import { fetchApi, postApi } from "../../../hooks/useApi";
import { OnderzoekInfo } from "../../../components/OnderzoekInfo/OnderzoekInfo";
import { formatResponseError, getFormattedDateLocale } from "../../../util/Util";



const itemsPerPage = 3;

const OverzichtOnderzoeken = () => {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState([]);
	const [geselecteerdeOnderzoek, setGeselecteerdeOnderzoek] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [header, setHeader] = useState("Onderzoeken");
	const [error, setError] = useState(null);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentItems = results.slice(startIndex, endIndex);

	useEffect(() => {
		handleSearch();
	}, []);

	useEffect(() => {
		if (geselecteerdeOnderzoek == null)
			setHeader("Onderzoeken");
		else
			setHeader("Onderzoek: " + geselecteerdeOnderzoek.titel);
	}, [geselecteerdeOnderzoek]);
  
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
		<Container>
			<h1>{header}</h1>
			{error}
			{geselecteerdeOnderzoek && <div>

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
			</div> }
			<div hidden={geselecteerdeOnderzoek ? "hidden" : ""}>
				<InputGroup className="mb-3">
					<Form.Control
						placeholder="Zoek iets hier..."
						aria-label="Zoek waarde"
						aria-describedby="search-bar-onderzoeken-sbmt"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
					<Button 
						variant="primary" 
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
										aria-label={"Open rij " + (index + 1) + " van de resultaten"}
									>
										{index + 1}
									</Pagination.Item>
								))}
							</Pagination>
						</Col>

						{currentItems.map((item) => (
							<Col className="onderzoeken-search-item" key={item.id} md={7}>
								<Card className="text-center">
									<Card.Header><h2>Onderzoek: {item.titel}</h2></Card.Header>
									<Card.Body>
										<Card.Text>
											<p>{item.beschrijving}</p>
											<br/><br/>
											<span>Verzorgd door bedrijf {item.bedrijf.naam}</span>
											<br/>
											<span>Van start op {getFormattedDateLocale(new Date(item.startDatum))}</span>
										</Card.Text>
									</Card.Body>
									<Card.Footer className="text-muted">
										<Button 
											variant="outline-primary" 
											aria-label={"Klik hier voor meer info over onderzoek " + item.titel} 
											onClick={() => setGeselecteerdeOnderzoek(item)}
										>
											Meer info over dit onderzoek
										</Button>
									</Card.Footer>
								</Card>
							</Col>
						))}
					</Row>
				</Container>
		
			</div>
		</Container>
	</>);
};

export default OverzichtOnderzoeken;
