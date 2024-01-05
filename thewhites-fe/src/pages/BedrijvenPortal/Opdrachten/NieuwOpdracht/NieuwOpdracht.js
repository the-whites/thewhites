import React, { useState, useEffect } from "react";
import ConfirmationModal from "../../../../components/ConfirmationModal/ConfirmationModal";
import { fetchApi, postApi } from "../../../../hooks/useApi";

import "./NieuwOpdracht.css";
import NieuwOpdrachtForm from "../../../../components/Forms/NieuwOpdrachtForm";

const NieuwOpdracht = () => {
	const [typeOpdrachten, setTypeOpdrachten] = useState([]);
	const [beperkingen, setBeperkingen] = useState([]);
	const [showModal, setShowModal] = useState(false);

	const [opdrachtData, setOpdrachtData] = useState({
		opdrachtNaam: "",
		opdrachtOmschrijving: "",
		typeOpdracht: [],
		beperking: [],
		leeftijd: [],
		postcode: [],
		startDatum: null,
		eindDatum: null,
	});

	const handleOpdrachtDataChange = (newOpdrachtData) => {
		setOpdrachtData(newOpdrachtData);

		// Validation is al gedaan in NieuwOpdrachtForm.js, dus confirmation kan geshowed worden
		handleShowModal();
	};

	const handleShowModal = () => setShowModal(true);
	const handleCloseModal = () => setShowModal(false);

	const getTypeNaamById = (id, data) => {
		const foundItem = data.find(item => item.id === id);
		return foundItem ? foundItem.naam : null;
	};

	const handleConfirm = () => {
		createOnderzoek();
	};

	const fetchData = async (route, formatItem) => {
		try {
			const response = await fetchApi({ route });
	
			if (response.status === 200) {
				const items = response.data.map(item => formatItem(item)).filter(Boolean);
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

	const createOnderzoek = async () => {
		const onderzoekData = {
			Titel: opdrachtData.opdrachtNaam,
			Beschrijving: opdrachtData.opdrachtOmschrijving,
			StartDatum: opdrachtData.startDatum,
			EindDatum: opdrachtData.eindDatum,
			BedrijfId: 2, // Replace with your actual bedrijfId
			Beloning: "Test beloning", // Replace with your actual beloning
			Locatie: "Locatie", // Replace with your actual locatie
			/**OnderzoekCategories: opdrachtData.typeOpdracht.map(typeId => ({ TypeId: typeId })),
			BeperkingCriteria: opdrachtData.beperking.map(beperkingId => ({ beperkingId: beperkingId })),
			LeeftijdCriteria: opdrachtData.leeftijd.map(leeftijd => ({ leeftijd: leeftijd })),
			PostcodeCriteria: opdrachtData.postcode.map(postcode => ({ postcode: postcode })),**/
		};
		
		console.log(JSON.stringify(onderzoekData));
		try {
			const response = await postApi({
				route: "/api/onderzoek/create-onderzoek",
				body: JSON.stringify(onderzoekData)
			});
	
			if (response.status === 200) {
				console.log("Onderzoek has been created.");
			} else {
				console.error("Error creating Onderzoek:", response.statusText);
			}
		} catch (error) {
			console.error("Error while trying to create Onderzoek:", error);
		}
	};
	
	useEffect(() => {
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
	
		fetchDataAndSetState();
	}, []);
	const StyledOpdrachtData = 
	`
	<div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "5px" }}>
		<h1>${opdrachtData.opdrachtNaam}</h1>
		
		<p>${opdrachtData.opdrachtOmschrijving}</p>

		<p><strong>Type Opdracht:</strong> ${opdrachtData.typeOpdracht.map(id => getTypeNaamById(id, typeOpdrachten)).join(", ")}</p>

		${opdrachtData.beperking.length > 0 ? `<p><strong>Beperking(en) in aanmerking:</strong> ${opdrachtData.beperking.map(id => getTypeNaamById(id, beperkingen)).join(", ")}</p>` : ""}
		
		${opdrachtData.leeftijd.length > 0 ? `<p><strong>Leeftijd(en):</strong> ${opdrachtData.leeftijd.map(l => l).join(", ")}</p>` : ""}

		${opdrachtData.postcode.length > 0 ? `<p><strong>Postcode(s):</strong> ${opdrachtData.postcode}</p>` : ""}
		
		<p><strong>Opdracht start op:</strong> ${opdrachtData.startDatum}</p>

		<p><strong>Opdracht eindigt op:</strong> ${opdrachtData.eindDatum}</p>
  	</div>
	`;

	return (
		<>
			<NieuwOpdrachtForm handleOpdrachtDataChange={handleOpdrachtDataChange}
				typeOpdrachten={typeOpdrachten}
				beperkingen={beperkingen}
			/>
			<ConfirmationModal show={showModal} handleClose={handleCloseModal} handleConfirm={handleConfirm} title="Weet u het zeker?" htmlMessage={StyledOpdrachtData} />
		</>
	);
};

export default NieuwOpdracht;
