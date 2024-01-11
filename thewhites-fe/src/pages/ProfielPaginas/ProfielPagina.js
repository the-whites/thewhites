import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import InputBar from "../../components/Inputbar/InputBar";
import MultiSelectionBar from "../../components/MultiSelectionBar/MultiSelectionBar";

const BewerkProfielForm = ({ setProfielData = (items) => {}, handleSubmitForm = ( ) => {}, beperkingItems, onderzoekTypeItems }) => {
	// Initialize the profielData state with empty values within the component
	const [profielData, setInternalProfielData] = useState({
		voornaam: "",
		achternaam: "",
		postcode: "",
		emailadres: "",
		telefoonnummer: "",
		beperkingTypes: ["blind", "doof"],
		hulpmiddel: "",
		ziekte: "",
		onderzoekTypes: [],
		beschikbaarheid: new Date(), // assuming the use of a date-time picker
		benaderingVoorkeur: {
			toestemmingUitnodigingen: false,
			portaal: false,
			telefonisch: false
		}
	});

  
	// This function is used to update the internal state and the parent state if necessary
	const updateProfielData = (updates) => {
		const newProfielData = { ...profielData, ...updates };
		setInternalProfielData(newProfielData);
		setProfielData(newProfielData); // Update the parent component's state, if needed
	};
  
	return (
		<Form validated={true} onSubmit={(event) => handleSubmitForm(event, profielData)}>
			<Container>
				<Row className="justify-content-md-center">
					<InputBar label="Voornaam" required value={profielData.voornaam} handleChange={(value) => updateProfielData("voornaam", value)} />
					<InputBar label="Achternaam" required value={profielData.achternaam} handleChange={(value) => updateProfielData("achternaam", value)} />
					<InputBar label="Postcode" required value={profielData.postcode} handleChange={(value) => updateProfielData("postcode", value)} />
					<InputBar label="E-mailadres" required value={profielData.emailadres} handleChange={(value) => updateProfielData("emailadres", value)} />

					<InputBar 
						required 
						value={profielData?.telefoonnummer || ""} 
						handleChange={(value) => setProfielData({...profielData, telefoonnummer: value})} 
						min={8}
						label="Telefoonnummer"
					/>
					<MultiSelectionBar 
						label="Type beperkingen" 
						items={beperkingItems}
						handleSelection={(selectedItems) => setProfielData({...profielData, beperkingTypes: selectedItems})}
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
  
// Usage of BewerkProfielForm in a parent component
const ParentComponent = () => {
	const [profielData, setProfielData] = useState({}); // Parent component's state
  
	const handleSubmitForm = (event, profielData) => {
		event.preventDefault();
		// Handle the form submission with profielData
	};
  
	// Dummy arrays for items, replace with actual data
	const beperkingItems = []; // Populate with actual items
	const onderzoekTypeItems = []; // Populate with actual items
  
	return (
		<BewerkProfielForm
			setProfielData={setProfielData}
			handleSubmitForm={handleSubmitForm}
			beperkingItems={beperkingItems}
			onderzoekTypeItems={onderzoekTypeItems}
		/>
	);
};

export default BewerkProfielForm;
  