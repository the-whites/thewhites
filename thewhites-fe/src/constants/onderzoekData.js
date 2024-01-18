export const ONDERZOEK_DATA = {
	ID: "id",
	NAAM: "naam",
	OMSCHRIJVING: "omschrijving",
	INHOUD: "inhoud",
	TYPE_ONDERZOEK: "typeOnderzoek",
	BEPERKING: "beperking",
	LEEFTIJD: "leeftijd",
	POSTCODE: "postcode",
	START_DATUM: "startDatum",
	EIND_DATUM: "eindDatum",
	LOCATIE: "locatie",
	BELONING: "beloning",
	GEMAAKT_OP: "gemaaktOp"
};

export const initialOnderzoekState = {
	[ONDERZOEK_DATA.NAAM]: "",
	[ONDERZOEK_DATA.OMSCHRIJVING]: "",
	[ONDERZOEK_DATA.INHOUD]: "",
	[ONDERZOEK_DATA.TYPE_ONDERZOEK]: [],
	[ONDERZOEK_DATA.BEPERKING]: [],
	[ONDERZOEK_DATA.LEEFTIJD]: [],
	[ONDERZOEK_DATA.POSTCODE]: [],
	[ONDERZOEK_DATA.START_DATUM]: null,
	[ONDERZOEK_DATA.EIND_DATUM]: null,
	[ONDERZOEK_DATA.LOCATIE]: "",
	[ONDERZOEK_DATA.BELONING]: ""
};
  