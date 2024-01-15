import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchApi } from "../../../../hooks/useApi";
import { OPDRACHT_DATA } from "../../../../constants/opdrachtData";
import NieuwOpdrachtForm from "../../../../components/Forms/NieuwOpdrachtForm";
import ConfirmationModal from "../../../../components/ConfirmationModal/ConfirmationModal";
import LoadingAnimation from "../../../../components/LoadingAnimation/LoadingAnimation";
const getNaamById = (id, data) => {
	const foundItem = data.find(item => item.id === id);
	return foundItem ? foundItem.naam : null;
};

const WijzigOpdracht = () => {
	const { id } = useParams();
	const [onderzoek, setOnderzoek] = useState(null);
	const [newOnderzoek, setNewOnderzoek] = useState(null);
	const [typeOpdrachten, setTypeOpdrachten] = useState([]);
	const [beperkingen, setBeperkingen] = useState([]);
	const [showModal, setShowModal] = useState(false);

	const fetchOnderzoek = async () => {
		try {
			const response = await fetchApi({route: `api/bedrijf/mijn-onderzoeken/${id}`});
			
			if (response.status === 200) {
				setOnderzoek({
					[OPDRACHT_DATA.NAAM]: response.data.titel,
					[OPDRACHT_DATA.OMSCHRIJVING]: response.data.beschrijving,
					[OPDRACHT_DATA.BELONING]: response.data.beloning,
					[OPDRACHT_DATA.LOCATIE]: response.data.locatie,
					[OPDRACHT_DATA.LEEFTIJD]: response.data.leeftijdCriteria,
					[OPDRACHT_DATA.POSTCODE]: response.data.postcodeCriteria,
					[OPDRACHT_DATA.START_DATUM]: new Date(response.data.startDatum),
					[OPDRACHT_DATA.EIND_DATUM]: new Date(response.data.eindDatum),
					[OPDRACHT_DATA.BEPERKING]: response.data.beperkingCriteria.map(bc => ({
						id: bc.beperking.id,
						naam: bc.beperking.naam
					})),
					[OPDRACHT_DATA.TYPE_OPDRACHT]: response.data.onderzoekCategories.map(c => ({
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
			const typeOpdrachtenItems = await fetchData("api/OnderzoekType/onderzoek-types", item => ({
				id: item?.id,
				naam: item?.type
			}));
			setTypeOpdrachten(typeOpdrachtenItems);

			const beperkingenItems = await fetchData("api/Beperking/beperkingen", item => ({
				id: item?.id,
				naam: item?.naam
			}));
			setBeperkingen(beperkingenItems);
		} catch (error) {
			console.error("Error fetching and setting data:", error);
		}
	};
	const handleOpdrachtDataChange = (newOpdrachtData) => {
		setNewOnderzoek(newOpdrachtData);
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
				<NieuwOpdrachtForm handleOpdrachtDataChange={handleOpdrachtDataChange} beperkingen={beperkingen} typeOpdrachten={typeOpdrachten} opdracht={onderzoek} buttonConfirmText="Wijzig opdracht" /> 
				: 
				<LoadingAnimation />}
				
			{newOnderzoek ? <ConfirmationModal show={showModal} title="Weet je het zeker?" handleClose={() => setShowModal(false)}>
				<p>Naam: {getStringChangesInOnderzoek(OPDRACHT_DATA.NAAM)}</p>
				<p>Omschrijving: {getStringChangesInOnderzoek(OPDRACHT_DATA.OMSCHRIJVING)}</p>
				<p>Locatie: {getStringChangesInOnderzoek(OPDRACHT_DATA.LOCATIE)}</p>
				<p>{onderzoek[OPDRACHT_DATA.BELONING] ? `Beloning: ${getStringChangesInOnderzoek(OPDRACHT_DATA.BELONING)}` : ""}</p>
				<p>
  types:
					{didArrayGetChanged(OPDRACHT_DATA.TYPE_OPDRACHT) ? (
						<>
							<s>
								{onderzoek[OPDRACHT_DATA.TYPE_OPDRACHT].map((type) => type.naam).join(", ")}
							</s>
							<br />
							{newOnderzoek[OPDRACHT_DATA.TYPE_OPDRACHT].map((type) => getNaamById(type, typeOpdrachten)).join(", ")}
						</>
					) : (
						onderzoek[OPDRACHT_DATA.TYPE_OPDRACHT].map((type) => type.naam).join(", ")
					)}
				</p>

				<p>{onderzoek[OPDRACHT_DATA.START_DATUM] ? `Start datum: ${getStringChangesInOnderzoek(OPDRACHT_DATA.START_DATUM)}` : ""}</p>
			</ConfirmationModal> 
				: ""}
		</>
	);
};

export default WijzigOpdracht;