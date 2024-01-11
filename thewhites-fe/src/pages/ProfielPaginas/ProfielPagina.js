import React, { useState, useEffect } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import InputBar from "../../components/Inputbar/InputBar";
import MultiSelectionBar from "../../components/MultiSelectionBar/MultiSelectionBar";

const BewerkProfielForm = ({ setProfielData = (items) => {}, handleSubmitForm = () => {}, beperkingItems, onderzoekTypeItems }) => {
	const [profielData, setInternalProfielData] = useState({
		voornaam: "",
		achternaam: "",
		postcode: "",
		emailadres: "",
		telefoonnummer: "",
		beperkingTypes: [],
	});

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
				<Row className="justify-content-md-center">
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
						items={beperkingItems}
						handleSelection={(selectedItems) => updateProfielData("beperkingTypes", selectedItems)}
						initialSelectedItems={profielData.beperkingTypes} 
						getKey={(option) => option.id} 
						getValue={(option) => option.naam}
					/>

					<Button type="submit">Opslaan</Button>
				</Row>
			</Container>
		</Form>
	);
};

export default BewerkProfielForm;
