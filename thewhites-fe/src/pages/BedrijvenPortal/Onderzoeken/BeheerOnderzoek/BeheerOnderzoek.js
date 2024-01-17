import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchApi } from "../../../../hooks/useApi";
import { ONDERZOEK_DATA } from "../../../../constants/onderzoekData";
import OnderzoekData from "../../../../components/OnderzoekData/OnderzoekData";

const BeheerOnderzoek = () => {
	const { id } = useParams();
	const [onderzoek, setOnderzoek] = useState(null);
	const [deelnemers, setDeelnemers] = useState(0);

	const fetchOnderzoek = async () => {
		try {
			const response = await fetchApi({route: `api/bedrijf/mijn-onderzoeken/${id}`});
			
			if (response.status === 200) {
				setOnderzoek({
					[ONDERZOEK_DATA.ID]: id,
					[ONDERZOEK_DATA.NAAM]: response.data.titel,
					[ONDERZOEK_DATA.OMSCHRIJVING]: response.data.beschrijving,
					[ONDERZOEK_DATA.BELONING]: response.data.beloning,
					[ONDERZOEK_DATA.LOCATIE]: response.data.locatie,
					[ONDERZOEK_DATA.START_DATUM]: response.data.startDatum,
					[ONDERZOEK_DATA.EIND_DATUM]: response.data.eindDatum,
					[ONDERZOEK_DATA.TYPE_ONDERZOEK]: response.data.onderzoekCategories,
					[ONDERZOEK_DATA.GEMAAKT_OP]: response.data.gemaaktOp
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
			const response = await fetchApi({route: `api/Onderzoek/${id}/deelnemers`});
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

export default BeheerOnderzoek;