import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { formatDateText } from "../../util/Util";
import "./OnderzoekPreviewButton.css";

const OnderzoekPreviewButton = ({ onderzoek, handleClickButton }) => {
	const previewInfo = [
		<h1 key="titel">{onderzoek.titel}</h1>,
		formatDateText(onderzoek.startDatum),
		formatDateText(onderzoek.eindDatum),
		<Button onClick={() => handleClickButton(onderzoek.id)}key="button-onderzoek" variant="primary">Bekijk onderzoek</Button> 
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
