import React, { useEffect, useState, useContext } from "react";
import OnderzoekPreviewButton from "../../../../components/OnderzoekPreviewButton/OnderzoekPreviewButton";
import { Row, Col } from "react-bootstrap";
import { fetchApi } from "../../../../hooks/useApi";
import { UserContext } from "../../../../contexts/UserProvider";

import "./LopendeOpdrachten.css";

const LopendeOpdrachten = () => {
	const [onderzoeken, setOnderzoeken] = useState([]);
	const { userId } = useContext(UserContext);

	const fetchOnderzoeken = async () => {
		console.log(userId);
		try {
			const response = await fetchApi({route: `api/onderzoek/onderzoeken/${userId}`});
			
			if (response.status === 200) {
				const onderzoekenData = response.data.map(({ id, titel }) => ({ id, titel }));
				setOnderzoeken(onderzoekenData);
			} else {
				console.error(`Error fetching data. Status: ${response.status}`);
				return [];
			}
		} catch (error) {
			console.error("Error fetching data:", error);
			return [];
		}
	};

	useEffect(() => {
		fetchOnderzoeken();
	}, []);
	
	return (
		<>
			<h1>lopende opdrachten</h1>
			<Row className="justify-content-center">
				<Col xs={4}>
					<h1>Onderzoek</h1>
				</Col>
				<Col xs={4} />
			</Row>
			{onderzoeken.map(onderzoek => (
				<div className="m-4" key={onderzoek.id}>
					<OnderzoekPreviewButton key={onderzoek.id} onderzoek={onderzoek} />
				</div>
			))}
		</>
	);
};

export default LopendeOpdrachten;
