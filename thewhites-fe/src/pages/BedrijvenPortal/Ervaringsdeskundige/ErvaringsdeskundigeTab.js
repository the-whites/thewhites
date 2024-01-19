import React, { useEffect, useState } from "react";
import PortalWelcomeMessage from "../../../components/PortalWelcomeMessage/PortalWelcomeMessage";
import { fetchApi } from "../../../hooks/useApi";

const ErvaringsdeskundigeTab = () => {
	const [bedrijfsnaam] = useState("Test Bedrijf");
	const [isLoading, setIsLoading] = useState(true);
	const [ervaringsdeskundigen, setErvaringsdeskundigen] = useState([]);
	const [error, setError] = useState(""); // State voor het opslaan van eventuele fouten

	useEffect(() => {
		const fetchErvaringsdeskundigen = async () => {
			setIsLoading(true);
			setError(""); // Reset de foutmelding
			try {
				const response = await fetchApi({route: "api/bedrijf/alleErvaringsdeskundigen"});
				if (response.status === 200) {
					setErvaringsdeskundigen(response.data);
				} else {
					// Sla de foutmelding op in de staat en log naar de console
					setError(`Error fetching data. Status: ${response.status}`);
					console.error(`Error fetching data. Status: ${response.status}`);
				}
			} catch (error) {
				// Sla de foutmelding op in de staat en log naar de console
				setError(`Error trying to fetch the data: ${error}`);
				console.error(`Error trying to fetch the data: ${error}`);
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
							<li key={deskundige.Id}>
								<p>Naam: {deskundige.Gebruikersnaam || "Niet vermeld"}</p>
								<p>Postcode: {deskundige.Postcode || "Niet vermeld"}</p>
								<p>Telefoonnummer: {deskundige.Telefoonnummer || "Niet vermeld"}</p>
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
