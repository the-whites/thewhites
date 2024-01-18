import React, {useState } from "react";
import { ProfielContext } from "../../contexts/UserProvider";

const initiëleProfielData = {
	// Persoonlijke gegevens
	voornaam: "",
	achternaam: "",
	postcode: "",
	emailadres: "",
	telefoonnummer: "",
	beperkingTypes: [],
  
	// Medische gegevens
	aandoening: "",
	hulpmiddelen: "",
	onderzoekTypes: [],
	portaalbenadering: false,
	beschikbaar: "",
	telefonischBenadering: false,
	toestemmingUitnodigingen: false
};
  
  
export const ProfielProvider = ({ children }) => {
	const [profielData, setProfielData] = useState(initiëleProfielData);
  
	return (
		<ProfielContext.Provider value={{ profielData, setProfielData }}>
			{children}
		</ProfielContext.Provider>
	);
};
  