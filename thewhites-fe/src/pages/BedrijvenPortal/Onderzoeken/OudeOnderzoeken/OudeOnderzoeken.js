import React, {useEffect, useState} from "react";
import { fetchApi } from "../../../../hooks/useApi";
import OnderzoekLijst from "../../../../components/OnderzoekLijst/OnderzoekLijst";
import { useNavigate } from "react-router-dom";

const OudeOnderzoeken = () => {
	const [onderzoeken, setOnderzoeken] = useState([]);

	const navigate = useNavigate();

	const fetchOnderzoeken = async () => {
		try {
			const response = await fetchApi({route: "api/bedrijf/mijn-onderzoeken"});
			
			if (response.status === 200) {
				const currentDate = new Date();
				const onderzoekenData = response.data.map(({ id, titel, startDatum, eindDatum }) =>
					({ 	id, 
						titel, 
						startDatum: new Date(startDatum), 
						eindDatum: new Date(eindDatum)}));

				setOnderzoeken(onderzoekenData.filter(onderzoek => onderzoek.eindDatum < currentDate));
			} else {
				console.error(`Error fetching data. Status: ${response.status}`);
			}
		} catch (error) {
			console.error(`Error trying to fetch the data: ${error}`);
		}
	};

	useEffect(() => {
		fetchOnderzoeken();
	}, []);

	return (
		<>
			{onderzoeken.length === 0 ? (
				<h1>Geen oude onderzoeken</h1>
			) : (
				<>
					<h1>Oude onderzoeken</h1>
					<OnderzoekLijst handleClickButton={(id) => navigate(`/bedrijf/onderzoeken/${id}`)} onderzoekLijst={onderzoeken} />
				</>
			)}
		</>
	); 
};

export default OudeOnderzoeken;
