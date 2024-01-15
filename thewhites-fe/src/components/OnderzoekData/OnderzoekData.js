import React, {useEffect, useState} from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import Countdown from "react-countdown";
import CountUp from "react-countup";

import "./OnderzoekData.css";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import { useNavigate } from "react-router-dom";
import { ONDERZOEK_DATA } from "../../constants/onderzoekData";

const OnderzoekData = ({ onderzoek, aantalDeelnemers}) => {
	const [showStartdatum, setShowStartDatum] = useState(true);

	const navigate = useNavigate();

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
			if (new Date(onderzoek[ONDERZOEK_DATA.START_DATUM]) < Date.now()) {
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
							<h1 className="titel">{onderzoek.onderzoekNaam}</h1>
						</Row>
						<Row className="data-row-numbers">
							<Col><h2><CountUp start={0} end={aantalDeelnemers} duration={2.5} /></h2></Col>
							<Col><h2>{onderzoek[ONDERZOEK_DATA.NAAM]}</h2></Col>
							<Col>
								<h2>
									<Countdown 
										key={showStartdatum ? onderzoek[ONDERZOEK_DATA.START_DATUM] : onderzoek[ONDERZOEK_DATA.EIND_DATUM]} // key nodig om rerender te forceren
										date={showStartdatum ? onderzoek[ONDERZOEK_DATA.START_DATUM] : onderzoek[ONDERZOEK_DATA.EIND_DATUM]}
										renderer={renderer}
									/>
								</h2>
							</Col>
						</Row>
						<Row>
							<Col><h3>deelnemers</h3></Col>
							<Col><h3>gemaakt op (datum)</h3></Col>
							<Col><h3>{new Date() < new Date(onderzoek[ONDERZOEK_DATA.EIND_DATUM]) ? `voor het ${showStartdatum ? "begint" : "eindigt"}` : ""}</h3></Col>
						</Row>
						<Row className="data-row-buttons">
							<Col><Button>Bekijk deelnemers</Button></Col>
							<Col />
							<Col>
								<Button onClick={() => navigate(`/bedrijf/onderzoeken/wijzig/${onderzoek[ONDERZOEK_DATA.ID]}`)}>
									Wijzig onderzoek
								</Button>
							</Col>
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
