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
	Aandoening: "",
	Hulpmiddelen: "",
	Onderzoeken: [],
	Portaalbenadering: false,
	Beschikbaar: "",
	TelefonischBenadering: false,
	ToestemmingUitnodigingen: false
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
  