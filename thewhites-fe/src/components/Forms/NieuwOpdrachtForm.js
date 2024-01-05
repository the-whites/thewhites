import React, { useState, useEffect } from "react";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import InputBar from "../Inputbar/InputBar";
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";
import MultiSelectionBar from "../MultiSelectionBar/MultiSelectionBar";
import { postcodeValidator } from "postcode-validator";
import { useNavigate } from "react-router-dom";

const NieuwOpdrachtForm = ({ handleOpdrachtDataChange, typeOpdrachten, beperkingen }) => {
	const [localOpdrachtData, setLocalOpdrachtData] = useState({
		opdrachtNaam: "",
		opdrachtOmschrijving: "",
		typeOpdracht: [],
		beperking: [],
		leeftijd: [],
		postcode: [],
		startDatum: null,
		eindDatum: null,
		locatie: "",
		beloning: ""
	});

	const [isInvalidFields, setIsInvalidFields] = useState({
		opdrachtNaam: false,
		opdrachtOmschrijving: false,
		typeOpdrachten: false,
		startDatum: false,
		eindDatum: false,
		postcode: false,
		locatie: false
	});

	const [invalidPostcodes, setInvalidPostcodes] = useState([]);

	const navigate = useNavigate();

	const getIdByNaam = (naam, data) => {
		const foundItem = data.find(item => item.naam === naam);
		return foundItem ? foundItem.id : null;
	};

	const handleOpdrachtNaamChange = (value) => {
		setLocalOpdrachtData((prevData) => ({ ...prevData, opdrachtNaam: value }));
	};
	
	const handleOpdrachtOmschrijvingChange = (value) => {
		setLocalOpdrachtData((prevData) => ({ ...prevData, opdrachtOmschrijving: value }));
	};
	
	const handleTypeSelection = (items) => {
		// Pak alleen de nummer uit de string oftewel de ID
		const ids = items.map(naam => getIdByNaam(naam, typeOpdrachten));
		setLocalOpdrachtData((prevData) => ({ ...prevData, typeOpdracht: ids }));
	};
	
	const handleBeperkingChange = (items) => {
		const ids = items.map(naam => getIdByNaam(naam, beperkingen));
		setLocalOpdrachtData((prevData) => ({ ...prevData, beperking: ids }));
	};
	
	const handleLeeftijdChange = (value) => {
		let leeftijden = [];

		if (value.includes('-')) {
			const [start, end] = value.split('-');
			const startLeeftijd = parseInt(start.trim());
			const endLeeftijd = parseInt(end.trim());

			for (let i = startLeeftijd; i <= endLeeftijd; i++) {
				leeftijden.push(i);
			}
		} else {
			const leeftijdArray = value.split(',').map(leeftijd => parseInt(leeftijd.trim()));
			leeftijden = leeftijdArray.filter(leeftijd => !isNaN(leeftijd));
		}

		setLocalOpdrachtData((prevData) => ({ ...prevData, leeftijd: leeftijden }));
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

		setLocalOpdrachtData((prevData) => ({ ...prevData, postcode: postcoden }));
	};
	
	const handleStartDateChange = (date) => {
		setLocalOpdrachtData((prevData) => ({ ...prevData, startDatum: date }));
	};
	
	const handleEndDateChange = (date) => {
		setLocalOpdrachtData((prevData) => ({ ...prevData, eindDatum: date }));
	};

	const handleLocatieChange = (locatie) => {
		setLocalOpdrachtData((prevData) => ({ ...prevData, locatie: locatie}));
	};

	const handleBeloningChange = (beloning) => {
		setLocalOpdrachtData((prevData) => ({ ...prevData, beloning: beloning }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const valid = validateOpdrachtData();

		console.log("is het valid?? ", valid);
		if(valid)
			handleOpdrachtDataChange(localOpdrachtData);
	};

	const validateOpdrachtData = () => {
		const invalidFields = {};

		for (const key in localOpdrachtData) {
			if (Object.prototype.hasOwnProperty.call(localOpdrachtData, key) && !localOpdrachtData[key]) {
				invalidFields[key] = true;
			} else {
				invalidFields[key] = false;
			}
		}

		if(localOpdrachtData.typeOpdracht.length === 0) {
			invalidFields.typeOpdrachten = true;
		} else {
			invalidFields.typeOpdrachten = false;
		}

		if(localOpdrachtData.startDatum === null) {
			invalidFields.startDatum = true;
		} else {
			invalidFields.startDatum = false;
		}

		if(localOpdrachtData.startDatum > localOpdrachtData.eindDatum) {
			invalidFields.startDatum = true;
			invalidFields.eindDatum = true;
		}

		validatePostcodes();

		if(invalidPostcodes.length !== 0 && !invalidPostcodes.includes("")) {
			invalidFields.postcode = true;
		}

		setIsInvalidFields(prevState => ({ ...prevState, ...invalidFields }));

		return Object.values(invalidFields).every(value => value === false);
	};

	const validatePostcodes = () => {
		const tempInvalidPostcodes = localOpdrachtData.postcode
			.map(postcode => postcode.replace(/\s/g, ""))
			.filter(postcode => !postcodeValidator(postcode, "NL"));

		setInvalidPostcodes(tempInvalidPostcodes);
	};
	
	const mapItemsToStrings = items => items.map(item => `${item.naam}`);

	const postcodeErrorText = `De volgende postcodes zijn ongeldig: ${invalidPostcodes.join(", ")}`;

	const handleAnnuleer = () => {
		navigate(-1);
	};

	useEffect(() => {
		const hasInvalidPostcodes = invalidPostcodes.length !== 0 && !invalidPostcodes.includes("");
		setIsInvalidFields(prevState => ({ ...prevState, postcode: hasInvalidPostcodes }));
	}, [invalidPostcodes]);

	return (
		<Form>
			<Container className="center-container">
				<h1 className="title">nieuwe opdracht aanmaken</h1>
				<Row className="justify-content-center">
					<Col md={{ span: 12, offset: 3 }}>
						
						<h1 className="text-center mb-4 header">Algemeen</h1>
						<div className="mb-3">
							<InputBar textPosition="left" label="Opdracht naam" type="text" placeholder="bijv. The Whites Website Accessibility" required={true} isInvalid={isInvalidFields.opdrachtNaam} handleChange={handleOpdrachtNaamChange}/>
							<InputBar textPosition="left" label="Opdracht omschrijving" type="textarea" placeholder="Dit dat" required={true} isInvalid={isInvalidFields.opdrachtOmschrijving} handleChange={handleOpdrachtOmschrijvingChange} />
							<InputBar textPosition="left" label="Locatie van opdracht" type="text" placeholder="Hoofdkantoor The Whites" required={true} isInvalid={isInvalidFields.locatie} handleChange={handleLocatieChange} />
							<InputBar textPosition="left" label="Beloning" type="text" placeholder="5 doezoe" handleChange={handleBeloningChange} />
						</div>
						<div className="mb-3">
							<MultiSelectionBar label="Type opdracht" buttonText="Selecteer type" items={mapItemsToStrings(typeOpdrachten)} isInvalid={isInvalidFields.typeOpdrachten} required={true} handleSelection={handleTypeSelection} />
						</div>
						<h1 className="text-center mb-3 header">Criteria</h1>
						<div className="mb-3" >
							<MultiSelectionBar label="Uitstellen op beperking" buttonText="Selecteer beperking" items={mapItemsToStrings(beperkingen)} handleSelection={handleBeperkingChange} />
						</div>
						<div className="mb-3" >
							<InputBar textPosition="left" label="Uitstellen op leeftijd" type="text" placeholder="bijv. 18" infoText="Je kan meerdere leeftijden invullen doormiddel van kommas zoals: 18, 20, 26 of 13-20 (dit is dan 13 tot en met 20)" handleChange={handleLeeftijdChange} />
							<InputBar textPosition="left" label="Postcode" type="text" placeholder="bijv. 1234AB" infoText="Je kan meerdere postcodes invullen doormiddel van een scheiding met een komma: 2554GW, 2551AB" errorMessage={postcodeErrorText} isInvalid={isInvalidFields.postcode} handleChange={handlePostcodeChange} />
						</div>
						<h1 className="text-center mb-3 header ">Datum</h1>
						<CustomDatePicker label="Start datum" required={true} isInvalid={isInvalidFields.startDatum} handleChange={handleStartDateChange} />
						<div className="mb-3" />
						<CustomDatePicker label="Eind datum" required={true} isInvalid={isInvalidFields.eindDatum} handleChange={handleEndDateChange}/>
					</Col>
				</Row>

				<div className="mb-3" />

				<Row className="justify-content-center mt-3">
					<Col md={4} className="text-start">
						<Button onClick={handleAnnuleer} variant="danger">Annuleren</Button>
					</Col>
					<Col md={2} className="text-end">
						<Button onClick={handleSubmit}>Maak opdracht aan</Button>
					</Col>
				</Row>
				<div className="mb-4" />
			</Container>
		</Form>
	);
};

export default NieuwOpdrachtForm;