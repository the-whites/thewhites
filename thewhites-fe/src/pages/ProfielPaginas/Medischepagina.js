import React, { useContext, useEffect,useCallback } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import InputBar from "../../components/Inputbar/InputBar";
import { useNavigate } from "react-router-dom";
import MultiSelectionBar from "../../components/MultiSelectionBar/MultiSelectionBar";
import { ProfielContext } from "./ProfielContext";

const medischepagina = () => {
	const { profielData, setProfielData } = useContext(ProfielContext);
	const navigate = useNavigate();

	const navigateBack = () => {
		navigate("/profielPagina");
	};
	const onderzoekItems = [
		{ id: "interview", naam: "Interview" },
		{ id: "groepsgesprekken", naam: "Groepsgesprekken" },
		{ id: "online", naam: "Online onderzoeken" },
		{ id: "engels", naam: "Engelstalige onderzoeken" }
	];

	useEffect(() => {
		sessionStorage.setItem("profielData", JSON.stringify(profielData));
	}, [profielData]);

	const updateProfielData = useCallback((name, value) => {
		setProfielData(prevState => ({ ...prevState, [name]: value }));
	}, [setProfielData]);


	const handleSubmitForm = (event) => {
		event.preventDefault();
		// Validatie nog toevoegen voor de velden
		navigate("/bevestingsPagina"); 
	};
	

	return (
		<Form validated={true} onSubmit={handleSubmitForm}>
			<Container>
				<h2>Profiel pagina</h2>
				<p>Vul hieronder u medische gegevens in</p>
				<Row className="persoonlijkegegevens">
					<InputBar 
						label="Aandoening/ziekte" 
						required 
						value={profielData.Aandoening || ""} 
						handleChange={(value) => updateProfielData("Aandoening", value)} 
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
							checked={profielData.portaalbenadering || false} 
							onChange={(event) => updateProfielData("portaalbenadering", event.target.checked)}
						/>
					</div>

					<div className="bewerk-profiel-checkbox">
						<label htmlFor="telefonisch-benadering">Telefonisch benaderen</label>
						<input  
							type="checkbox" 
							id="telefonisch-benadering" 
							name="telefonisch-benadering-voorkeur"
							checked={profielData.telefonisch_benadering || false} 
							onChange={(event) => updateProfielData("telefonisch_benadering", event.target.checked)}
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
							checked={profielData.toestemmingUitnodigingen || false}  
							onChange={(event) => updateProfielData("toestemmingUitnodigingen", event.target.checked)}
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