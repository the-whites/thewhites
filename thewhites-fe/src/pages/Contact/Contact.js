import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Contact.css";

const Contact = () => {
	return (
		<Container className="contact-container">
			<Row className="justify-content-center">
				<Col md={6}>
					<h1>Contact</h1>
					<p>Stichting Accessibility is gevestigd in het bedrijfsverzamelgebouw de Krammstate op een paar minuten lopen van Station Utrecht Overvecht.</p>
					<h2>Bezoek- en postadres:</h2>
					<p>Christiaan Krammlaan 2</p>
					<p>3571 AX Utrecht</p>
					<h2>Contact opnemen:</h2>
					<p>Telefoon nummer: +31 30 239 82 70</p>
					<p>E-mail adres: <a href="mailto:info@accessibility.nl">info@accessibilty.nl</a></p>
				</Col>
			</Row>
		</Container>
	);
};
export default Contact;
