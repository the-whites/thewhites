import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../assets/sa-logo.png";

import "./Navbar.css";
import { CustomLoginContext, AuthContext } from "../../App";
import { fetchApi, postApi } from "../../hooks/useApi";
import { GoogleLogin } from "@react-oauth/google";
import { Button } from "react-bootstrap";
import Profiel from "../Profiel";

const NavigationBar = () => {
	const {loggedIn, setLoggedIn} = useContext(AuthContext);
	const {googleCredentials, setGoogleCredentials} = useContext(CustomLoginContext);
	const [gebruikerInfo, setGebruikerInfo] = useState({
		voornaam: undefined,
		achternaam: undefined,
		email: undefined,
	});

	const onGoogleLoginSuccess = (credentialResponse) => {
		console.log(credentialResponse);
		setGoogleCredentials(credentialResponse);
	};

	useEffect(() => {
		if (googleCredentials)
		{
			const getJwtToken = async () => {
				const response = await postApi({route: "api/Login/login_google", body: JSON.stringify(googleCredentials)});
		
				if (response.status == 200) {
					console.log("Authenticated.");
					setLoggedIn(true);
				}
			};
			getJwtToken();
		}

	}, [googleCredentials]);

	useEffect(() => {
		if (loggedIn)
		{
			const getGebruikerInfo = async () => {
				const response = await fetchApi({route: "api/Login/profileInfo"});
		
				if (response.status == 200) {
					setGebruikerInfo({
						voornaam: response.data.voornaam,
						achternaam: response.data.achternaam,
						email: response.data.email
					});
					console.log(gebruikerInfo);
				}
			};
			getGebruikerInfo();	
		}
	}, [loggedIn]);

	const logout = async () => {
		await postApi({route: "api/Login/logout"});
		window.location.href = "/";
		location.reload();
	};

	return (
		<Navbar expand="lg" className="nav-bar">
			<Container>
				<Navbar.Brand as={Link} to="/"><img src={logo} width={375} height={100} /></Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link as={Link} to="over-ons" className="nav-bar-item">Over ons</Nav.Link>
						<Nav.Link as={Link} to="contact" className="nav-bar-item">Contact</Nav.Link>
						<Nav.Item className="nav-bar-item">
							{
								loggedIn ? 
									(
										<>
											<Profiel voornaam={gebruikerInfo.voornaam} achternaam={gebruikerInfo.achternaam} email={gebruikerInfo.email}/>
											<Button variant="danger" onClick={() => logout()}>Uitloggen</Button>
										</>
									) 
									: 
									(<GoogleLogin
										onSuccess={onGoogleLoginSuccess}
										onError={() => {
											console.log("Login Failed");
										}}/>
									)
							}
						</Nav.Item>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};
export default NavigationBar;
