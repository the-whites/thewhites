import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { getFormattedDateLocale } from "../../util/Util";

export const OnderzoekInfo = ({onderzoek}) => {

	const getFormattedBeperkingCriterias = (beperkingCriteria) => {
		if (!beperkingCriteria || beperkingCriteria.length < 1)
			return <span>geen</span>;

		return beperkingCriteria.map((item, index, array) => (<span key={item.beperking.id}>{item.beperking.naam}{index + 1 === array.length ? "" : ", "}</span>));
	};
	
	const getFormattedOnderzoekCategories = (onderzoekCategories) => {
		if (!onderzoekCategories || onderzoekCategories.length < 1)
			return <span>geen</span>;

		const lastItemId = onderzoekCategories[onderzoekCategories.length - 1].type.id;
		return onderzoekCategories.map((item) => (<span key={item.type.id}>{item.type.type}{item.type.id == lastItemId ? "" : ", "}</span>));
	};

	const getFormattedLeeftijdCriteria = (leeftijdCriteria) => {
		if (!leeftijdCriteria || leeftijdCriteria.length < 1)
			return <span>geen</span>;

		const lastItemId = leeftijdCriteria.length - 1;
		return leeftijdCriteria.map(
			(item, index) => (<span key={index}>
				{item.minLeeftijd}{item.minLeeftijd != item.maxLeeftijd ? " tot " + item.maxLeeftijd : ""} jaar oud{index == lastItemId ? "" : ", "}
			</span>)
		);
	};

	const getFormattedPostcodeCriteria = (postcodeCriteria) => {
		if (!postcodeCriteria || postcodeCriteria.length < 1)
			return <span>geen</span>;

		const lastItemId = postcodeCriteria.length - 1;
		return postcodeCriteria.map((item, index) => (<span key={index}>{item.postcode}{index == lastItemId ? "" : ", "}</span>));
	};

	return (
		<Row className="justify-content-md-center">
			<Col className="onderzoeken-search-item" md={4}>
				<Card className="text-center">
					<Card.Header><h3>Onderzoek Specificaties</h3></Card.Header>
					<Card.Body className="">
						<span className="d-block"><b>Bedrijf</b>: {onderzoek.bedrijf.naam}</span>
						<span className="d-block"><b>Link bedrijf</b>: <a href={onderzoek.bedrijf.link}>{onderzoek.bedrijf.link}</a> </span>
						<span className="d-block"><b>Beloning</b>: {onderzoek.beloning ? onderzoek.beloning : "geen"}</span>
						<br />
						<span className="d-block"><b>locatie</b>: {onderzoek.locatie}</span>
						<br />
						<span className="d-block"><b>Beperking criteria</b>: {getFormattedBeperkingCriterias(onderzoek.beperkingCriteria)}</span>
						<span className="d-block"><b>Onderzoek categorie criteria</b>: {getFormattedOnderzoekCategories(onderzoek.onderzoekCategories)}</span>
						<span className="d-block"><b>Leeftijd criteria</b>: {getFormattedLeeftijdCriteria(onderzoek.leeftijdCriteria)}</span>
						<span className="d-block"><b>Postcode criteria</b>: {getFormattedPostcodeCriteria(onderzoek.postcodeCriteria)}</span>
						<br />
						<span className="d-block"><b>Start datum</b>: {getFormattedDateLocale(new Date(onderzoek.startDatum))}</span>
						<span className="d-block"><b>Eind datum</b>: {getFormattedDateLocale(new Date(onderzoek.eindDatum))}</span>
					</Card.Body>
				</Card>
			</Col>
			<Col className="onderzoeken-search-item" md={8}>
				<Card className="text-center">
					<Card.Header><h3>Onderzoek Beschrijving</h3></Card.Header>
					<Card.Body>
						<Card.Title>{onderzoek.titel}</Card.Title>
						<Card.Text>
							{onderzoek.beschrijving}
						</Card.Text>
						
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
};
