import React, { useEffect, useState, useContext } from "react";
import OnderzoekPreviewButton from "../../../../components/OnderzoekPreviewButton/OnderzoekPreviewButton";
import { Row, Col, Button } from "react-bootstrap";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { fetchApi } from "../../../../hooks/useApi";
import { UserContext } from "../../../../contexts/UserProvider";

import "./LopendeOpdrachten.css";

const LopendeOpdrachten = () => {
	const [titleSort, setTitleSort] = useState([
		{ title: "Onderzoek", sorted: false },
		{ title: "Start datum", sorted: false },
		{ title: "Eind datum", sorted: false },
	]);

	const [onderzoeken, setOnderzoeken] = useState([]);
	const { userId } = useContext(UserContext);

	const fetchOnderzoeken = async () => {
		console.log(userId);
		try {
			const response = await fetchApi({route: `api/onderzoek/onderzoeken/${userId}`});
			
			if (response.status === 200) {
				const onderzoekenData = response.data.map(({ id, titel, startDatum, eindDatum }) => ({ id, titel, startDatum: new Date(startDatum), eindDatum: new Date(eindDatum)}));
				setOnderzoeken(onderzoekenData);
			} else {
				console.error(`Error fetching data. Status: ${response.status}`);
			}
		} catch (error) {
			console.error(`Error trying to fetch the data: ${error}`);
		}
	};

	useEffect(() => {
		fetchOnderzoeken();
	}, []);

	// TODO: refactor deze shit code
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
	

	return (
		<>
			{onderzoeken.length === 0 ? (
				<h1>Geen lopende opdrachten</h1>
			) : (
				<>
					<h1>Lopende opdrachten</h1>
					<Row className="justify-content-center">
						{titleSort.map((info, index) => (
							<Col key={index} xs={2} className="text-right">
								<h1>{info.title} {info.sorted} {info.sorted ? <FaArrowUp onClick={() => toggleSort(info)}/> : <FaArrowDown onClick={() => toggleSort(info)}/>}</h1>
							</Col>
						))}
						<Col xs={2} /> 
					</Row>
					{onderzoeken.map(onderzoek => (
						<div className="m-4" key={onderzoek.id}>
							<OnderzoekPreviewButton key={onderzoek.id} onderzoek={onderzoek} />
						</div>
					))}
				</>
			)}
		</>
	); 
};

export default LopendeOpdrachten;
