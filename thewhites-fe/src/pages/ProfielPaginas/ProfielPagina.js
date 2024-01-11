import React, { useState, useEffect } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import InputBar from "../../components/Inputbar/InputBar";
import MultiSelectionBar from "../../components/MultiSelectionBar/MultiSelectionBar";
import "./ProfielPagina.css";

const BewerkProfielForm = ({ setProfielData = (items) => {}, handleSubmitForm = () => {}, beperkingItems, onderzoekTypeItems }) => {
	const [profielData, setInternalProfielData] = useState({
		voornaam: "",
		achternaam: "",
		postcode: "",
		emailadres: "",
		telefoonnummer: "",
		beperkingTypes: [],
	});

	const beperkingItemss = [
		{ id: "blind", naam: "Blind" },
		{ id: "doof", naam: "Doof" },
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


	// This function is used to update both the internal state and the parent state, if necessary
	const updateProfielData = (name, value) => {
		const newProfielData = { ...profielData, [name]: value };
		setInternalProfielData(newProfielData);
		setProfielData(newProfielData); // Update the parent component's state, if needed
	};

	return (
		<Form validated={true} onSubmit={(event) => handleSubmitForm(event, profielData)}>
			<Container>
				<h2>Profiel pagina</h2>
				<p>Vul hieronder u persoonlijke gegevens in</p>
				<Row className="Pro">
					<InputBar 
						label="Voornaam" 
						required 
						value={profielData.voornaam} 
						handleChange={(value) => updateProfielData("voornaam", value)} 
					/>
					<InputBar 
						label="Achternaam" 
						required 
						value={profielData.achternaam} 
						handleChange={(value) => updateProfielData("achternaam", value)} 
					/>
					<InputBar 
						label="Postcode" 
						required 
						value={profielData.postcode} 
						handleChange={(value) => updateProfielData("postcode", value)} 
					/>
					<InputBar 
						label="E-mailadres" 
						required 
						value={profielData.emailadres} 
						handleChange={(value) => updateProfielData("emailadres", value)} 
					/>
					<InputBar 
						label="Telefoonnummer" 
						required 
						value={profielData.telefoonnummer} 
						handleChange={(value) => updateProfielData("telefoonnummer", value)} 
						min={8}
					/>
					<MultiSelectionBar 
						label="Type beperkingen" 
						items={beperkingItemss}
						handleSelection={(selectedItems) => updateProfielData("beperkingTypes", selectedItems)}
						initialSelectedItems={profielData.beperkingTypes} 
						getKey={(option) => option.id} 
						getValue={(option) => option.naam}
					/>

					<Button type="next">Volgende</Button>
				</Row>
			</Container>
		</Form>
	);
};

export default BewerkProfielForm;
