import React, {useEffect, useState} from "react";
import { Row, Col, Container, Button, Card } from "react-bootstrap";
import Countdown from "react-countdown";
import CountUp from "react-countup";

import "./OnderzoekData.css";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import { useNavigate } from "react-router-dom";
import { ONDERZOEK_DATA } from "../../constants/onderzoekData";
import { getFormattedDateLocale } from "../../util/Util";
import { fetchApi } from "../../hooks/useApi";

const OnderzoekData = ({ onderzoek, aantalDeelnemers}) => {
	const [showStartdatum, setShowStartDatum] = useState(true);
	const [onderzoekBekijken, setOnderzoekBekijken] = useState(false);
	const [deelnemers, setDeelnemers] = useState([]);

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

	

	const handleDeelnemers = async () => {
		const deelnemers = await fetchApi({route: "api/onderzoek/"+onderzoek[ONDERZOEK_DATA.ID]+"/deelnemers"});
		if (deelnemers.status === 200) {
			console.log(deelnemers.data);
			setDeelnemers(deelnemers.data);
			setOnderzoekBekijken(true);
		} else {
			console.log(`Fout bij het ophalen van gegevens. Status: ${deelnemers.status}`);
		}
	};


	return (
		<>
			<Container>
				{onderzoekBekijken && (
					deelnemers.map((deskundige) => (
						<Card key={deskundige.deelname.ervaringsdeskundige.id}>
							<div  className="deskundige-container">
								<div className="deskundige-veld"><strong>Naam:</strong> {deskundige.voornaam}</div>
								<div className="deskundige-veld"><strong>Postcode:</strong> {deskundige.deelname.ervaringsdeskundige.postcode}</div>
								<div className="deskundige-veld"><strong>Telefoonnummer:</strong> {deskundige.deelname.ervaringsdeskundige.telefoonnummer}</div>
								<div className="deskundige-veld"><strong>Hulpmiddel:</strong> {deskundige.deelname.ervaringsdeskundige.hulpmiddel}</div>
								<div className="deskundige-veld"><strong>Ziekte:</strong> {deskundige.deelname.ervaringsdeskundige.ziekte}</div>
								<div className="deskundige-veld"><strong>Beschikbaarheid:</strong> {deskundige.deelname.ervaringsdeskundige.beschikbaarheid}</div>
								<div className="deskundige-veld">
									<strong>Beperkingen:</strong>{deskundige.beperking.map((beperkingItem, index) => (
										<span key={index}>{beperkingItem}{index < deskundige.beperking.length - 1 ? ", " : ""}</span>))}
								</div>
								<strong className="deskundige-veld">Voorkeur benadering portaal:</strong> {deskundige.voorkeur.portaal ? "ja" : "nee"}
								<strong className="deskundige-veld">Voorkeur benadering telefonisch:</strong> {deskundige.voorkeur.telefonisch  ? "ja" : "nee"}
								<strong className="deskundige-veld">Toestemming uitnodiging van commerciele partijen:</strong> {deskundige.voorkeur.toestemmingUitnodiging  ? "ja" : "nee"}
							
							</div>
						</Card>
					)))}
			</Container>
			{onderzoek !== null ? (
				<>
					<Container hidden = {onderzoekBekijken ? "hidden" : ""}>
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
							<Col><h3>gemaakt op {getFormattedDateLocale(new Date(onderzoek[ONDERZOEK_DATA.GEMAAKT_OP]))}</h3></Col>
							<Col><h3>{new Date() < new Date(onderzoek[ONDERZOEK_DATA.EIND_DATUM]) ? `voor het ${showStartdatum ? "begint" : "eindigt"}` : ""}</h3></Col>
						</Row>
						<Row className="data-row-buttons">
							<Col><Button onClick={handleDeelnemers}>Bekijk deelnemers</Button></Col>
							<Col><Button onClick={() => navigate(-1)} variant="outline-secondary">Terug naar lopende onderzoeken</Button></Col>
							<Col>
								<Button onClick={() => navigate(`/bedrijf/onderzoeken/wijzig/${onderzoek[ONDERZOEK_DATA.ID]}`)}>
									Bekijk onderzoek
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
