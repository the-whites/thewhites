import React, { useState, useEffect } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import InputBar from "../../components/Inputbar/InputBar";
import MultiSelectionBar from "../../components/MultiSelectionBar/MultiSelectionBar";

const medischepagina = ({ handleSubmitForm }) => {
	const [profielData, setProfielData] = useState({
		voornaam: "",
		achternaam: "",
		postcode: "",
		emailadres: "",
		telefoonnummer: "",
		beperkingTypes: [],
	});

	const onderzoekItems = [
		{ id: "interview", naam: "Interview" },
		{ id: "groepsgesprekken", naam: "Groepsgesprekken" },
		{ id: "online", naam: "Online onderzoeken" },
		{ id: "engels", naam: "Engelstalige onderzoeken" }
	];

	useEffect(() => {
		const savedData = localStorage.getItem("profielData");
		if (savedData) {
			setProfielData(JSON.parse(savedData));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("profielData", JSON.stringify(profielData));
	}, [profielData]);

	const updateProfielData = (name, value) => {
		setProfielData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	return (
		<Form validated={true} onSubmit={(event) => handleSubmitForm(event, profielData)}>
			<Container>
				<h2>Profiel pagina</h2>
				<p>Vul hieronder u persoonlijke gegevens in</p>
				<Row className="persoonlijkegegevens">
					<InputBar 
						label="Aandoening/ziekte" 
						required 
						value={profielData.Aandoening || ""} 
						handleChange={(value) => updateProfielData("aandoening/ziekte", value)} 
					/>
					<InputBar 
						label="Hulpmiddelen" 
						required 
						value={profielData.Hulpmiddelen || ""} 
						handleChange={(value) => updateProfielData("Hulpmiddelen", value)} 
					/>

					<MultiSelectionBar 
						label="Type onderzoeken" 
						items={onderzoekItems}
						handleSelection={(selectedItems) => updateProfielData("onderzoekenTypes", selectedItems)}
						initialSelectedItems={profielData.onderzoekenTypes} 
						getKey={(option) => option.id} 
						getValue={(option) => option.naam}
					/>
					<div className="bewerk-profiel-checkbox">
						<label htmlFor="portaal-benadering">Portaal benaderen</label>
						<input 
							type="checkbox" 
							id="portaal-benadering" 
							name="portaal-benadering-voorkeur"
							checked={profielData?.benaderingVoorkeur?.portaal || false} 
							onChange={(event) => setProfielData({...profielData, benaderingVoorkeur: {...profielData.benaderingVoorkeur, portaal: event.target.checked}})} 
						/>
					</div>

					<div className="bewerk-profiel-checkbox">
						<label htmlFor="telefonisch-benadering">Telefonisch benaderen</label>
						<input  
							type="checkbox" 
							id="telefonisch-benadering" 
							name="telefonisch-benadering-voorkeur"
							checked={profielData?.benaderingVoorkeur?.telefonisch || false} 
							onChange={(event) => setProfielData({...profielData, benaderingVoorkeur: {...profielData.benaderingVoorkeur, telefonisch: event.target.checked}})} 
						/>
					</div>

					<InputBar 
						label="Beschikbaar" 
						required 
						value={profielData.Beschikbaar || ""} 
						handleChange={(value) => updateProfielData("Beschikbaar", value)} 
					/>
	
					<div className="bewerk-profiel-checkbox">
						<label htmlFor="com-benadering">Of commerciële partijen u mogen benaderen</label>
						<input 
							type="checkbox" 
							id="com-benadering" 
							name="com-benadering-voorkeur" 
							checked={profielData?.benaderingVoorkeur?.toestemmingUitnodigingen || false} 
							onChange={(event) => setProfielData({...profielData, benaderingVoorkeur: {...profielData.benaderingVoorkeur, toestemmingUitnodigingen: event.target.checked}})} 
						/>
					</div>					
				</Row>
				<Button type="submit">Volgende</Button>
			</Container>
		</Form>
	);
};

export default medischepagina;

