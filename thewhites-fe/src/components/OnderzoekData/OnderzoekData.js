import React, {useEffect, useState} from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import Countdown from "react-countdown";
import CountUp from "react-countup";

import "./OnderzoekData.css";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

const OnderzoekData = ({ onderzoek, aantalDeelnemers}) => {
	const [showStartdatum, setShowStartDatum] = useState(true);

	const renderer = ({ days, hours, minutes, seconds, completed }) => {
		if (completed) {
			return showStartdatum ? "begonnen" : "Afgelopen";
		} else {
			return (
				<div>
					{days}d {hours}u {minutes}m {seconds}s
				</div>
			);
		}
	};

	useEffect(() => {
		if (onderzoek !== null) { // Show start datum als het nog niet begonnen is, anders eind datum 
			if (new Date(onderzoek.startDatum) < Date.now()) {
				setShowStartDatum(false);
			} else {
				setShowStartDatum(true);
			}
		}
	}, [onderzoek]);
      
	return (
		<>
			{onderzoek !== null ? (
				<>
					<Container>
						<Row>
							<h1 className="titel">{onderzoek.opdrachtNaam}</h1>
						</Row>
						<Row className="data-row-numbers">
							<Col><h2><CountUp start={0} end={aantalDeelnemers} duration={2.5} /></h2></Col>
							<Col><h2>0</h2></Col>
							<Col>
								<h2>
									<Countdown 
										key={showStartdatum ? onderzoek.startDatum : onderzoek.eindDatum} // key nodig om rerender te forceren
										date={showStartdatum ? onderzoek.startDatum : onderzoek.eindDatum}
										renderer={renderer}
									/>
								</h2>
							</Col>
						</Row>
						<Row className="data-row-text">
							<Col><h3>deelnemers</h3></Col>
							<Col><h3>drollen</h3></Col>
							<Col><h3>{new Date() < new Date(onderzoek.eindDatum) ? `voor het ${showStartdatum ? "begint" : "eindigt"}` : ""}</h3></Col>
						</Row>
						<Row className="data-row-buttons">
							<Col><Button>Bekijk deelnemers</Button></Col>
							<Col />
							<Col><Button>Wijzig onderzoek</Button></Col>
						</Row>
					</Container>
				</>
			) 
				: 
				<LoadingAnimation />}
		</>
	);
};

export default OnderzoekData;
