import React, { useEffect, useState, useContext } from "react";
import { fetchApi } from "../../../../hooks/useApi";
import { UserContext } from "../../../../contexts/UserProvider";
import OnderzoekLijst from "../../../../components/OnderzoekLijst/OnderzoekLijst";

import "./LopendeOpdrachten.css";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

const LopendeOpdrachten = () => {
	const [onderzoeken, setOnderzoeken] = useState([]);
	const { userId } = useContext(UserContext);

	const fetchOnderzoeken = async () => {
		try {
			const response = await fetchApi({route: `api/onderzoek/onderzoeken/${userId}`});
			
			if (response.status === 200) {
				const currentDate = new Date();
				const onderzoekenData = response.data.map(({ id, titel, startDatum, eindDatum }) =>
					({ 	id, 
						titel, 
						startDatum: new Date(startDatum), 
						eindDatum: new Date(eindDatum)}));

				setOnderzoeken(onderzoekenData.filter(onderzoek => onderzoek.eindDatum > currentDate));
			} else {
				console.error(`Error fetching data. Status: ${response.status}`);
			}
		} catch (error) {
			console.error(`Error trying to fetch the data: ${error}`);
		}
	};

	const handleButton = (id) => {
		navigate(`/bedrijf/opdrachten/${id}`);
	};

	useEffect(() => {
		fetchOnderzoeken();
	}, []);

	return (
		<>
			{onderzoeken.length === 0 ? (
				<h1>Geen lopende opdrachten</h1>
			) : (
				<>
					<h1>Lopende opdrachten</h1>
					<OnderzoekLijst handleClickButton={handleButton} onderzoekLijst={onderzoeken} />
				</>
			)}
		</>
	); 
};

export default LopendeOpdrachten;
