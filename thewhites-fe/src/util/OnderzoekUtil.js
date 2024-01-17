import { fetchAndFormatData } from "../hooks/useApi";
import { ONDERZOEK_DATA } from "../constants/onderzoekData";

export const getOnderzoekTypesFromApi = async () => {
	return await fetchAndFormatData("api/OnderzoekType/onderzoek-types", item => ({
		id: item?.id,
		naam: item?.type
	}));
};

export const getBeperkingenFromApi = async () => {
	return await fetchAndFormatData("api/Beperking/beperkingen", item => ({
		id: item?.id,
		naam: item?.naam
	}));
};

export const formatOnderzoekLeeftijdValue = (leeftijden) => {
	return leeftijden.map(l => {
		if (typeof l === "object" && l !== null && "minLeeftijd" in l && "maxLeeftijd" in l) {
			return l.minLeeftijd === l.maxLeeftijd ? `${l.minLeeftijd}` : `${l.minLeeftijd}-${l.maxLeeftijd}`;
		} else {
			return l[0] === l[1] ? `${l[0]}` : `${l[0]}-${l[1]}`;
		}
	}).join(", ");
};

export const createOnderzoekDataObject = (onderzoek) => {
	return  {
		titel: onderzoek[ONDERZOEK_DATA.NAAM],
		beschrijving: onderzoek[ONDERZOEK_DATA.OMSCHRIJVING],
		inhoud: onderzoek[ONDERZOEK_DATA.INHOUD],
		startDatum: onderzoek[ONDERZOEK_DATA.START_DATUM],
		eindDatum: onderzoek[ONDERZOEK_DATA.EIND_DATUM],
		beloning: onderzoek[ONDERZOEK_DATA.BELONING],
		locatie: onderzoek[ONDERZOEK_DATA.LOCATIE],
		postcodeCriteriaList: onderzoek[ONDERZOEK_DATA.POSTCODE].map(postcode => postcode),
		categoriesList: onderzoek[ONDERZOEK_DATA.TYPE_ONDERZOEK],
		beperkingCriteriaList: onderzoek[ONDERZOEK_DATA.BEPERKING],
		leeftijdCriteria: onderzoek[ONDERZOEK_DATA.LEEFTIJD].map(leeftijd => ({
			MinLeeftijd: leeftijd[0],
			MaxLeeftijd: leeftijd[1]
		}))
	};
};