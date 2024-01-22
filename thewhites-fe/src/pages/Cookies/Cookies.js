import Cookies from "js-cookie";
import React from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";

export const CookiesVerklaring = () => {
	return (
		<Container className="container-cookies">
			<Row className="mt-4 justify-content-center">
				<Col md={9}>
					<h1>Cookieverklaring</h1>

					<p>Deze website maakt gebruik van cookies om de gebruikerservaring te verbeteren en het gebruik van onze diensten te optimaliseren. Hieronder vind je informatie over welke cookies we gebruiken en waarvoor ze dienen.</p>

					<Table striped bordered hover>
						<thead>
							<tr>
								<th><strong>Cookie</strong></th>
								<th><strong>Doel</strong></th>
								<th><stong>Bewaartermijn</stong></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>refresh_token</td>
								<td>Deze cookie zorgt ervoor dat je sessie actief blijft, waardoor je langer dan de standaard 30 minuten ingelogd kunt blijven. Hierdoor hoef je niet herhaaldelijk in te loggen tijdens een langere browsesessie</td>
								<td>1 dag</td>
							</tr>
							<tr>
                                
								<td>cookies_accepted_dewhites</td>
								<td>Deze cookie slaat op of je akkoord gaat met het gebruik van cookies op onze website. Hiermee kunnen we je bij een volgend bezoek informeren over ons cookiebeleid en hoef je niet opnieuw toestemming te geven.</td>
								<td>1 Jaar (Niet permanent, omdat we zo uw privacy kunnen versterken)</td>
							</tr>
						</tbody>
					</Table>

					<p>Door het gebruik van onze website ga je akkoord met het plaatsen van deze cookies op je apparaat. Je kunt cookies op elk moment beheren door je browserinstellingen aan te passen. Houd er rekening mee dat het uitschakelen van bepaalde cookies de functionaliteit van de website kan beïnvloeden.</p>
				
					<p>Je kunt ook door op de volgende knop te klikken je instemming op deze cookies intrekken (als je eerder akkoord heb gegeven).</p>
					<Button variant="secondary" onClick={() => {Cookies.remove("cookies_accepted_dewhites"); document.location.reload();}}>Ja</Button>
				</Col>
			</Row>
		</Container>
	);
};
