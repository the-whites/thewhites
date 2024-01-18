import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import OnderzoekPreviewButton from "../OnderzoekPreviewButton/OnderzoekPreviewButton";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
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
	
	const toggleSort = (info) => {
		setTitleSort((prevtitleSort) =>
			prevtitleSort.map((titleSort) => ({
				...titleSort,
				sorted: info === titleSort ? !titleSort.sorted : false,
			}))
		);
	};
	
	const sortData = (property, sortOrder) => {
		setOnderzoeken((prevOnderzoeken) =>
			sortOrder
				? prevOnderzoeken.sort((a, b) => (a[property] > b[property] ? 1 : -1))
				: prevOnderzoeken.sort((a, b) => (b[property] > a[property] ? 1 : -1))
		);
	};

	const sortTitel = () => {
		setOnderzoeken((prevOnderzoeken) => 
			titleSort[0].sorted
				? prevOnderzoeken.sort((a, b) => a.titel.localeCompare(b.titel))
				: prevOnderzoeken.sort((a, b) => b.titel.localeCompare(a.titel))
		);
	};

	useEffect(() => {
		sortTitel();
	}, [titleSort[0].sorted]);
 
	useEffect(() => {
		sortData("startDatum", titleSort[1].sorted);
	}, [titleSort[1].sorted]);
	
	useEffect(() => {
		sortData("eindDatum", titleSort[2].sorted);
	}, [titleSort[2].sorted]);


	const handleZoekButton = (zoekTerm) => {
		setOnderzoekenShown(onderzoekLijst.filter(onderzoek => onderzoek.titel.toLowerCase().includes(zoekTerm.toLowerCase())));
	};
    
	return (
		<>
			<Row className="justify-content-center">
				{titleSort.map((info, index) => (
					<Col key={index} xs={2} className="text-right">
						<h3>{info.title} {info.sorted} {info.sorted ? <FaArrowUp onClick={() => toggleSort(info)}/> : <FaArrowDown onClick={() => toggleSort(info)}/>}</h3>
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
						<OnderzoekPreviewButton handleClickButton={(id) => handleClickButton(id)} onderzoek={onderzoek} />
					</div>
				))}
		</>
	);
};

export default OnderzoekLijst;
