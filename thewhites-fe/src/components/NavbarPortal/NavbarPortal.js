import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import LogoutButton from "../LogoutButton/LogoutButton";

import "./NavbarPortal.css";
import { Link } from "react-router-dom";

const NavbarPortal = ({ portalName, portalPath, links }) => {
	return (
		<Navbar expand="lg" bg="dark" variant="dark">
			<Container>
				<Navbar.Brand as={Link} to={portalPath}>{portalName}</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						{links.map((link, index) => (
							<Nav.Link key={index} as={Link} to={link.path}>{link.name}</Nav.Link>
						))}
					</Nav>
					<LogoutButton/>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};


export default NavbarPortal;
