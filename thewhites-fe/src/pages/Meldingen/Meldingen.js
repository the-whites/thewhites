import React, { useState, useEffect, useContext } from "react";
import { fetchApi } from "../../hooks/useApi";
import Pagination from "react-bootstrap/Pagination";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { postApi } from "../../hooks/useApi";
import { UserContext } from "../../contexts/UserProvider";
import { ROLES } from "../../constants/roles";

import "./Meldingen.css";
import { formatDateText } from "../../util/Util";
import BedrijfNavbar from "../../components/NavbarPortal/BedrijfNavbar";
import BeheerderNavbar from "../../components/NavbarPortal/BeheerderNavbar";
import ErvaringsdeskundigeNavbar from "../../components/NavbarPortal/ErvaringsdeskundigeNavbar";
const Meldingen = () => {
	const { username, role } = useContext(UserContext);

	const [meldingen, setMeldingen] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [meldingenPerPage] = useState(5);

	const indexOfLastMelding = currentPage * meldingenPerPage;
	const indexOfFirstMelding = indexOfLastMelding - meldingenPerPage;
	const currentMeldingen = meldingen.slice(indexOfFirstMelding, indexOfLastMelding);

	const handleMarkeerButton = async (melding) => {
		meldingen.find(m  => m === melding).status = true;
		setMeldingen([...meldingen]);

		try {
			const response = await postApi({
				route: `/api/gebruiker/meldingen/markeer-als-gelezen/${melding.id}`,
			});
		
			if (response.status === 200) {
				console.log("Message marked as read successfully");
			} else {
				console.error("Error while marking melding as read:", response.statusText);
			}
		} catch (error) {
			console.error("An error occurred while marking melding as read:", error.message);
		}
	};

	const getOngelezenMeldingenCount = () => {
		return meldingen.filter(m => m.status === false).length;
	};

	useEffect(() => {
		const fetchMeldingen = async () => {
			try {
				const response = await fetchApi({ route: "api/gebruiker/meldingen" });

				if (response.status === 200) {
					const sortedMeldingenOpDatum = response.data.sort((a, b) => new Date(b.datum) - new Date(a.datum)); // sorteer op datum

					const sortedMeldingTotaal = sortedMeldingenOpDatum.sort((a, b) => { // sorteer op gelezen/ongelezen
						if (a.status && !b.status) return 1;
						if (!a.status && b.status) return -1; 
						return 0; 
					});

					setMeldingen(sortedMeldingTotaal);
				} else {
					console.log("Something went wrong while fetching the data: ", response.statusText);
				}
			} catch (error) {
				console.error("An error occurred while fetching meldingen:", error.message);
			}
		};

		fetchMeldingen();
	}, []);

	return (
		<>
			{role === ROLES.bedrijf ? <BedrijfNavbar /> : ""}
			{role === ROLES.beheerder ? <BeheerderNavbar /> : ""}
			{role === ROLES.ervaringsdeskundige ? <ErvaringsdeskundigeNavbar /> : ""}
			<Container className="text-center">
				<h1 className="main-text">Meldingen</h1>
				<p className="sub-text">Je hebt {getOngelezenMeldingenCount()} ongelezen melding{getOngelezenMeldingenCount() === 1 ? "" : "en"}, {username}.</p>
				{meldingen.length < 1 ? (
					<p className="geen-meldingen">Nog geen meldingen ontvangen</p>
				) : (
					<>
						<Row className="justify-content-md-center">
							{meldingen.length > meldingenPerPage ? (
								<Pagination className="justify-content-md-center">
									{[...Array(Math.ceil(meldingen.length / meldingenPerPage)).keys()].map((number) => (
										<Pagination.Item
											key={number + 1}
											active={number + 1 === currentPage}
											onClick={() => setCurrentPage(number + 1)}
										>
											{number + 1}
										</Pagination.Item>
									))}
								</Pagination>) 
								: ""}
						</Row>

						<Row className="d-flex flex-column align-items-center">
							{currentMeldingen.map((melding, index) => (
								<Card key={index} style={{ width: "30rem", margin: "10px" }}>
									<Card.Header><h2>{melding.status ? "Gelezen" : "Niet gelezen"}</h2></Card.Header>
									<Card.Body>
										<Card.Title><h1 className="melding-titel">Melding titel</h1></Card.Title>
										<Card.Subtitle className="mb-2 text-muted"><h3 className="datum-ontvangen">{formatDateText(new Date(melding.datum))} ontvangen</h3></Card.Subtitle>
										<Card.Text><p>{melding.tekst}</p></Card.Text>
									</Card.Body>
									{melding.status ? "" : 
										<Card.Footer>
											<Card.Link><Button onClick={() => handleMarkeerButton(melding)} variant="primary">Markeer als gelezen</Button></Card.Link>
										</Card.Footer>}
								</Card>
							))}
						</Row>
					</>
				)}
			</Container>
		</>
	);
};

export default Meldingen;
