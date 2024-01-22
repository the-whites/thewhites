import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";

export const CookiePrompt = () => {
	const [isVisible, setIsVisible] = useState(Cookies.get("cookies_accepted_dewhites") === "ja" ? false : true);

	const handleAcceptCookies = () => {
		const date = new Date(Date.now());
		date.setFullYear(date.getFullYear() + 1);

        console.log(date);

		setIsVisible(false);
		Cookies.set("cookies_accepted_dewhites", "ja", {expires: date});

        console.log("hey");
	};

	return (
		<Alert variant="light" hidden={isVisible ? "" : "hidden"}>
			<p>Deze site maakt gebruik van cookies om uw ervaring op deze site te optimaliseren. Gaat u akkoord?</p>
			<Button variant="secondary" onClick={handleAcceptCookies}>Ja</Button>
		</Alert>
	);
};
