import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import OnderzoekPreviewButton from "../OnderzoekPreviewButton/OnderzoekPreviewButton";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import MultiSelectionBar from "../MultiSelectionBar/MultiSelectionBar";
import InputBar from "../Inputbar/InputBar";

import "./OnderzoekLijst.css";

const OnderzoekLijst = ({ onderzoekLijst, handleClickButton }) => {
	const [onderzoeken, setOnderzoeken] = useState(onderzoekLijst);
	const [onderzoekenShown, setOnderzoekenShown] = useState(onderzoeken);

	// Standaard titels, kan dit ook als een prop doorgeven, maar niet nodig op dit moment
	const [titleSort, setTitleSort] = useState([
		{ title: "Onderzoek", sorted: false },
		{ title: "Start datum", sorted: false },
		{ title: "Eind datum", sorted: false },
	]);

	// TODO: REFACTOR SHIT CODE
	const sortByProperty = (property, isAscending) => (a, b) => {
		const valueA = a[property];
		const valueB = b[property];
 
		if (typeof valueA === "string" && typeof valueB === "string") {
			return isAscending ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
		}
	
		return isAscending ? valueA - valueB : valueB - valueA;
	};
	
	const sortOnderzoeken = (property, isAscending) => {
		setOnderzoeken((prevOnderzoeken) => [
			...prevOnderzoeken.sort(sortByProperty(property, isAscending)),
		]);
	};
	
	const toggleSort = (index) => {
		setTitleSort((prevTitleSort) =>
			prevTitleSort.map((titleSort, i) => ({
				...titleSort,
				sorted: index === i ? !titleSort.sorted : false,
			}))
		);
	};
	
	useEffect(() => {
		sortOnderzoeken("titel", titleSort[0].sorted);
	}, [titleSort[0].sorted]);
 
	useEffect(() => {
		sortOnderzoeken("startDatum", titleSort[1].sorted);
	}, [titleSort[1].sorted]);
	
	useEffect(() => {
		sortOnderzoeken("eindDatum", titleSort[2].sorted);
	}, [titleSort[2].sorted]);
 

	const handleButton= (id) => {
		handleClickButton(id);
	};

	const handleZoekButton = (zoekTerm) => {
		setOnderzoekenShown(onderzoekLijst.filter(onderzoek => onderzoek.titel.toLowerCase().includes(zoekTerm.toLowerCase())));
	};
    
	return (
		<>
			<Row className="justify-content-center">
				{titleSort.map((info, index) => (
					<Col key={index} xs={2} className="text-right">
						<h1>{info.title} {info.sorted} {info.sorted ? <FaArrowUp onClick={() => toggleSort(info)}/> : <FaArrowDown onClick={() => toggleSort(info)}/>}</h1>
					</Col>
				))}
				<Col xs={2}>
					<div className="zoek-button">
						<InputBar placeholder="zoek op titel" handleChange={handleZoekButton}/>
					</div>
				</Col>
			</Row>

			{onderzoekenShown.length === 0 ? 
				"Geen onderzoeken gevonden" 
				: 
				onderzoekenShown.map(onderzoek => (
					<div className="m-4" key={onderzoek.id}>
						<OnderzoekPreviewButton handleClickButton={handleButton} onderzoek={onderzoek} />
					</div>
				))}
		</>
	);
};

export default OnderzoekLijst;
