import React, { useEffect, useState } from "react";
import InputBar from "../../../components/Inputbar/InputBar";
import "./style.css";

import { fetchApi, postApi } from "../../../hooks/useApi";
import { Alert, Button } from "react-bootstrap";
import { BewerkProfielPreview } from "./BewerkProfielPreview";
import { BewerkProfielForm } from "./BewerkProfielForm";


const ProfielErvaringsdeskundige = () => {
	const [profielData, setProfielData] = useState({});
	const [beperkingItems, setBeperkingItems] = useState([]);
	const [onderzoekTypeItems, setOnderzoekTypeItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isConfirming, setIsConfirming] = useState(false);
	const [error, setError] = useState(null);
	const [formIsValidated, setFormIsValidated] = useState(false);

	// Fetch oude profiel info van gebruiker en update de form ermee.
	useEffect(() => {
		setIsLoading(true);

		const fetchData = async () => {
			const onderzoekTypesResponse = await fetchApi({route: "api/OnderzoekType/onderzoek-types"});
			const beperkingTypesResponse = await fetchApi({route: "api/Beperking/beperkingen"});

			setBeperkingItems(Object.values(beperkingTypesResponse.data).map(item => {
				return {id: item.id, naam: item.naam};
			}));

			setOnderzoekTypeItems(Object.values(onderzoekTypesResponse.data).map(item => {
				return {id: item.id, type: item.type};
			}));

			const profielInfoResponse = await fetchApi({route: "api/ErvaringsDeskundige/profiel-info"});
			setProfielData(profielInfoResponse.data);
			setIsLoading(false);
		};

		fetchData();
		setFormIsValidated(true);
	}, []);

	// Wanneer de gebruiker op 'Opslaan' drukt
	const handleSubmitForm = (event) => {
		const form = event.currentTarget;
		console.log(profielData);
		event.preventDefault();
		if (form.checkValidity() === false) {
			event.stopPropagation();
			setFormIsValidated(true);

		}
		else {
			setError(null);
			setIsConfirming(true);
			setFormIsValidated(true);
		}
	};

	// Wanneer de gebruiker op 'Bevestigen' drukt
	const handlePostNewData = async () => {
		console.log(profielData);
		const postBody = {
			telefoonnummer: profielData.telefoonnummer,
			hulpmiddelen: profielData.hulpmiddel,
			comBenadering: profielData.benaderingVoorkeur.toestemmingUitnodigingen,
			portaalBenadering: profielData.benaderingVoorkeur.portaal,
			telefonischBenadering: profielData.benaderingVoorkeur.telefonisch,
			beschikbaarheid: profielData.beschikbaarheid,
			aandoeningZiekte: profielData.ziekte,
			beperkingTypes: [
				...profielData.beperkingTypes.map((item) => item.id)
			],
			onderzoekTypes: [
				...profielData.onderzoekTypes.map((item) => item.id)
			]
		};

		console.log("POSTBODY = " + JSON.stringify(postBody));
		const response = await postApi({route: "api/Ervaringsdeskundige/edit-profiel-info", body: postBody}).catch((e) =>	{
			console.log((e.response && e.response.data));
			setError((<><Alert variant="danger">
				{JSON.stringify(e.response && e.response.data) || e.toString()}
			</Alert></>));
		});

		if (response && response.status == 200)
		{
			setError(<Alert variant="success">
				De bewerking was successvol!
			</Alert>);
			setIsConfirming(false);
		}
	};

	return (
		<>
			{error}
			{isConfirming && <>
			
				<BewerkProfielPreview profielData={profielData} />
				<Button onClick={() => handlePostNewData()}>Bevestigen</Button>
				<Button onClick={() => setIsConfirming(false)}>Terug</Button>
			</>}


			<div hidden={isConfirming || isLoading ? "hidden" : ""}>
				<br />
				{!isLoading && <BewerkProfielForm 
					profielData={profielData} 
					setProfielData={(newItems) => setProfielData(newItems)}
					handleSubmitForm={handleSubmitForm} 
					formIsValidated={formIsValidated} 
					beperkingItems={beperkingItems}
					onderzoekTypeItems={onderzoekTypeItems}
				/> }
			</div>
		</>
	);
};

export default ProfielErvaringsdeskundige;