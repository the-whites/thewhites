import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchApi, postApi } from "../../../../hooks/useApi";
import { ONDERZOEK_DATA } from "../../../../constants/onderzoekData";
import OnderzoekForm from "../../../../components/Forms/OnderzoekForm";
import ConfirmationModal from "../../../../components/ConfirmationModal/ConfirmationModal";
import LoadingAnimation from "../../../../components/LoadingAnimation/LoadingAnimation";
import { getOnderzoekTypesFromApi, getBeperkingenFromApi, formatOnderzoekLeeftijdValue, createOnderzoekDataObject } from "../../../../util/OnderzoekUtil";
import { Table } from "react-bootstrap";
import { toast } from "react-toastify";

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
	
	const navigate = useNavigate();
	
	const handleOnderzoekDataChange = (newOnderzoekData) => {
		setNewOnderzoek(newOnderzoekData);
		setShowModal(true);
	};

	const getNewValueInOnderzoek = (data) => {
		return newOnderzoek[data] === onderzoek[data] ? "Geen verandering" : newOnderzoek[data];
	};

	const getFormattedPostcode = (postcode) => {
		return postcode.map(postcode => 
		{
			if(typeof postcode === "object"){
				return postcode.postcode.toString();
			} else {
				return postcode.toString();
			}
		}).join(", ");
	};

	const didArrayGetChanged = (data) => {
		const oldArray = onderzoek[data].map(item => item.id);
		const newArray = newOnderzoek[data];
		console.log(oldArray, newArray);
		return oldArray.length !== newArray.length || oldArray.some(id => !newArray.includes(id));
	};

	const editOnderzoekData = async () => {
		console.log("oude onderozek", onderzoek);
		console.log("niew", newOnderzoek);
		const onderzoekDataObject = createOnderzoekDataObject(newOnderzoek);

		try {
			const response = await postApi({route: `/api/onderzoek/wijzig/${id}`, body: onderzoekDataObject});
	
			if (response.status === 200) {
				toast.success("Onderzoek is gewijzigd");
			} else {
				toast.error("Er is iets misgegaan bij het opslaan van de wijzigingen van de onderzoek data");
				console.error("Error while trying to edit onderzoek:", response.statusText);
			}
		} catch (error) {
			toast.error("Er is iets misgegaan bij wijzigen van de onderzoek data");
			console.error("Error sending edit data", error);
		}

		setShowModal(false);
		navigate(-1);
	};

	const handleConfirm = async () => {
		editOnderzoekData();
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

		const fetchOnderzoek = async () => {
			try {
				const response = await fetchApi({route: `api/bedrijf/mijn-onderzoeken/${id}`});
				
				if (response.status === 200) {
					setOnderzoek({
						[ONDERZOEK_DATA.NAAM]: response.data.titel,
						[ONDERZOEK_DATA.OMSCHRIJVING]: response.data.beschrijving,
						[ONDERZOEK_DATA.INHOUD]: response.data.inhoud,
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
		
		fetchTypeOnderzoekenFromApi();
		fetchBeperkingenFromApi();
		fetchOnderzoek();

		
	}, []);

	return (
		<>
			<br />
			<h1>Onderzoek wijzigen</h1>
			<br />
			{onderzoek ? 
				<OnderzoekForm 
					handleOnderzoekDataChange={handleOnderzoekDataChange} 
					beperkingen={beperkingen} typeOnderzoeken={typeOnderzoeken} 
					onderzoek={onderzoek} 
					buttonConfirmText="Wijzig onderzoek" 
					editable={new Date(onderzoek.startDatum) > new Date()}/> 
				: 
				<LoadingAnimation />}
				
			{newOnderzoek ? <ConfirmationModal show={showModal} title="Weet je het zeker?" size="xl" handleConfirm={handleConfirm} handleClose={() => setShowModal(false)}>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Attribuut</th>
							<th>Oud</th>
							<th>Nieuw</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Naam</td>
							<td>{onderzoek[ONDERZOEK_DATA.NAAM]}</td>
							<td>{getNewValueInOnderzoek(ONDERZOEK_DATA.NAAM)}</td>
						</tr>
						<tr>
							<td>Omschrijving</td>
							<td>{onderzoek[ONDERZOEK_DATA.OMSCHRIJVING]}</td>
							<td>{getNewValueInOnderzoek(ONDERZOEK_DATA.OMSCHRIJVING)}</td>
						</tr>
						<tr>
							<td>Inhoud</td>
							<td>{onderzoek[ONDERZOEK_DATA.INHOUD]}</td>
							<td>{getNewValueInOnderzoek(ONDERZOEK_DATA.INHOUD)}</td>
						</tr>
						<tr>
							<td>Locatie</td>
							<td>{onderzoek[ONDERZOEK_DATA.LOCATIE]}</td>
							<td>{getNewValueInOnderzoek(ONDERZOEK_DATA.LOCATIE)}</td>
						</tr>
						{onderzoek[ONDERZOEK_DATA.BELONING] || newOnderzoek[ONDERZOEK_DATA.BELONING] ? (
							<tr>
								<td>Beloning</td>
								<td>{onderzoek[ONDERZOEK_DATA.BELONING] ? onderzoek[ONDERZOEK_DATA.BELONING] : "Geen beloning"}</td>
								<td>{getNewValueInOnderzoek(ONDERZOEK_DATA.BELONING)}</td>
							</tr>) : ""}
						<tr>
							<td>Onderzoek Types</td>
							<td>{onderzoek[ONDERZOEK_DATA.TYPE_ONDERZOEK].map((type) => type.naam).join(", ")}</td>
							<td>{didArrayGetChanged(ONDERZOEK_DATA.TYPE_ONDERZOEK) ? newOnderzoek[ONDERZOEK_DATA.TYPE_ONDERZOEK].map((type) => getNaamById(type, typeOnderzoeken)).join(", ") : "Geen verandering"}</td>
						</tr>
						{onderzoek[ONDERZOEK_DATA.BEPERKING].length > 0 || newOnderzoek[ONDERZOEK_DATA.BEPERKING].length > 0 ? (
							<tr>
								<td>Beperking Criteria</td>
								<td>{onderzoek[ONDERZOEK_DATA.BEPERKING].length > 0 ? onderzoek[ONDERZOEK_DATA.BEPERKING].map((type) => type.naam).join(", ") : "Geen beperking criteria"}</td>
								<td>{didArrayGetChanged(ONDERZOEK_DATA.BEPERKING) ? newOnderzoek[ONDERZOEK_DATA.BEPERKING].map((type) => getNaamById(type, beperkingen)).join(", ") : "Geen verandering"}</td>
							</tr>) : ""}
						{onderzoek[ONDERZOEK_DATA.LEEFTIJD].length > 0 || newOnderzoek[ONDERZOEK_DATA.LEEFTIJD].length > 0 ? (
							<tr>
								<td>Leeftijd Criteria</td>
								<td>{onderzoek[ONDERZOEK_DATA.LEEFTIJD].length > 0 ? formatOnderzoekLeeftijdValue(onderzoek[ONDERZOEK_DATA.LEEFTIJD]) : "Geen leeftijd criteria"}</td>
								<td>{formatOnderzoekLeeftijdValue(onderzoek[ONDERZOEK_DATA.LEEFTIJD]) === formatOnderzoekLeeftijdValue(newOnderzoek[ONDERZOEK_DATA.LEEFTIJD]) ? "Geen verandering" : formatOnderzoekLeeftijdValue(newOnderzoek[ONDERZOEK_DATA.LEEFTIJD])}</td>
							</tr>) : ""}
						{onderzoek[ONDERZOEK_DATA.POSTCODE].length > 0 || newOnderzoek[ONDERZOEK_DATA.POSTCODE].length > 0 ? (
							<tr>
								<td>Postcode Criteria</td>
								<td>{onderzoek[ONDERZOEK_DATA.POSTCODE].length > 0 ? getFormattedPostcode(onderzoek[ONDERZOEK_DATA.POSTCODE]) : "Geen postcode criteria"}</td>
								<td>{getFormattedPostcode(onderzoek[ONDERZOEK_DATA.POSTCODE]) === getFormattedPostcode(newOnderzoek[ONDERZOEK_DATA.POSTCODE]) ? "Geen verandering" : getFormattedPostcode(newOnderzoek[ONDERZOEK_DATA.POSTCODE])}</td>
							</tr>) : ""}
						<tr>
							<td>Start Datum</td>
							<td>{onderzoek[ONDERZOEK_DATA.START_DATUM].toLocaleString()}</td>
							<td>{getNewValueInOnderzoek(ONDERZOEK_DATA.START_DATUM).toLocaleString()}</td>
						</tr>
						<tr>
							<td>Eind Datum</td>
							<td>{onderzoek[ONDERZOEK_DATA.EIND_DATUM].toLocaleString()}</td>
							<td>{getNewValueInOnderzoek(ONDERZOEK_DATA.EIND_DATUM).toLocaleString()}</td>
						</tr>
					</tbody>
				</Table>
			</ConfirmationModal> 
				: ""}
		</>
	);
};

export default WijzigOnderzoek;