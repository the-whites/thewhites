export const OPDRACHT_DATA = {
	OPRACHT_NAAM: "opdrachtNaam",
	OPRACHT_OMSCHRIJVING: "opdrachtOmschrijving",
	TYPE_OPDRACHT: "typeOpdracht",
	BEPERKING: "beperking",
	LEEFTIJD: "leeftijd",
	POSTCODE: "postcode",
	START_DATUM: "startDatum",
	EIND_DATUM: "eindDatum",
	LOCATIE: "locatie",
	BELONING: "beloning",
};

export const initialOpdrachtState = {
	[OPDRACHT_DATA.OPRACHT_NAAM]: "",
	[OPDRACHT_DATA.OPRACHT_OMSCHRIJVING]: "",
	[OPDRACHT_DATA.TYPE_OPDRACHT]: [],
	[OPDRACHT_DATA.BEPERKING]: [],
	[OPDRACHT_DATA.LEEFTIJD]: [],
	[OPDRACHT_DATA.POSTCODE]: [],
	[OPDRACHT_DATA.START_DATUM]: null,
	[OPDRACHT_DATA.EIND_DATUM]: null,
	[OPDRACHT_DATA.LOCATIE]: "",
	[OPDRACHT_DATA.BELONING]: ""
};
  