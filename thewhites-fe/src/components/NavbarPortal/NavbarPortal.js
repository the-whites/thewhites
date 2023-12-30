import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import ButtonPortal from "../LogoutButton/LogoutButton";

import "./NavbarPortal.css";
import { Link } from "react-router-dom";

const NavbarPortal = () => {
	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				<Navbar.Brand as={Link} to="/beheerder">Beheerders Portaal</Navbar.Brand>
				<Nav className="me-auto">
					<Nav.Link as={Link} to="./ervaringsdeskundige">Ervaringsdeskundige</Nav.Link>
					<Nav.Link as={Link} to="./onderzoeken">Onderzoeken</Nav.Link>
					<Nav.Link as={Link} to="./bedrijven">Bedrijven</Nav.Link>
				</Nav>
				<ButtonPortal/>
			</Container>
		</Navbar>
	);
};

export default NavbarPortal;
