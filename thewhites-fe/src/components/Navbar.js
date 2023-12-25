import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../images/sa-logo.png";

import "./Navbar.css";

const NavigationBar = () => {
	return (
		<Navbar expand="lg" className="nav-bar">
			<Container>
				<Navbar.Brand as={Link} to="/"><img src={logo} width={375} height={100} /></Navbar.Brand>
				<Navbar.Toggle aria-controls="dombo" />
				<Navbar.Collapse id="dombo">
					<Nav className="ms-auto">
						<Nav.Link as={Link} to="over-ons" className="nav-bar-item">Over ons</Nav.Link>
						<Nav.Link as={Link} to="contact" className="nav-bar-item">Contact</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};
export default NavigationBar;
