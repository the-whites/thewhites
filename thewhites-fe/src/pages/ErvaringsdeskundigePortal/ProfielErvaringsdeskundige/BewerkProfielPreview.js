import React from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";

export const BewerkProfielPreview = ({profielData}) => {
	return (
		<>
			<h3>Uw profiel wordt met de volgende informatie bijgewerkt: </h3>
			<Container>
				<Row>
					<Col md={16}>
						<Table striped bordered hover>
							<tbody className="confirm-data-table">
								<tr>
									<td>Telefoonnummer</td>
									<td>{profielData.telefoonnummer}</td>
								</tr>
								<tr>
									<td>Beperking Types</td>
									<td>{profielData.beperkingTypes.map((item) => <p key={item.id}>{item.naam}<br/></p>)}</td>
								</tr>
								<tr>
									<td>Hulpmiddelen</td>
									<td>{profielData.hulpmiddel}</td>
								</tr>
								<tr>
									<td>Aandoening/Ziekte</td>
									<td>{profielData.ziekte}</td>
								</tr>
								<tr>
									<td>Onderzoek Types</td>
									<td>{profielData.onderzoekTypes.map((item) => <p key={item.id}>{item.type}<br/></p>)}</td>
								</tr>
								<tr>
									<td>Of commerciële partijen u mogen benaderen</td>
									<td>{profielData.benaderingVoorkeur.toestemmingUitnodigingen ? "ja" : "nee"}</td>
								</tr>
								<tr>
									<td>Portaal benaderen</td>
									<td>{profielData.benaderingVoorkeur.portaal ? "ja" : "nee"}</td>
								</tr>
								<tr>
									<td>Telefonisch benaderen</td>
									<td>{profielData.benaderingVoorkeur.telefonisch ? "ja" : "nee"}</td>
								</tr>
								<tr>
									<td>Beschikbaarheid</td>
									<td>{profielData.beschikbaarheid}</td>
								</tr>
							</tbody>
						</Table>
					</Col>
				</Row>
			</Container>
		</>
	);
};