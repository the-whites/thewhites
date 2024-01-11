import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchApi } from "../../../../hooks/useApi";
import { OPDRACHT_DATA } from "../../../../constants/opdrachtData";
import OnderzoekData from "../../../../components/OnderzoekData/OnderzoekData";

const BeheerOpdracht = () => {
	const { id } = useParams();
	const [onderzoek, setOnderzoek] = useState(null);
	const [deelnemers, setDeelnemers] = useState(0);

	const fetchOnderzoek = async () => {
		try {
			const response = await fetchApi({route: `api/bedrijf/mijn-onderzoeken/${id}`});
			
			if (response.status === 200) {
				setOnderzoek({
					[OPDRACHT_DATA.OPDRACHT_NAAM]: response.data.titel,
					[OPDRACHT_DATA.OPRACHT_OMSCHRIJVING]: response.data.beschrijving,
					[OPDRACHT_DATA.BELONING]: response.data.beloning,
					[OPDRACHT_DATA.LOCATIE]: response.data.locatie,
					[OPDRACHT_DATA.START_DATUM]: response.data.startDatum,
					[OPDRACHT_DATA.EIND_DATUM]: response.data.eindDatum,
					[OPDRACHT_DATA.TYPE_OPDRACHT]: response.data.onderzoekCategories
				});
			} else {
				console.error(`Error fetching data. Status: ${response.status}`);
			}
		} catch (error) {
			console.error(`Error trying to fetch the data: ${error}`);
		}
	};

	const fetchDeelnemerCount = async () => {
		try {
			const response = await fetchApi({route: `api/OnderzoekDeelname/deelnemers/${id}`});
			if (response.status === 200) {
				setDeelnemers(response.data.filter(deelname => deelname.status === true).length);
			} else {
				console.error(`Error fetching data. Status: ${response.status}`);
			}
		} catch (error) {
			console.error(`Error trying to fetch the data: ${error}`);
		}
	};

	useEffect(() => {
		fetchOnderzoek();
		fetchDeelnemerCount();
	}, []);

	return (
		<>
			<OnderzoekData onderzoek={onderzoek} aantalDeelnemers={deelnemers}/>
		</>
	);
};

export default BeheerOpdracht;