import React, { useState, useEffect } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import InputBar from "../../components/Inputbar/InputBar";
import MultiSelectionBar from "../../components/MultiSelectionBar/MultiSelectionBar";
import "./ProfielPagina.css";

const ProfielPagina = ({ setProfielData = ( ) => {}, handleSubmitForm = ( ) => {}}) => {
	const [profielData, setInternalProfielData] = useState({
		voornaam: "",
		achternaam: "",
		postcode: "",
		emailadres: "",
		telefoonnummer: "",
		beperkingTypes: [],
	});

	const beperkingItems = [
		{ id: "blind", naam: "Blind" },
		{ id: "doof", naam: "Doof" },
		{ id: "autisme", naam: "Autisme" },
	];

	useEffect(() => {
		const savedData = localStorage.getItem("profielData");
		if (savedData) {
			setInternalProfielData(JSON.parse(savedData));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("profielData", JSON.stringify(profielData));
	}, [profielData]);

	const updateProfielData = (name, value) => {
		const newProfielData = { ...profielData, [name]: value };
		setInternalProfielData(newProfielData);
		setProfielData(newProfielData);
	};	

	return (
		<Form validated={true} onSubmit={(event) => handleSubmitForm(event, profielData)}>
			<Container>
				<h2>Profiel pagina</h2>
				<p>Vul hieronder u persoonlijke gegevens in</p>
				<Row className="persoonlijkegegevens">
					<Col md={10} className = "inputvelden"> {}
						<InputBar 
							label="Voornaam" 
							required 
							value={profielData.voornaam || ""} 
							handleChange={(value) => updateProfielData("voornaam", value)} 
						/>
					
						<InputBar 
							label="Achternaam" 
							required 
							value={profielData.achternaam || ""} 
							handleChange={(value) => updateProfielData("achternaam", value)} 
						/>

						<InputBar 
							label="Postcode" 
							required 
							value={profielData?.postcode || ""} 
							handleChange={(value) => updateProfielData("postcode", value)} 
						/>
						<InputBar 
							label="E-mailadres" 
							required 
							value={profielData?.emailadres || ""} 
							handleChange={(value) => updateProfielData( "emailadres", value)} 
						/>

						<InputBar 
							label="Telefoonnummer"
							required 
							value={profielData?.telefoonnummer || ""} 
							handleChange={(value) => updateProfielData("telefoonnummer", value)} 
							min={8}
						/>

                    
						<MultiSelectionBar 
							label="Type beperkingen" 
							items={beperkingItems}
							handleSelection={(selectedItems) => updateProfielData("beperkingTypes", selectedItems)}
							initialSelectedItems={profielData.beperkingTypes} 
							getKey={(option) => option.id} 
							getValue={(option) => option.naam}
						/>
					</Col>
				</Row>
				<Button type="next">Volgende</Button>
			</Container>
		</Form>
	);
};

export default ProfielPagina;