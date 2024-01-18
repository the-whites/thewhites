import React, { useEffect, useState } from "react";
import PortalWelcomeMessage from "../../../components/PortalWelcomeMessage/PortalWelcomeMessage";
import { fetchApi } from "../../../hooks/useApi";

const ErvaringsdeskundigeTab = () => {
	const [bedrijfsnaam] = useState("Test Bedrijf");
	const [isLoading, setIsLoading] = useState(true);
	
	return (
		<>
			<PortalWelcomeMessage name="Ervaringsdeskundige" username={bedrijfsnaam} />
			<p>Hier kunt u informatie zien van alle ervaringsdeskundigen.</p>

		</>
	);
};

export default ErvaringsdeskundigeTab;
