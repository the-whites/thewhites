// MultiSelectionBar.js

import React, { useEffect, useState } from "react";
import { Dropdown, Badge, CloseButton, Container, Row, Col } from "react-bootstrap";
import { IoIosCheckmarkCircle } from "react-icons/io";

import "../MainStyles.css";
import "./MultiSelectionBar.css";

// alreadySelectedItems kan nog veranderd worden naar een array met objecten met een selected boolean en name string, maar kan voor nu gewoon zo
const MultiSelectionBar = ({ label = "Maak een keuze", buttonText = "Kies", items, required = false, handleSelection = () => {}, isInvalid = false }) => {
	const [selectedItems, setSelectedItems] = useState([]); 

	const selectItem = (option) => { 
		if (selectedItems.includes(option)) { 
			removeItem(option);
		} else { 
			setSelectedItems([...selectedItems, option]); 
		} 
	};

	const removeItem = (option) => { 
		setSelectedItems(selectedItems.filter((item) => item !== option)); 
	};

	useEffect(() => {
		handleSelection(selectedItems);
	}, [selectedItems]); 

	return (
		<Container fluid className={`justify-content-start ${isInvalid ? "is-invalid" : ""}`}>
			<Row>
				<Col xs={2}></Col>
				<Col xs={4} className="col-align-left">
					{selectedItems ? (
						selectedItems.map((option, index) => (
							<Badge key={index} bg="grey" className="selection-badge text-dark d-flex justify-content-between">
								{option}
								<CloseButton onClick={() => removeItem(option)}/>
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
							{items.map((option, index) => (
								<Dropdown.Item
									key={index}
									onClick={() => selectItem(option)}
									className={`d-flex justify-content-between dropdown-item ${index % 2 === 0 ? "" : "bg-grey"}`} 
								>
									{option}
									{selectedItems.includes(option) ? 
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
