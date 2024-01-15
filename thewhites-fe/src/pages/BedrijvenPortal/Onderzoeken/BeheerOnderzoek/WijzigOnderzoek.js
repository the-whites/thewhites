import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchApi } from "../../../../hooks/useApi";
import { ONDERZOEK_DATA } from "../../../../constants/onderzoekData";
import NieuwOnderzoekForm from "../../../../components/Forms/NieuwOnderzoekForm";
import ConfirmationModal from "../../../../components/ConfirmationModal/ConfirmationModal";
import LoadingAnimation from "../../../../components/LoadingAnimation/LoadingAnimation";
const getNaamById = (id, data) => {
	const foundItem = data.find(item => item.id === id);
	return foundItem ? foundItem.naam : null;
};

const WijzigOnderzoek = () => {
	const { id } = useParams();
	const [onderzoek, setOnderzoek] = useState(null);
	const [newOnderzoek, setNewOnderzoek] = useState(null);
	const [typeOnderzoeken, setTypeOnderzoeken] = useState([]);
	const [beperkingen, setBeperkingen] = useState([]);
	const [showModal, setShowModal] = useState(false);

	const fetchOnderzoek = async () => {
		try {
			const response = await fetchApi({route: `api/bedrijf/mijn-onderzoeken/${id}`});
			
			if (response.status === 200) {
				setOnderzoek({
					[ONDERZOEK_DATA.NAAM]: response.data.titel,
					[ONDERZOEK_DATA.OMSCHRIJVING]: response.data.beschrijving,
					[ONDERZOEK_DATA.BELONING]: response.data.beloning,
					[ONDERZOEK_DATA.LOCATIE]: response.data.locatie,
					[ONDERZOEK_DATA.LEEFTIJD]: response.data.leeftijdCriteria,
					[ONDERZOEK_DATA.POSTCODE]: response.data.postcodeCriteria,
					[ONDERZOEK_DATA.START_DATUM]: new Date(response.data.startDatum),
					[ONDERZOEK_DATA.EIND_DATUM]: new Date(response.data.eindDatum),
					[ONDERZOEK_DATA.BEPERKING]: response.data.beperkingCriteria.map(bc => ({
						id: bc.beperking.id,
						naam: bc.beperking.naam
					})),
					[ONDERZOEK_DATA.TYPE_ONDERZOEK]: response.data.onderzoekCategories.map(c => ({
						id: c.type.id,
						naam: c.type.type
					})),
				});
			} else {
				console.error(`Error fetching data. Status: ${response.status}`);
			}
		} catch (error) {
			console.error(`Error trying to fetch the data: ${error}`);
		}
	};

	const fetchData = async (route, formatItem) => {
		try {
			const response = await fetchApi({ route });
	
			if (response.status === 200) {
				const items = response.data.map(item => formatItem(item));
				return items;
			} else {
				console.error(`Error fetching data. Status: ${response.status}`);
				return [];
			}
		} catch (error) {
			console.error("Error fetching data:", error);
			return [];
		}
	};

	const fetchDataAndSetState = async () => {
		try {
			const typeOnderzoekenItems = await fetchData("api/OnderzoekType/onderzoek-types", item => ({
				id: item?.id,
				naam: item?.type
			}));
			setTypeOnderzoeken(typeOnderzoekenItems);

			const beperkingenItems = await fetchData("api/Beperking/beperkingen", item => ({
				id: item?.id,
				naam: item?.naam
			}));
			setBeperkingen(beperkingenItems);
		} catch (error) {
			console.error("Error fetching and setting data:", error);
		}
	};
	const handleOnderzoekDataChange = (newOnderzoekData) => {
		setNewOnderzoek(newOnderzoekData);
		setShowModal(true);
	};

	const getStringChangesInOnderzoek = (data) => {
		return newOnderzoek[data] === onderzoek[data] ? newOnderzoek[data] : `${onderzoek[data]} -> ${newOnderzoek[data]}`;
	};

	const didArrayGetChanged = (data) => {
		const oldArray = onderzoek[data].map(item => item.naam);
		const newArray = newOnderzoek[data].map(item => item.naam);
		return oldArray.length !== newArray.length || oldArray.some(naam => !newArray.includes(naam));
	};

	useEffect(() => {
		fetchDataAndSetState();
		fetchOnderzoek();
	}, []);

	return (
		<>
			{onderzoek ? 
				<NieuwOnderzoekForm handleOnderzoekDataChange={handleOnderzoekDataChange} beperkingen={beperkingen} typeOnderzoeken={typeOnderzoeken} onderzoek={onderzoek} buttonConfirmText="Wijzig onderzoek" /> 
				: 
				<LoadingAnimation />}
				
			{newOnderzoek ? <ConfirmationModal show={showModal} title="Weet je het zeker?" handleClose={() => setShowModal(false)}>
				<p>Naam: {getStringChangesInOnderzoek(ONDERZOEK_DATA.NAAM)}</p>
				<p>Omschrijving: {getStringChangesInOnderzoek(ONDERZOEK_DATA.OMSCHRIJVING)}</p>
				<p>Locatie: {getStringChangesInOnderzoek(ONDERZOEK_DATA.LOCATIE)}</p>
				<p>{onderzoek[ONDERZOEK_DATA.BELONING] ? `Beloning: ${getStringChangesInOnderzoek(ONDERZOEK_DATA.BELONING)}` : ""}</p>
				<p>
  types:
					{didArrayGetChanged(ONDERZOEK_DATA.TYPE_ONDERZOEK) ? (
						<>
							<s>
								{onderzoek[ONDERZOEK_DATA.TYPE_ONDERZOEK].map((type) => type.naam).join(", ")}
							</s>
							<br />
							{newOnderzoek[ONDERZOEK_DATA.TYPE_ONDERZOEK].map((type) => getNaamById(type, typeOnderzoeken)).join(", ")}
						</>
					) : (
						onderzoek[ONDERZOEK_DATA.TYPE_ONDERZOEK].map((type) => type.naam).join(", ")
					)}
				</p>

				<p>{onderzoek[ONDERZOEK_DATA.START_DATUM] ? `Start datum: ${getStringChangesInOnderzoek(ONDERZOEK_DATA.START_DATUM)}` : ""}</p>
			</ConfirmationModal> 
				: ""}
		</>
	);
};

export default WijzigOnderzoek;