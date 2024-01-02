import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import InputBar from "../../../../components/Inputbar/InputBar";
import MultiSelectionBar from "../../../../components/MultiSelectionBar/MultiSelectionBar";


const NieuwOpdracht = () => {
	const typeOpdrachten = ["Interview", "Groepsgesprekken", "Online", "Engelstalig"];
	const beperkingen = ["Motorische beperking", "Visuele beperking", "Verstandelijke beperking", "Gehoorverlies"];
	const [selectedItems, setSelectedItems] = useState([]); 
	
	const handleSelection = (items) => { 
		setSelectedItems(items);
	};

	return (
		<>
			<h1>Opdracht maken</h1>
			<Container>
				<Row className="justify-content-center">
					<InputBar textPosition="left" label="Opdracht naam" type="text" placeholder="bijv. The Whites Website Accesibility" handleChange={() => console.log("hi")}/>
					<InputBar textPosition="left" label="Opdracht omschrijving" type="textarea" placeholder="Dit dat" handleChange={() => console.log("hi")}/>
				</Row>
				<Row>
					<MultiSelectionBar label="Type opdracht" buttonText="Selecteer type" items={typeOpdrachten} handleSelection={handleSelection}/>
					<MultiSelectionBar label="Welke groepen komen in aanmerking" buttonText="Selecteer beperking(en)" items={beperkingen} handleSelection={handleSelection}/>
				</Row>
			</Container>
		</>
	);
};

export default NieuwOpdracht;
