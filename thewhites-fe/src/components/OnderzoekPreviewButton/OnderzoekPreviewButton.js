import React from "react";
import { Button, Row, Col } from "react-bootstrap";

import "./OnderzoekPreviewButton.css";

const OnderzoekPreviewButton = ({ titels, onderzoek }) => {
	const getDaysLeft = (date) => {
		const today = new Date();
		const goalDate = new Date(date);
		const daysLeft = Math.floor((goalDate - today) / (1000 * 60 * 60 * 24));
		return daysLeft ? daysLeft : null;
	};

	const formatDateText = (daysLeft) => {
		if(daysLeft === null) return null;
		switch(daysLeft) {
		case 0:
			return "vandaag";
		case 1:
			return "morgen";
		case -1:
			return "gisteren";
		default:
			return `${daysLeft > 0 ? `over ${daysLeft} dagen` : `${Math.abs(daysLeft)} dagen geleden`}`;
		}
	};
	
	const previewInfo = [
		<h1 key="titel">{onderzoek.titel}</h1>,
		formatDateText(getDaysLeft(onderzoek.startDatum)),
		formatDateText(getDaysLeft(onderzoek.eindDatum)),
		<Button key="button-onderzoek" variant="primary">Bekijk onderzoek</Button> 
	];
	return (
		<Row className="justify-content-center">
			{previewInfo.map((info, index) => (
				info === null ? // Show alleen wat er is gegeven
					"" 
					: 
					<Col key={index} xs={2} className="text-right">
						{info}
					</Col>
			))}
		</Row>
	);
};

export default OnderzoekPreviewButton;
