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

	const beperkingItemss = [
		{ id: "blind", naam: "Blind" },
		{ id: "doof", naam: "Doof" },
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
						items={beperkingItemss}
						handleSelection={(selectedItems) => updateProfielData("beperkingTypes", selectedItems)}
						initialSelectedItems={profielData.beperkingTypes} 
						getKey={(option) => option.id} 
						getValue={(option) => option.naam}
					/>

					<Button type="submit">Volgende</Button>
				</Row>
			</Container>
		</Form>
	);
};

export default medischepagina;

