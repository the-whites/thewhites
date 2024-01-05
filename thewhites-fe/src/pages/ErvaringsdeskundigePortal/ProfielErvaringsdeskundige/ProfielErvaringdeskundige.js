import React, { useState } from "react";
import PortalWelcomeMessage from "../../../components/PortalWelcomeMessage/PortalWelcomeMessage";
import { fetchApi } from "../../../hooks/useApi";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getToken } from "../../../components/AxiosInstance";

const ProfielErvaringsdeskundige = () => {
	const [ErvaringsdeskundigeNaam] = useState("Test Ervaringsdeskundige"); // moet de beheerdersnaam nog uit de database halen/ die inlogd is

	const test = async () => {
		const response = await fetchApi({route: "api/Login/profileInfo", token: getToken()});

		if (response) {
			console.log(response);
		}
		
	};

	return (
		<>
			<Button onClick={() => test()}>test</Button>
			<PortalWelcomeMessage name="profiel" text="Hier kunt u de uw profiel wijzingen." username={ErvaringsdeskundigeNaam} />
		</>
	);
};

export default ProfielErvaringsdeskundige;