import React from "react";
import { Navbar, Container } from "react-bootstrap";
import "./NavbarPortal.css";
const NavbarPortal = ({ children }) => {
	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				{children}
			</Container>
		</Navbar>
	);
};

export default NavbarPortal;
