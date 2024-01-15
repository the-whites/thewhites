import React, { useState, useEffect } from "react";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import InputBar from "../Inputbar/InputBar";
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";
import MultiSelectionBar from "../MultiSelectionBar/MultiSelectionBar";
import { postcodeValidator } from "postcode-validator";
import { useNavigate } from "react-router-dom";
import { OPDRACHT_DATA, initialOpdrachtState } from "../../constants/opdrachtData";

const mapItemsToStrings = items => items.map(item => item.naam);

const getIdByNaam = (naam, data) => {
	const foundItem = data.find(item => item.naam === naam);
	return foundItem ? foundItem.id : null;
};

const NieuwOpdrachtForm = ({ handleOpdrachtDataChange, beperkingen, typeOpdrachten, opdracht, buttonConfirmText = "Maak opdracht aan"}) => {
	const [localOpdrachtData, setLocalOpdrachtData] = useState(initialOpdrachtState);
	const [leeftijden, setLeeftijden] = useState([]); // Leeftijd wordt ook gehandeld in localOpdrachtData, deze useState is alleen voor visualisatie

	const [invalidPostcodes, setInvalidPostcodes] = useState([]);

	// Dit zijn de verplichte velden die ingevuld moeten worden
	const [isInvalidFields, setIsInvalidFields] = useState({
		[OPDRACHT_DATA.NAAM]: false,
		[OPDRACHT_DATA.OMSCHRIJVING]: false,
		[OPDRACHT_DATA.INHOUD]: false,
		[OPDRACHT_DATA.LOCATIE]: false,
		[OPDRACHT_DATA.TYPE_OPDRACHT]: false,
		[OPDRACHT_DATA.START_DATUM]: false,
		[OPDRACHT_DATA.EIND_DATUM]: false,
	});

	const navigate = useNavigate();

	const handleTypeSelection = (items) => {
		if(items) {
			// Pak alleen de nummer uit de string oftewel de ID
			const ids = items.map(naam => getIdByNaam(naam, typeOpdrachten));
			setLocalOpdrachtData(({...localOpdrachtData, typeOpdracht: ids }));
		}
	};
   
	const handleBeperkingChange = (items) => {
		if(items) {
			const ids = items.map(naam => getIdByNaam(naam, beperkingen));
			setLocalOpdrachtData(({...localOpdrachtData, beperking: ids }));
		}
	};
	
	const handleLeeftijdChange = (value) => {
		setLeeftijden([value]);
		
		let leeftijdenData = [];
		const leeftijdParts = value.split(",").map(part => part.trim());

		leeftijdParts.forEach(part => {
			if (part.includes("-")) {
				// Check voor ranges
				const [start, end] = part.split("-");
				const leeftijdCriteria = [parseInt(start.trim()), parseInt(end.trim())];
				leeftijdenData.push(leeftijdCriteria);
			} else {
				// Check voor individuele leeftijden
				const leeftijd = parseInt(part);
				leeftijdenData.push([leeftijd, leeftijd]);
			}
		});
		setLocalOpdrachtData(({...localOpdrachtData,  leeftijd: leeftijdenData }));
	};
	
	const handlePostcodeChange = (value) => {
		let postcoden = [];

		if (value.includes(",")) {
			postcoden = value.split(",").map(postcode => postcode.trim());
		} else {
			if(value.trim !== "") {
				postcoden.push(value.trim());
			}
		}

		setLocalOpdrachtData(({...localOpdrachtData, postcode: postcoden }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const valid = validateOpdrachtData();

		if(valid)
			handleOpdrachtDataChange(localOpdrachtData);
	};

	const validateOpdrachtData = () => {
		const invalidFields = {};

		for (const key in isInvalidFields) {
			if (localOpdrachtData[key] === null || localOpdrachtData[key] === "") {
				invalidFields[key] = true;
			} else {
				invalidFields[key] = false;
			}
		}

		if(localOpdrachtData[OPDRACHT_DATA.TYPE_OPDRACHT].length === 0) {
			invalidFields[OPDRACHT_DATA.TYPE_OPDRACHT] = true;
		} else {
			invalidFields[OPDRACHT_DATA.TYPE_OPDRACHT]= false;
		}

		if(localOpdrachtData[OPDRACHT_DATA.START_DATUM] === null) {
			invalidFields[OPDRACHT_DATA.START_DATUM] = true;
		} else {
			invalidFields[OPDRACHT_DATA.START_DATUM] = false;
		}

		if(localOpdrachtData[OPDRACHT_DATA.START_DATUM] > localOpdrachtData[OPDRACHT_DATA.EIND_DATUM]) {
			invalidFields[OPDRACHT_DATA.START_DATUM] = true;
			invalidFields[OPDRACHT_DATA.EIND_DATUM] = true;
		}

		validatePostcodes();

		if(invalidPostcodes.length !== 0 && !invalidPostcodes.includes("")) {
			invalidFields[OPDRACHT_DATA.POSTCODE] = true;
		}

		setIsInvalidFields(({ ...isInvalidFields, ...invalidFields }));
		return Object.values(invalidFields).every(value => value === false);
	};

	const validatePostcodes = () => {
		const tempInvalidPostcodes = localOpdrachtData[OPDRACHT_DATA.POSTCODE]
			.map(postcode => postcode.replace(" ", ""))
			.filter(postcode => !postcodeValidator(postcode, "NL"));

		setInvalidPostcodes(tempInvalidPostcodes);
	};

	useEffect(() => {
		const hasInvalidPostcodes = invalidPostcodes.length !== 0 && !invalidPostcodes.includes("");
		setIsInvalidFields(({ ...isInvalidFields, postcode: hasInvalidPostcodes }));
	}, [invalidPostcodes]);

	useEffect(() => {
		if(opdracht) {
			setLocalOpdrachtData(opdracht);

			if(opdracht[OPDRACHT_DATA.LEEFTIJD]) {
				const leeftijdOpdracht = opdracht[OPDRACHT_DATA.LEEFTIJD].map(l => {l.minLeeftijd === l.maxLeeftijd ? l.minLeeftijd : `${l.minLeeftijd}-${l.maxLeeftijd}`;});
				setLeeftijden(leeftijdOpdracht);
			}

			if(opdracht[OPDRACHT_DATA.POSTCODE]) {
				setLocalOpdrachtData(({ ...opdracht, 
					[OPDRACHT_DATA.POSTCODE]: opdracht[OPDRACHT_DATA.POSTCODE].map(postcode => postcode.postcode) }));
			}
		}
	}, [opdracht]);

	const postcodeErrorText = `De volgende postcodes zijn ongeldig: ${invalidPostcodes.join(", ")}`;

	return (
		<Form>
			<Container className="center-container">
				<Row className="justify-content-center">
					<Col md={{ span: 12, offset: 3 }}>
						
						<h1 className="text-center mb-4 header">Algemeen</h1>
						<div className="mb-3">
							<InputBar 
								label="Opdracht naam" 
								placeholder="Naam van de opdracht" 
								required={true} 
								value={localOpdrachtData[OPDRACHT_DATA.NAAM]} 
								isInvalid={isInvalidFields[OPDRACHT_DATA.NAAM]} 
								handleChange={(value) => setLocalOpdrachtData(({ ...localOpdrachtData, [OPDRACHT_DATA.NAAM]: value }))} />
							<InputBar 
								label="Opdracht omschrijving" 
								type="textarea" 
								placeholder="Beschrijf kort wat het doel van de opdracht is" 
								required={true} 
								value={localOpdrachtData[OPDRACHT_DATA.OMSCHRIJVING]} 
								isInvalid={isInvalidFields[OPDRACHT_DATA.OMSCHRIJVING]}
								handleChange={(value) => setLocalOpdrachtData(({ ...localOpdrachtData, [OPDRACHT_DATA.OMSCHRIJVING]: value }))} />
							<InputBar 
								label="Opdracht inhoud" 
								type="textarea" 
								placeholder="Leg duidelijk uit wat de deelnemers moeten doen eventueel met een stappenplan" 
								required={true} 
								value={localOpdrachtData[OPDRACHT_DATA.INHOUD]} 
								isInvalid={isInvalidFields[OPDRACHT_DATA.INHOUD]}
								handleChange={(value) => setLocalOpdrachtData(({ ...localOpdrachtData, [OPDRACHT_DATA.INHOUD]: value }))} />
							<InputBar 
								label="Locatie van opdracht" 
								placeholder="Vul hier de locatie in waar de opdracht uitgevoerd moet worden" 
								required={true}
								value={localOpdrachtData[OPDRACHT_DATA.LOCATIE]} 
								isInvalid={isInvalidFields[OPDRACHT_DATA.LOCATIE]} 
								handleChange={(value) => setLocalOpdrachtData(({ ...localOpdrachtData, [OPDRACHT_DATA.LOCATIE]: value }))} />
							<InputBar 
								label="Beloning" 
								value={localOpdrachtData[OPDRACHT_DATA.BELONING]}
								placeholder="Vul hier de beloning in die de deelnemers krijgen voor het uitvoeren van de opdracht" 
								handleChange={(value) => setLocalOpdrachtData(({ ...localOpdrachtData, [OPDRACHT_DATA.BELONING]: value }))} />
						</div>
						<div className="mb-3">
							<MultiSelectionBar 
								label="Type opdracht" 
								buttonText="Selecteer type" 
								items={typeOpdrachten ? mapItemsToStrings(typeOpdrachten) : []} 
								initialSelectedItems={opdracht && mapItemsToStrings(opdracht[OPDRACHT_DATA.TYPE_OPDRACHT])}
								getKey={(option) => option.toString()} 
								isInvalid={isInvalidFields[OPDRACHT_DATA.TYPE_OPDRACHT]} 
								required={true} 
								handleSelection={handleTypeSelection} />
						</div>
						<h1 className="text-center mb-3 header">Criteria</h1>
						<div className="mb-3" >
							<MultiSelectionBar 
								label="Uitstellen op beperking" 
								buttonText="Selecteer beperking" 
								items={beperkingen ? mapItemsToStrings(beperkingen) : []} 
								getKey={(option) => option.toString()} 
								initialSelectedItems={opdracht && mapItemsToStrings(opdracht[OPDRACHT_DATA.BEPERKING])}
								handleSelection={handleBeperkingChange} />
						</div>
						<div className="mb-3" >
							<InputBar 
								label="Uitstellen op leeftijd" 
								value={leeftijden}
								placeholder="Vul hier de leeftijd(en) in die in aanmerking kunnen komen voor deze opdracht" 
								infoText="Je kan meerdere leeftijden invullen doormiddel van kommas zoals: 18, 20, 26 of 13-20 (dit is dan 13 tot en met 20)" 
								handleChange={handleLeeftijdChange} />
							<InputBar 
								label="Postcode"
								value={localOpdrachtData[OPDRACHT_DATA.POSTCODE] ? localOpdrachtData[OPDRACHT_DATA.POSTCODE].map(postcode => postcode.toString()).join(", ") : ""}
								placeholder="Vul hier de postcode(s) in die in aanmerking kunnen komen voor deze opdracht" 
								infoText="Je kan meerdere postcodes invullen doormiddel van een scheiding met een komma: 2554GW, 2551AB" 
								errorMessage={postcodeErrorText} 
								isInvalid={isInvalidFields[OPDRACHT_DATA.POSTCODE]} 
								handleChange={handlePostcodeChange} />
						</div>
						<h1 className="text-center mb-3 header ">Datum</h1>
						<CustomDatePicker 
							label="Start datum" 
							required={true} 
							value={opdracht && opdracht[OPDRACHT_DATA.START_DATUM]}
							isInvalid={isInvalidFields[OPDRACHT_DATA.START_DATUM]} 
							handleChange={(value) => setLocalOpdrachtData(({ ...localOpdrachtData, [OPDRACHT_DATA.START_DATUM]: value }))} />
						<div className="mb-3" />
						<CustomDatePicker 
							label="Eind datum" 
							value={opdracht && opdracht[OPDRACHT_DATA.EIND_DATUM]}
							required={true} 
							isInvalid={isInvalidFields[OPDRACHT_DATA.EIND_DATUM]} 
							handleChange={(value) => setLocalOpdrachtData(({ ...localOpdrachtData, [OPDRACHT_DATA.EIND_DATUM]: value }))}/>
					</Col>
				</Row>

				<div className="mb-3" />

				<Row className="justify-content-center mt-3">
					<Col md={4} className="text-start">
						<Button onClick={() => navigate(-1)} variant="danger">Annuleren</Button>
					</Col>
					<Col md={2} className="text-end">
						<Button onClick={handleSubmit}>{buttonConfirmText}</Button>
					</Col>
				</Row>
				<div className="mb-4" />
			</Container>
		</Form>
	);
};

export default NieuwOpdrachtForm;