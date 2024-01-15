import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../../components/ConfirmationModal/ConfirmationModal";
import { postApi } from "../../../../hooks/useApi";
import { fetchApi } from "../../../../hooks/useApi";
import {  toast } from "react-toastify";
import { ONDERZOEK_DATA, initialOnderzoekState } from "../../../../constants/onderzoekData";
import "react-toastify/dist/ReactToastify.css";

import "./NieuwOnderzoek.css";
import NieuwOnderzoekForm from "../../../../components/Forms/NieuwOnderzoekForm";

const getTypeNaamById = (id, data) => {
	const foundItem = data.find(item => item.id === id);
	return foundItem ? foundItem.naam : null;
};

const NieuwOnderzoek = () => {
	const [typeOnderzoeken, setTypeOnderzoeken] = useState([]);
	const [beperkingen, setBeperkingen] = useState([]);
	const [showModal, setShowModal] = useState(false);

	const [onderzoekData, setOnderzoekData] = useState(initialOnderzoekState);

	const [leeftijden, setLeeftijden] = useState([]);

	const navigate = useNavigate();

	const handleOnderzoekDataChange = (newOnderzoekData) => {
		setOnderzoekData(newOnderzoekData);

		// Validation is al gedaan in NieuwOnderzoekForm.js, dus confirmation kan geshowed worden
		handleShowModal();
	};

	const handleShowModal = () => setShowModal(true);
	const handleCloseModal = () => setShowModal(false);

	const handleConfirm = () => {
		createOnderzoek();
	};

	const createOnderzoek = async () => {
		const onderzoekDataObject = {
			titel: onderzoekData[ONDERZOEK_DATA.NAAM],
			beschrijving: onderzoekData[ONDERZOEK_DATA.OMSCHRIJVING],
			inhoud: onderzoekData[ONDERZOEK_DATA.INHOUD],
			startDatum: onderzoekData[ONDERZOEK_DATA.START_DATUM],
			eindDatum: onderzoekData[ONDERZOEK_DATA.EIND_DATUM],
			beloning: onderzoekData[ONDERZOEK_DATA.BELONING],
			locatie: onderzoekData[ONDERZOEK_DATA.LOCATIE],
			postcodeCriteriaList: onderzoekData[ONDERZOEK_DATA.POSTCODE].map(postcode => postcode),
			categoriesList: onderzoekData[ONDERZOEK_DATA.TYPE_ONDERZOEK].map(typeId => typeId),
			beperkingCriteriaList: onderzoekData[ONDERZOEK_DATA.BEPERKING].map(beperkingId => beperkingId),
			leeftijdCriteria: onderzoekData[ONDERZOEK_DATA.LEEFTIJD].map(leeftijd => ({
				MinLeeftijd: leeftijd[0],
				MaxLeeftijd: leeftijd[1]
			}))
		};

		try {
			console.log(JSON.stringify(onderzoekDataObject));
			const response = await postApi({
				route: "/api/onderzoek/create-onderzoek",
				body: JSON.stringify(onderzoekDataObject)
			});
	
			if (response.status === 200) {
				toast.success("Onderzoek is aangemaakt");
				console.log("Onderzoek has been created.");
			} else {
				toast.error("Er is iets misgegaan bij het opslaan van de onderzoek data");
				console.error("Error creating Onderzoek:", response.statusText);
			}
		} catch (error) {
			toast.error("Er is iets misgegaan bij het versturen van de onderzoek data");
			console.error("Error while trying to create Onderzoek:", error);
		}

		handleCloseModal();
		navigate(-1);
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

	useEffect(() => {
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
	
		fetchDataAndSetState();
	}, []);

	return (
		<>
			<NieuwOnderzoekForm handleOnderzoekDataChange={handleOnderzoekDataChange} leeftijdInput={(leeftijden) => setLeeftijden(leeftijden)}beperkingen={beperkingen} typeOnderzoeken={typeOnderzoeken} />
			{showModal && (
				<ConfirmationModal
					show={showModal}
					handleClose={() => console.log(onderzoekData[ONDERZOEK_DATA.LEEFTIJD])}
					handleConfirm={handleConfirm}
					title="Weet u het zeker?">
					<div className="confirmation-border">
						<h1>{onderzoekData[ONDERZOEK_DATA.NAAM]}</h1>
						<p>{onderzoekData[ONDERZOEK_DATA.OMSCHRIJVING]}</p>
						<p>
							<strong>Type Onderzoek:</strong>{" "}
							{onderzoekData[ONDERZOEK_DATA.TYPE_ONDERZOEK].map((id) => getTypeNaamById(id, typeOnderzoeken)).join(", ")}
						</p>

						{onderzoekData[ONDERZOEK_DATA.BEPERKING].length > 0 && (
							<p>
								<strong>Beperking(en) in aanmerking:</strong>{" "}
								{onderzoekData[ONDERZOEK_DATA.BEPERKING].map((id) => getTypeNaamById(id, beperkingen)).join(", ")}
							</p>
						)}

						{onderzoekData[ONDERZOEK_DATA.LEEFTIJD].length > 0 && (
							<p>
								<strong>Leeftijd(en):</strong> {leeftijden}
							</p>
						)}

						{onderzoekData[ONDERZOEK_DATA.POSTCODE].length > 0 && (
							<p>
								<strong>Postcode(s):</strong> {onderzoekData[ONDERZOEK_DATA.POSTCODE]}
							</p>
						)}

						<p>
							<strong>Onderzoek start op:</strong> {onderzoekData[ONDERZOEK_DATA.START_DATUM].toLocaleString()}
						</p>

						<p>
							<strong>Onderzoek eindigt op:</strong> {onderzoekData[ONDERZOEK_DATA.EIND_DATUM].toLocaleString()}
						</p>
					</div>
				</ConfirmationModal>
			)}

		</>
	);
};

export default NieuwOnderzoek;
