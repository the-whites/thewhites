import React, { useState } from "react";
import NavbarPortal from "../../components/Navbar_Portal/NavbarPortal";
import ButtonPortal  from "../../components/Logout_ButtonPortal/Logout_ButtonPortal";
import { Link } from "react-router-dom";
import "./BeheerderPortal.css"; 
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";

const Beheerdersportal = () => {
	const [beheerdersnaam] = useState("Test Beheerder"); // moet de beheerdersnaam nog uit de database halen/ die inlogd is
	
	//components van maken button en navbar V
	// en route toevoegen voor elke tabblad
	return (
		<div>
			<NavbarPortal bg="dark" variant="dark">
				<Navbar.Brand as={Link} to="/">Beheerdersdashboard</Navbar.Brand>
				<Nav className="me-auto">
					<Nav.Link as={Link} to="/ervaringsdeskundige">Ervaringsdeskundige</Nav.Link>
					<Nav.Link as={Link} to="/onderzoeken">Onderzoeken</Nav.Link>
					<Nav.Link as={Link} to="/bedrijven">Bedrijven</Nav.Link>
				</Nav>
				<ButtonPortal/>
			</NavbarPortal>
			<Container className="mt-4">
				<Row>
					<Col lg={12}>
						<h2>Welkom, {beheerdersnaam}</h2>
						<p>Beheer de inhoud van uw site en gebruikersaccounts snel en gemakkelijk.</p>
					</Col>
				</Row>
				{/* Extra beheerfunctionaliteiten kunnen hier worden toegevoegd */}
			</Container>
		</div>
	);
};

export default Beheerdersportal;