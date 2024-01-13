import React, { useState, useEffect } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import InputBar from "../../components/Inputbar/InputBar";
import { useNavigate, useLocation } from "react-router-dom";
import MultiSelectionBar from "../../components/MultiSelectionBar/MultiSelectionBar";

const medischepagina = ({ handleSubmitForm }) => {
	const location = useLocation();
	const navigate = useNavigate();
	const [profielMedData, setProfielMedData] = useState(() =>{
		const savedData = localStorage.getItem("profielMedData");
		return savedData ? JSON.parse(savedData) : {
			Aandoening: "",
			Hulpmiddelen: "",
			onderzoeken: "",
			portaalbenadering: "",
			beschikbaar: "",
			telefonisch_benadering: "",
		};
	});

	const navigateBack = () => {
		const savedData = localStorage.getItem("profielData");
		if (savedData) {
			setProfielMedData(JSON.parse(savedData));
		}
		navigate("/profielPagina", { state: { profielMedData } });
	};
	const onderzoekItems = [
		{ id: "interview", naam: "Interview" },
		{ id: "groepsgesprekken", naam: "Groepsgesprekken" },
		{ id: "online", naam: "Online onderzoeken" },
		{ id: "engels", naam: "Engelstalige onderzoeken" }
	];

	useEffect(() => {
		if (location.state && location.state.profielData) {
			// Gebruik de doorgestuurde profielData
			setProfielMedData(location.state.profielData);
		}
	}, [location.state]);

	const updateProfielData = (name, value) => {
		setProfielMedData(prevState => {
			const updatedState = { ...prevState, [name]: value };
			localStorage.setItem("profielMedData", JSON.stringify(updatedState));
			return updatedState;
		});
	};

	useEffect(() => {
		const savedData = localStorage.getItem("profielMedData");
		if (savedData) {
			setProfielMedData(JSON.parse(savedData));
		}
	}, []);
	

	return (
		<Form validated={true} onSubmit={(event) => handleSubmitForm(event, profielMedData)}>
			<Container>
				<h2>Profiel pagina</h2>
				<p>Vul hieronder u medische gegevens in</p>
				<Row className="persoonlijkegegevens">
					<InputBar 
						label="Aandoening/ziekte" 
						required 
						value={profielMedData.Aandoening || ""} 
						handleChange={(value) => updateProfielData("Aandoening", value)} 
					/>
					<InputBar 
						label="Hulpmiddelen" 
						required 
						value={profielMedData.Hulpmiddelen || ""} 
						handleChange={(value) => updateProfielData("Hulpmiddelen", value)} 
					/>

					<MultiSelectionBar 
						label="Type onderzoeken" 
						items={onderzoekItems}
						handleSelection={(selectedItems) => updateProfielData("onderzoekenTypes", selectedItems)}
						initialSelectedItems={profielMedData.onderzoekenTypes} 
						getKey={(option) => option.id} 
						getValue={(option) => option.naam}
					/>
					<div className="bewerk-profiel-checkbox">
						<label htmlFor="portaal-benadering">Portaal benaderen</label>
						<input 
							type="checkbox" 
							id="portaal-benadering" 
							name="portaal-benadering-voorkeur"
							checked={profielMedData?.benaderingVoorkeur?.portaal || false} 
							onChange={(event) => setProfielMedData({...profielMedData, benaderingVoorkeur: {...profielMedData.benaderingVoorkeur, portaal: event.target.checked}})} 
						/>
					</div>

					<div className="bewerk-profiel-checkbox">
						<label htmlFor="telefonisch-benadering">Telefonisch benaderen</label>
						<input  
							type="checkbox" 
							id="telefonisch-benadering" 
							name="telefonisch-benadering-voorkeur"
							checked={profielMedData?.benaderingVoorkeur?.telefonisch || false} 
							onChange={(event) => setProfielMedData({...profielMedData, benaderingVoorkeur: {...profielMedData.benaderingVoorkeur, telefonisch: event.target.checked}})} 
						/>
					</div>

					<InputBar 
						label="Beschikbaar" 
						required 
						value={profielMedData.Beschikbaar || ""} 
						handleChange={(value) => updateProfielData("Beschikbaar", value)} 
					/>
	
					<div className="bewerk-profiel-checkbox">
						<label htmlFor="com-benadering">Of commerciële partijen u mogen benaderen</label>
						<input 
							type="checkbox" 
							id="com-benadering" 
							name="com-benadering-voorkeur" 
							checked={profielMedData?.benaderingVoorkeur?.toestemmingUitnodigingen || false} 
							onChange={(event) => setProfielMedData({...profielMedData, benaderingVoorkeur: {...profielMedData.benaderingVoorkeur, toestemmingUitnodigingen: event.target.checked}})} 
						/>
					</div>					
				</Row>
				<Button variant="secondary" type="button" onClick={navigateBack}>Terug</Button>
				<Button type="submit">Volgende</Button>
			</Container>
		</Form>
	);
};

export default medischepagina;