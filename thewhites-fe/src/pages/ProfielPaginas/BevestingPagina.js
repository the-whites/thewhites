import React, { useContext } from "react";
import { ProfielContext } from "./ProfielContext";
import { Container, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { postApi } from "../../hooks/useApi";
import "./Medischepagina.css";

const BevestigingsPagina = () => {
	const { profielData } = useContext(ProfielContext);
	const navigate = useNavigate();

	const handleTerug = () => {
		navigate("/medischepagina");
	};

	const handleBevestigen = async () => {

		const body = profielData;
		body.onderzoekTypes = body.onderzoekTypes.map((type) => type.id) == null ? [] : body.onderzoekTypes.map((type) => type.id);
		body.beperkingTypes = body.beperkingTypes.map((type) => type.id) == null ? [] : body.beperkingTypes.map((type) => type.id);
		
		try {
			const response = await postApi({
				route: "api/ErvaringsDeskundige/create-profiel-info",
				body: body
			});
	
			// U kunt hier een check toevoegen om te verzekeren dat de response succesvol was indien nodig
			if (response.status === 200) { // Of een andere logica om succes te verzekeren
				navigate("/ervaringsdeskundige", { key: new Date().toString() });
			} else {
				// Handle the error, bijvoorbeeld toon een foutmelding
				console.error("Er is iets misgegaan bij het opslaan van de gegevens");
			}
		} catch (error) {
			// Handle de error, bijvoorbeeld toon een foutmelding
			console.error("Er is een fout opgetreden bij het maken van de POST-aanvraag",
				error);
		}

	};

	return (
		<>
			<h2>Uw profiel wordt met de volgende informatie bijgewerkt:</h2>
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
							<td>{profielData.aandoening}</td>
						</tr>
						<tr>
							<td>Hulpmiddelen</td>
							<td>{profielData.hulpmiddelen}</td>
						</tr>
						<tr>
							<td>Type onderzoeken</td>
							<td>{profielData.onderzoekTypes?.map((item) => <span key={item.id}>{item.type}<br/></span>)}</td>
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
							<td>{profielData.beschikbaar}</td>
						</tr>
						<tr>
							<td>Toestemming voor Uitnodigingen</td>
							<td>{profielData.toestemmingUitnodigingen ? "Ja" : "Nee"}</td>
						</tr>
					</tbody>
				</Table>
			</Container>
			<Button variant="secondary" onClick={handleTerug}className="button-spacing" >Terug</Button>
			<Button variant="primary" onClick={handleBevestigen}>Bevestigen</Button>
		</>
	);
};
export default BevestigingsPagina;