// MultiSelectionBar.js

import React, { useEffect, useState } from "react";
import { Dropdown, Badge, CloseButton, Container, Row, Col } from "react-bootstrap";
import { IoIosCheckmarkCircle } from "react-icons/io";

import "../MainStyles.css";
import "./MultiSelectionBar.css";

const MultiSelectionBar = ({ 
	label = "Maak een keuze", 
	buttonText = "Kies", 
	items, 
	initialSelectedItems = [],
	required = false, 
	handleSelection = () => {}, 
	getKey = (option) => items.indexOf(option), 
	getValue = (option) => option,
	isInvalid = false
}) => {
	const [selectedItems, setSelectedItems] = useState(() => initialSelectedItems);

	// calledFromJSX = true wanneer je bijvoorbeeld onClick(() => selectItem()) doet. 
	// Dit is er om initialSelectedItems niet meteen weer leeg te halen als de component 2 keer achter elkaar rendert.
	const selectItem = (key, calledFromJSX = false) => { 
		if (selectedItems.find((x) => getKey(x) == key)) {
			if (calledFromJSX) 
				removeItem(key);
		} else { 
			var item = items.find(x => getKey(x) == key);
			
			if (!item)
				return console.log("couldn't select item with key " + key);

			console.log("setting");

			setSelectedItems([...selectedItems, item]); 
		} 
	};

	const removeItem = (key) => setSelectedItems(selectedItems.filter((item) => getKey(item) != key));

	useEffect(() => {
		console.log("test' : " + JSON.stringify(initialSelectedItems));
		setSelectedItems(initialSelectedItems);
	}, []);

	useEffect(() => {
		handleSelection(selectedItems);
	}, [selectedItems]); 

	return (
		<Container fluid className={`justify-content-start ${isInvalid ? "is-invalid" : ""}`}>
			<Row>
				<Col xs={2}></Col>
				<Col xs={4} className="col-align-left">
					{selectedItems ? (
						selectedItems.map((option) => (
							<Badge key={getKey(option)} bg="grey" className="selection-badge text-dark d-flex justify-content-between">
								{getValue(option)}
								<CloseButton onClick={() => removeItem(getKey(option))}/>
							</Badge>
						))
					) : (
						""
					)}
				</Col>
			</Row>
			<Row className="g-2">
				<Col xs={2}>
					<p className="label">{label} {required && "*"}</p>
				</Col>
				<Col xs={6}>
					<Dropdown className="w-100">
						<Dropdown.Toggle variant={isInvalid ? "danger" : "success"} className="dropdown-button-w" id="dropdown-basic">
							{buttonText}
						</Dropdown.Toggle>
						<Dropdown.Menu className="dropdown-menu">
							{items && items.map((option, index) => (
								<Dropdown.Item
									key={getKey(option)}
									onClick={() => selectItem(getKey(option), true)}
									className={`d-flex justify-content-between dropdown-item ${index % 2 === 0 ? "" : "bg-grey"}`} 
								>
									{getValue(option)}
									{selectedItems.find((item) => getKey(option) == getKey(item)) ? 
										(<span className="ms-auto">
											<IoIosCheckmarkCircle className="checkmark"/>
										</span>)
										:
										""
									}
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>
					{isInvalid && <p className="invalid-text">Het is verplicht om een {label.toLowerCase()} te selecteren</p>}
				</Col>
			</Row>
		</Container>
	);
};

export default MultiSelectionBar;
