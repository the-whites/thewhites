import React from "react";
import { Button, Row, Col } from "react-bootstrap";

import "./OnderzoekPreviewButton.css";

const OnderzoekPreviewButton = ({ onderzoek }) => {
	const previewInfo = [
		{ content: <h1>{onderzoek.titel}</h1> },
		{ content: "5 deelnemers" },
		{ content: "over 5 dagen" },
		{ content: "over 2 dagen" },
		{ content: <Button variant="primary">Bekijk onderzoek</Button> },
	];

	return (
		<Row className="justify-content-center">
			{previewInfo.map((col, index) => (
				<Col key={index} xs={2} className="text-right">
					{col.content}
				</Col>
			))}
		</Row>
	);
};

export default OnderzoekPreviewButton;
