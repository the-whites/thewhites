import React, { useState, useEffect } from "react";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import InputBar from "../Inputbar/InputBar";
import CustomDatePicker from "../CustomDatePicker/CustomDatePicker";
import MultiSelectionBar from "../MultiSelectionBar/MultiSelectionBar";
import { postcodeValidator } from "postcode-validator";
import { useNavigate } from "react-router-dom";
import { ONDERZOEK_DATA, initialOnderzoekState } from "../../constants/onderzoekData";

const mapItemsToStrings = items => items.map(item => item.naam);

const getIdByNaam = (naam, data) => {
	const foundItem = data.find(item => item.naam === naam);
	return foundItem ? foundItem.id : null;
};

const NieuwOnderzoekForm = ({ handleOnderzoekDataChange, beperkingen, typeOnderzoeken, onderzoek, buttonConfirmText = "Maak onderzoek aan"}) => {
	const [localOnderzoekData, setLocalOnderzoekData] = useState(initialOnderzoekState);
	const [leeftijden, setLeeftijden] = useState([]); // Leeftijd wordt ook gehandeld in localOnderzoekData, deze useState is alleen voor visualisatie
	const [postcodes, setPostcodes] = useState([]); // zelfde als leeftijd usestate basically

	const [invalidPostcodes, setInvalidPostcodes] = useState([]);

	// Dit zijn de verplichte velden die ingevuld moeten worden
	const [isInvalidFields, setIsInvalidFields] = useState({
		[ONDERZOEK_DATA.NAAM]: false,
		[ONDERZOEK_DATA.OMSCHRIJVING]: false,
		[ONDERZOEK_DATA.INHOUD]: false,
		[ONDERZOEK_DATA.LOCATIE]: false,
		[ONDERZOEK_DATA.TYPE_ONDERZOEK]: false,
		[ONDERZOEK_DATA.LEEFTIJD]: false,
		[ONDERZOEK_DATA.START_DATUM]: false,
		[ONDERZOEK_DATA.EIND_DATUM]: false,
	});

	const navigate = useNavigate();

	const parseLeeftijd = (part) => {
		const trimmedPart = part.trim();
	
		if (trimmedPart.includes("-")) {
			// Leeftijd ranges 
			const [start, end] = trimmedPart.split("-").map(Number);
			const minLeeftijd = isNaN(start) || start === 0 ? end : Math.min(start, end);
			const maxLeeftijd = isNaN(end) || end === 0 ? minLeeftijd : Math.max(start, end);
	
			return (isNaN(minLeeftijd) && isNaN(maxLeeftijd) || (minLeeftijd === 0 && maxLeeftijd === 0)) ? null : [minLeeftijd, maxLeeftijd];
		} else {
			// Individuele leeftijd
			const age = parseInt(trimmedPart);
	
			return !isNaN(age) ? [age, age] : null;
		}
	};

	const handleTypeSelection = (items) => {
		if(items) {
			// Pak alleen de nummer uit de string oftewel de ID
			const ids = items.map(naam => getIdByNaam(naam, typeOnderzoeken));
			setLocalOnderzoekData(prevState => ({...prevState, [ONDERZOEK_DATA.TYPE_ONDERZOEK]: ids }));
		}
	};
   
	const handleBeperkingChange = (items) => {
		if(items) {
			const ids = items.map(naam => getIdByNaam(naam, beperkingen));
			setLocalOnderzoekData(prevState => ({...prevState, [ONDERZOEK_DATA.BEPERKING]: ids }));
		}
	};
	
	const handleLeeftijdChange = (value) => {
		const leeftijdParts = value.split(",");

		const leeftijdenData = leeftijdParts
			.map(parseLeeftijd)
			.filter((leeftijdCriteria) => leeftijdCriteria !== null);

		console.log(leeftijdenData);

		setLeeftijden([value]);
		setLocalOnderzoekData((prevState) => ({ ...prevState, leeftijd: leeftijdenData }));
	};
	
	const handlePostcodeChange = (value) => {
		setPostcodes(value);
		let postcoden = [];

		if (value.includes(",")) {
			postcoden = value.split(",").map(postcode => postcode.trim());
		} else {
			if(value.trim !== "") {
				postcoden.push(value.trim());
			}
		}

		setLocalOnderzoekData(prevState => ({...prevState, postcode: postcoden }));

		setInvalidPostcodes(() => postcoden
			.map(postcode => postcode.replace(" ", ""))
			.filter(postcode => !postcodeValidator(postcode, "NL")));		
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const valid = validateOnderzoekData();

		if(valid) {
			handleOnderzoekDataChange(localOnderzoekData);
		}
			
	};

	const validateOnderzoekData = () => {
		const invalidFields = {};

		for (const key in isInvalidFields) {
			if (localOnderzoekData[key] === null || localOnderzoekData[key] === "" || localOnderzoekData[key] === undefined) {
				invalidFields[key] = true;
			} else {
				invalidFields[key] = false;
			}
		}

		if(localOnderzoekData[ONDERZOEK_DATA.TYPE_ONDERZOEK].length === 0) {
			invalidFields[ONDERZOEK_DATA.TYPE_ONDERZOEK] = true;
		} else {
			invalidFields[ONDERZOEK_DATA.TYPE_ONDERZOEK]= false;
		}

		if(localOnderzoekData[ONDERZOEK_DATA.START_DATUM] === null) {
			invalidFields[ONDERZOEK_DATA.START_DATUM] = true;
		} else {
			invalidFields[ONDERZOEK_DATA.START_DATUM] = false;
		}

		if(localOnderzoekData[ONDERZOEK_DATA.START_DATUM] > localOnderzoekData[ONDERZOEK_DATA.EIND_DATUM]) {
			invalidFields[ONDERZOEK_DATA.START_DATUM] = true;
			invalidFields[ONDERZOEK_DATA.EIND_DATUM] = true;
		}

		localOnderzoekData[ONDERZOEK_DATA.LEEFTIJD].forEach(leeftijdMinMax => {
			if(leeftijdMinMax[0] > leeftijdMinMax[1])
				invalidFields[ONDERZOEK_DATA.LEEFTIJD] = true;
		});

		if(invalidPostcodes.length !== 0 && !invalidPostcodes.includes("")) {
			invalidFields[ONDERZOEK_DATA.POSTCODE] = true;
		}

		setIsInvalidFields(({ ...isInvalidFields, ...invalidFields }));
		return Object.values(invalidFields).every(value => value === false);
	};

	useEffect(() => {

	}, [invalidPostcodes]);

	useEffect(() => {
		if(onderzoek) {
			setLocalOnderzoekData(onderzoek);

			if(onderzoek[ONDERZOEK_DATA.LEEFTIJD]) {
				const leeftijdOnderzoek = onderzoek[ONDERZOEK_DATA.LEEFTIJD].map(l =>
					l.minLeeftijd === l.maxLeeftijd ? `${l.minLeeftijd}` : `${l.minLeeftijd}-${l.maxLeeftijd}`).join(", ");
				handleLeeftijdChange(leeftijdOnderzoek);
			}

			if(onderzoek[ONDERZOEK_DATA.POSTCODE]) {
				const postcodes = onderzoek[ONDERZOEK_DATA.POSTCODE].map(postcode => postcode.postcode);
				handlePostcodeChange(postcodes.toString());
			}

			if(onderzoek[ONDERZOEK_DATA.TYPE_ONDERZOEK]) {
				setLocalOnderzoekData(prevState => ({ ...prevState, [ONDERZOEK_DATA.TYPE_ONDERZOEK]: onderzoek[ONDERZOEK_DATA.TYPE_ONDERZOEK].map(type => type.id) }));
			}

			if(onderzoek[ONDERZOEK_DATA.BEPERKING]) {
				setLocalOnderzoekData(prevState => ({ ...prevState, [ONDERZOEK_DATA.BEPERKING]: onderzoek[ONDERZOEK_DATA.BEPERKING].map(type => type.id) }));
			}
		}
	}, [onderzoek]);

	const postcodeErrorText = `De volgende postcodes zijn ongeldig: ${invalidPostcodes.join(", ")}`;

	return (
		<Form>
			<Container className="center-container">
				<Row className="justify-content-center">
					<Col md={{ span: 12, offset: 3 }}>
						
						<h2 className="text-center mb-4 header">Algemeen</h2>
						<div className="mb-3">
							<InputBar 
								label="Onderzoek naam" 
								placeholder="Naam van de onderzoek" 
								required={true} 
								value={localOnderzoekData[ONDERZOEK_DATA.NAAM]} 
								isInvalid={isInvalidFields[ONDERZOEK_DATA.NAAM]} 
								handleChange={(value) => setLocalOnderzoekData(({ ...localOnderzoekData, [ONDERZOEK_DATA.NAAM]: value }))} />
							<InputBar 
								label="Onderzoek omschrijving" 
								type="textarea" 
								placeholder="Beschrijf kort wat het doel van de onderzoek is" 
								required={true} 
								value={localOnderzoekData[ONDERZOEK_DATA.OMSCHRIJVING]} 
								isInvalid={isInvalidFields[ONDERZOEK_DATA.OMSCHRIJVING]}
								handleChange={(value) => setLocalOnderzoekData(({ ...localOnderzoekData, [ONDERZOEK_DATA.OMSCHRIJVING]: value }))} />
							<InputBar 
								label="Onderzoek inhoud" 
								type="textarea" 
								placeholder="Leg duidelijk uit wat de deelnemers moeten doen eventueel met een stappenplan" 
								required={true} 
								value={localOnderzoekData[ONDERZOEK_DATA.INHOUD]} 
								isInvalid={isInvalidFields[ONDERZOEK_DATA.INHOUD]}
								handleChange={(value) => setLocalOnderzoekData(({ ...localOnderzoekData, [ONDERZOEK_DATA.INHOUD]: value }))} />
							<InputBar 
								label="Locatie van onderzoek" 
								placeholder="Vul hier de locatie in waar de onderzoek uitgevoerd moet worden" 
								required={true}
								value={localOnderzoekData[ONDERZOEK_DATA.LOCATIE]} 
								isInvalid={isInvalidFields[ONDERZOEK_DATA.LOCATIE]} 
								handleChange={(value) => setLocalOnderzoekData(({ ...localOnderzoekData, [ONDERZOEK_DATA.LOCATIE]: value }))} />
							<InputBar 
								label="Beloning" 
								value={localOnderzoekData[ONDERZOEK_DATA.BELONING]}
								placeholder="Vul hier de beloning in die de deelnemers krijgen voor het uitvoeren van de onderzoek" 
								handleChange={(value) => setLocalOnderzoekData(({ ...localOnderzoekData, [ONDERZOEK_DATA.BELONING]: value }))} />
						</div>
						<div className="mb-3">
							<MultiSelectionBar 
								label="Type onderzoek" 
								buttonText="Selecteer type" 
								items={typeOnderzoeken ? mapItemsToStrings(typeOnderzoeken) : []} 
								initialSelectedItems={onderzoek && mapItemsToStrings(onderzoek[ONDERZOEK_DATA.TYPE_ONDERZOEK])}
								getKey={(option) => option.toString()} 
								isInvalid={isInvalidFields[ONDERZOEK_DATA.TYPE_ONDERZOEK]} 
								required={true} 
								handleSelection={handleTypeSelection} />
						</div>
						<h2 className="text-center mb-3 header">Criteria</h2>
						<div className="mb-3" >
							<MultiSelectionBar 
								label="Uitstellen op beperking" 
								buttonText="Selecteer beperking" 
								items={beperkingen ? mapItemsToStrings(beperkingen) : []} 
								getKey={(option) => option.toString()} 
								initialSelectedItems={onderzoek && mapItemsToStrings(onderzoek[ONDERZOEK_DATA.BEPERKING])}
								handleSelection={handleBeperkingChange} />
						</div>
						<div className="mb-3" >
							<InputBar 
								label="Uitstellen op leeftijd" 
								value={leeftijden}
								placeholder="Vul hier de leeftijd(en) in die in aanmerking kunnen komen voor deze onderzoek" 
								infoText="Je kan meerdere leeftijden invullen doormiddel van kommas zoals: 18, 20, 26 of 13-20 (dit is dan 13 tot en met 20)" 
								errorMessage="Er is een leeftijd criteria onjuist ingevuld"
								isInvalid={isInvalidFields[ONDERZOEK_DATA.LEEFTIJD]}
								handleChange={handleLeeftijdChange} />
							<InputBar 
								label="Postcode"
								value={postcodes}
								placeholder="Vul hier de postcode(s) in die in aanmerking kunnen komen voor deze onderzoek" 
								infoText="Je kan meerdere postcodes invullen doormiddel van een scheiding met een komma: 2554GW, 2551AB" 
								errorMessage={postcodeErrorText} 
								isInvalid={isInvalidFields[ONDERZOEK_DATA.POSTCODE]} 
								handleChange={handlePostcodeChange} />
						</div>
						<h2 className="text-center mb-3 header ">Datum</h2>
						<CustomDatePicker 
							label="Start datum" 
							required={true} 
							value={onderzoek && onderzoek[ONDERZOEK_DATA.START_DATUM]}
							isInvalid={isInvalidFields[ONDERZOEK_DATA.START_DATUM]} 
							handleChange={(value) => setLocalOnderzoekData(({ ...localOnderzoekData, [ONDERZOEK_DATA.START_DATUM]: value }))} />
						<div className="mb-3" />
						<CustomDatePicker 
							label="Eind datum" 
							value={onderzoek && onderzoek[ONDERZOEK_DATA.EIND_DATUM]}
							required={true} 
							isInvalid={isInvalidFields[ONDERZOEK_DATA.EIND_DATUM]} 
							handleChange={(value) => setLocalOnderzoekData(({ ...localOnderzoekData, [ONDERZOEK_DATA.EIND_DATUM]: value }))}/>
					</Col>
				</Row>

				<div className="mb-3" />

				<Row className="justify-content-center mt-3">
					<Col md={4} className="text-start">
						<Button onClick={() => navigate(-1)} variant="outline-danger">Terug</Button>
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

export default NieuwOnderzoekForm;