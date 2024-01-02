import React, { useEffect, useState } from "react";
import { Dropdown, Badge, CloseButton, Container, Row, Col } from "react-bootstrap";
import { IoIosCheckmarkCircle } from "react-icons/io";

import "./MultiSelectionBar.css";

const MultiSelectionBar = ({ label = "Maak een keuze", buttonText = "Kies", items, handleSelection = () => {}}) => {
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
		<Container fluid className="justify-content-start">
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
						"none"
					)}
				</Col>
			</Row>
			<Row className="g-2">
				<Col xs={2}>
					<p>{label}</p>
				</Col>
				<Col xs={1}>
					<Dropdown className="w-100">
						<Dropdown.Toggle variant="success" id="dropdown-basic">
							{buttonText}
						</Dropdown.Toggle>
						<Dropdown.Menu className="dropdown-menu">
							{items.map((option, index) => (
								<Dropdown.Item
									key={index}
									onClick={() => selectItem(option)}
									bg="blue"
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
				</Col>
			</Row>
		</Container>
	);
};

export default MultiSelectionBar;