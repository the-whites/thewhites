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
	const toggleSort = (info) => {
		setTitleSort((prevtitleSort) =>
			prevtitleSort.map((titleSort) => ({
				...titleSort,
				sorted: info === titleSort ? !titleSort.sorted : false,
			}))
		);
	};

	const sortEindDatum = () => {
		setOnderzoeken((prevOnderzoeken) => 
			titleSort[2].sorted
				? prevOnderzoeken.sort((a, b) => a.eindDatum.getTime()- b.eindDatum.getTime())
				: prevOnderzoeken.sort((a, b) => b.eindDatum.getTime()- a.eindDatum.getTime())
		);
	};

	const sortStartDatum = () => {
		setOnderzoeken((prevOnderzoeken) => 
			titleSort[1].sorted
				? prevOnderzoeken.sort((a, b) => a.startDatum.getTime()- b.startDatum.getTime())
				: prevOnderzoeken.sort((a, b) => b.startDatum.getTime()- a.startDatum.getTime())
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
		sortStartDatum();
	}, [titleSort[1].sorted]);

	useEffect(() => {
		sortEindDatum();
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
