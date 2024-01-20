import React, { useEffect, useState } from "react";
import PortalWelcomeMessage from "../../../components/PortalWelcomeMessage/PortalWelcomeMessage";
import { fetchApi } from "../../../hooks/useApi";
import "./ErvaringsdeskundigeTab.css"; // Zorg dat je het CSS-bestand importeert
import { Row, Table } from "react-bootstrap";

const ErvaringsdeskundigeTab = () => {
	const [bedrijfsnaam] = useState("Test Bedrijf");
	const [isLoading, setIsLoading] = useState(true);
	const [ervaringsdeskundigen, setErvaringsdeskundigen] = useState([]);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchErvaringsdeskundigen = async () => {
			setIsLoading(true);
			setError("");
			try {
				const response = await fetchApi({route: "api/bedrijf/alleErvaringsdeskundigen"});
				if (response.status === 200) {
					setErvaringsdeskundigen(response.data);
				} else {
					setError(`Fout bij het ophalen van gegevens. Status: ${response.status}`);
				}
			} catch (error) {
				setError(`Fout bij het ophalen van de gegevens: ${error}`);
			}
			setIsLoading(false);
		};

		fetchErvaringsdeskundigen();
	}, []);

	return (
		<>
			<PortalWelcomeMessage name="Ervaringsdeskundige" username={bedrijfsnaam} />
			<Row className="ervaringsdeskundige-list">
				<p>Hier kunt u informatie zien van alle ervaringsdeskundigen:</p>
				{error && <p className="error">{error}</p>}
				{isLoading ? <p>Loading...</p> : (
					ervaringsdeskundigen.length > 0 ? (
						ervaringsdeskundigen.map((deskundige) => (
							<div key={deskundige.id} className="deskundige-container">
								<div className="deskundige-veld"><strong>Naam:</strong> {deskundige.gebruikersnaam}</div>
								<div className="deskundige-veld"><strong>Postcode:</strong> {deskundige.postcode}</div>
								<div className="deskundige-veld"><strong>Telefoonnummer:</strong> {deskundige.telefoonnummer}</div>
								<div className="deskundige-veld"><strong>Hulpmiddel:</strong> {deskundige.hulpmiddel}</div>
								<div className="deskundige-veld"><strong>Ziekte:</strong> {deskundige.ziekte}</div>
								<div className="deskundige-veld"><strong>Beschikbaarheid:</strong> {deskundige.beschikbaarheid}</div>
							</div>
						))
					) : <p>Geen ervaringsdeskundigen gevonden.</p>
				)}
			</Row>
		</>
	);
};

export default ErvaringsdeskundigeTab;
