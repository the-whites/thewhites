import React, { useContext } from "react";
import { ProfielContext } from "./ProfielContext";
import { Container, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const BevestigingsPagina = () => {
	const { profielData } = useContext(ProfielContext);
	const navigate = useNavigate();

	const handleTerug = () => {
		navigate("/medischepagina");
	};

	const handleBevestigen = () => {};

	return (
		<>
			<h3>Uw profiel wordt met de volgende informatie bijgewerkt:</h3>
			<Container>
				<Table striped bordered hover>
					<tbody>
						<tr>
							<td>Voornaam</td>
							<td>{profielData.voornaam}</td>
						</tr>
						<tr>
							<td>Achternaam</td>
							<td>{profielData.achternaam}</td>
						</tr>
						<tr>
							<td>Postcode</td>
							<td>{profielData.postcode}</td>
						</tr>
						<tr>
							<td>E-mailadres</td>
							<td>{profielData.emailadres}</td>
						</tr>
						<tr>
							<td>Telefoonnummer</td>
							<td>{profielData.telefoonnummer}</td>
						</tr>
						<tr>
							<td>Type Beperkingen</td>
							<td>{profielData.beperkingTypes?.map((beperking, index) => (<span key={index}>{beperking.naam}<br/></span>))}
							</td>
						</tr>
						<tr>
							<td>Aandoening/Ziekte</td>
							<td>{profielData.Aandoening}</td>
						</tr>
						<tr>
							<td>Hulpmiddelen</td>
							<td>{profielData.Hulpmiddelen}</td>
						</tr>
						<tr>
							<td>Type onderzoeken</td>
							<td>{profielData.onderzoekenTypes?.map((item) => <span key={item.id}>{item.naam}<br/></span>)}</td>
						</tr>
						<tr>
							<td>Portaal benaderen</td>
							<td>{profielData.portaalbenadering ? "Ja" : "Nee"}</td>
						</tr>
						<tr>
							<td>Telefonisch benaderen</td>
							<td>{profielData.telefonischBenadering ? "Ja" : "Nee"}</td>
						</tr>
						<tr>
							<td>Beschikbaar</td>
							<td>{profielData.Beschikbaar}</td>
						</tr>
						<tr>
							<td>Toestemming voor Uitnodigingen</td>
							<td>{profielData.ToestemmingUitnodigingen ? "Ja" : "Nee"}</td>
						</tr>
					</tbody>
				</Table>
			</Container>
			<Button variant="secondary" onClick={handleTerug}>Terug</Button>
			<Button variant="primary" onClick={handleBevestigen}>Bevestigen</Button>
		</>
	);
};
export default BevestigingsPagina;