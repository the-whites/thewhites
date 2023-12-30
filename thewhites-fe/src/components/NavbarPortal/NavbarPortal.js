import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavbarPortal.css";

const NavbarPortal = () => {
	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				<Navbar.Brand as={Link} to=" "></Navbar.Brand>
				<Nav className=" ">
					<Nav.Link as={Link} to=" "></Nav.Link>
					<Nav.Link as={Link} to=" "></Nav.Link>
					<Nav.Link as={Link} to=" "></Nav.Link>
				</Nav>
			</Container>
		</Navbar>
	);
};

export default NavbarPortal;
