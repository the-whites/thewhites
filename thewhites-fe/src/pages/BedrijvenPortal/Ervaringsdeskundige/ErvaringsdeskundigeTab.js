import React, { useEffect, useState } from "react";
import PortalWelcomeMessage from "../../../components/PortalWelcomeMessage/PortalWelcomeMessage";
import { fetchApi } from "../../../hooks/useApi";

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
				// De route is een string die de URL naar de API endpoint specificeert
				const response = await fetchApi({route: "/api/bedrijf/alleErvaringsdeskundigen"});
				if (response.status === 200) {
					setErvaringsdeskundigen(response.data);
				} else {
					setError(`Fout bij het ophalen van gegevens. Status: ${response.status}`);
				}
			} catch (error) {
				setError(`Fout bij het ophalen van de gegevens: ${error}`);
				console.error(`Fout bij het ophalen van de gegevens: ${error}`);
			}
			setIsLoading(false);
		};

		fetchErvaringsdeskundigen();
	}, []);

	return (
		<>
			<PortalWelcomeMessage name="Ervaringsdeskundige" username={bedrijfsnaam} />
			<p>Hier kunt u informatie zien van alle ervaringsdeskundigen.</p>

			{error && <p className="error">{error}</p>}

			{isLoading ? (
				<p>Loading...</p>
			) : (
				ervaringsdeskundigen.length > 0 ? (
					<ul>
						{ervaringsdeskundigen.map((deskundige) => (
							// Zorg ervoor dat je een unieke key prop gebruikt, bijvoorbeeld de ID
							<li key={deskundige.id}>
								<p>Naam: {deskundige.gebruikersnaam} {deskundige.achternaam}</p>
								<p>Postcode: {deskundige.postcode}</p>
								<p>Telefoonnummer: {deskundige.telefoonnummer}</p>
								<p>Hulpmiddel: {deskundige.hulpmiddel}</p>
								<p>Ziekte: {deskundige.ziekte}</p>
								<p>Beschikbaarheid: {deskundige.beschikbaarheid}</p>
								
							</li>
						))}
					</ul>
				) : (
					<p>Geen ervaringsdeskundigen gevonden.</p>
				)
			)}
		</>
	);
};

export default ErvaringsdeskundigeTab;