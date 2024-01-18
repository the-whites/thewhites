import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../assets/sa-logo.png";
import { UserContext } from "../../contexts/UserProvider";

import "./Navbar.css";
import UserDropdown from "./UserDropdown";

const NavigationBar = () => {
	const { username } = useContext(UserContext);

	const menuItems = [
		{
			name: "Over ons",
			path: "over-ons",
		},
		{
			name: "Contact",
			path: "contact",
		},
	];

	return (
		<Navbar expand="lg" className="nav-bar">
			<Container>
				<Navbar.Brand as={Link} to="/"><img src={logo} width={375} height={100} /></Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						{menuItems.map((item, index) => (
							<Nav.Link as={Link} to={item.path} key={index} className="nav-bar-item">{item.name}</Nav.Link>
						))}
						{username ? 
							<UserDropdown />
							: 
							<Nav.Link as={Link} to="login" className="nav-bar-item">Login</Nav.Link>
						}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};
export default NavigationBar;
