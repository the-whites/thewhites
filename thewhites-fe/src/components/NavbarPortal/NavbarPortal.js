import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import LogoutButton from "../LogoutButton/LogoutButton";

import "./NavbarPortal.css";
import { Link } from "react-router-dom";

const NavbarPortal = ({ portalName, portalPath, links }) => {
	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				<Navbar.Brand as={Link} to={portalPath}>{portalName}</Navbar.Brand>
				<Nav className="me-auto">
					{links.map((link, index) => (
						<Nav.Link key={index} as={Link} to={link.path}>{link.name}</Nav.Link>
					))}
				</Nav>
				<LogoutButton/>
			</Container>
		</Navbar>
	);
};


export default NavbarPortal;
