import React, { createContext, useState } from "react";
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
  
export const ProfielContext = createContext();
  
export const ProfielProvider = ({ children }) => {
	const [profielData, setProfielData] = useState(initiëleProfielData);
  
	return (
		<ProfielContext.Provider value={{ profielData, setProfielData }}>
			{children}
		</ProfielContext.Provider>
	);
};
  