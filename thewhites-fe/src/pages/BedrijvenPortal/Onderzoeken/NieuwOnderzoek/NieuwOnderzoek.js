import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../../components/ConfirmationModal/ConfirmationModal";
import { postApi } from "../../../../hooks/useApi";
import { getOnderzoekTypesFromApi, getBeperkingenFromApi, formatOnderzoekLeeftijdValue, createOnderzoekDataObject } from "../../../../util/OnderzoekUtil";
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
		const onderzoekDataObject = createOnderzoekDataObject(onderzoekData);

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

	useEffect(() => {
		const fetchTypeOnderzoekenFromApi = async () => {
			const typeOnderzoekenResponse = await getOnderzoekTypesFromApi();

			if(typeOnderzoekenResponse != null) {
				setTypeOnderzoeken(typeOnderzoekenResponse);
			}
		};

		const fetchBeperkingenFromApi = async () => {
			const beperkingenResponse = await getBeperkingenFromApi();

			if(beperkingenResponse != null) {
				setBeperkingen(beperkingenResponse);
			}
		};

		fetchTypeOnderzoekenFromApi();
		fetchBeperkingenFromApi();
	}, []);

	return (
		<>
			<br />
			<h1>Nieuw onderzoek</h1>
			<br />
			<NieuwOnderzoekForm handleOnderzoekDataChange={handleOnderzoekDataChange} beperkingen={beperkingen} typeOnderzoeken={typeOnderzoeken} />
			{showModal && (
				<ConfirmationModal
					show={showModal}
					handleClose={handleCloseModal}
					handleConfirm={handleConfirm}
					title="Weet u het zeker?">
					<div className="confirmation-border">
						<h2>{onderzoekData[ONDERZOEK_DATA.NAAM]}</h2>
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
								<strong>Leeftijd(en):</strong> {formatOnderzoekLeeftijdValue(onderzoekData[ONDERZOEK_DATA.LEEFTIJD])}
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
