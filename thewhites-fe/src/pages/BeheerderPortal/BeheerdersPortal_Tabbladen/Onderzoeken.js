import React, { useState } from "react";
import NavbarPortal from "../../../components/Navbar_Portal/NavbarPortal";
import ButtonPortal  from "../../../components/Logout_ButtonPortal/Logout_ButtonPortal";
import { Link } from "react-router-dom";
import "./Onderzoeken.css"; 
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";

const OnderzoekenBHP = () => {
	const [beheerdersnaam] = useState("Test Beheerder"); // moet de beheerdersnaam nog uit de database halen/ die inlogd is

	return (
		<div>
			<NavbarPortal bg="dark" variant="dark">
				<Navbar.Brand as={Link} to="/beheerder">Beheerdersdashboard</Navbar.Brand>
				<Nav className="me-auto">
					<Nav.Link as={Link} to="/beheerder/ervaringsdeskundige">Ervaringsdeskundige</Nav.Link>
					<Nav.Link as={Link} to=" ">Onderzoeken</Nav.Link>
					<Nav.Link as={Link} to="/beheerder/bedrijven">Bedrijven</Nav.Link>
				</Nav>
				<ButtonPortal/>
			</NavbarPortal>
			<Container className="mt-4">
				<Row>
					<Col lg={12}>
						<h2> Onderzoekenscherm, {beheerdersnaam}</h2>
						<p>Hier staat de lijst met Onderzoeken.</p>
					</Col>
				</Row>
				{/* Extra functionaliteiten kunnen hier worden toegevoegd */}
			</Container>
		</div>
	);
};

export default OnderzoekenBHP;