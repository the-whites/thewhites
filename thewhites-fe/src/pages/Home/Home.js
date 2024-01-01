import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { CustomLoginContext, AuthContext } from "../../App";
import { fetchApi, postApi } from "../../hooks/useApi";
import { GoogleLogin } from "@react-oauth/google";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import handi from "../../assets/handi-op-tablet.png";

import "./Home.css";

const Home = () => {
	
	const {loggedIn, setLoggedIn} = useContext(AuthContext);
	const {googleCredentials, setGoogleCredentials} = useContext(CustomLoginContext);

	const { setUsername, setRole, role, username, roles } = useContext(UserContext);

	const navigate = useNavigate();

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
					setUsername(response.data.voornaam); // Dit moet uiteindelijk de gebruikersnaam worden
					
					if(Object.values(roles).includes(response.data.rol)) {
						setRole(response.data.rol);
					} else {
						console.log(`Tried to set role: "${response.data.rol}" while it doesn't exist.`);
					}
				}
			};
			getGebruikerInfo();	
		}
	}, [loggedIn]);

	useEffect(() => {
		if (role && username) {
			console.log(`Role: ${role}, Username: ${username} are set.`);

			switch (role) {
			case roles.beheerder:
				navigate("/beheerder");
				break;
			case roles.bedrijf:
				navigate("/bedrijf");
				break;
			case roles.ervaringsdeskundige:
				navigate("/ervaringsdeskundige");
				break;
			default:
				console.log(`No directory set for ${role}`);
				break;
			}
		}
	}, [role, username]);
	
	return (
		<div className="position-relative">
			<Container>
				<Row>
					<Col lg="4" className="pt-5 p-2 text-start">
						<h4>Welkom op de website van Stichting Accessibility</h4>
					</Col>
				</Row>
				<Row>
					<Col lg="4" className="p-2 text-start">
						<h5>Waar we streven naar hoogste normen van gebruiksvriendelijkheid en toegankelijkheid. Voor iedereen, ongeacht hun achtergrond of mogelijkheden.</h5>
					</Col>
				</Row>
				<Row>
					<Col lg="8">
						<img src={handi} alt="handi" className="img-fluid" />
					</Col>
				</Row>
			</Container>
			<Container className="position-absolute top-50 start-50 translate-middle p-2 text-center button-container">
				<Row>
					<Col lg="12" className="d-flex flex-column align-items-end">
						<div className="button-block d-grid gap-2">
							<h1>Log in</h1>
							<p className="button-text">Log in om naar je portaal te komen. Geen account? Log in via google om automatisch een account voor jezelf aan te maken</p>
							<GoogleLogin
								theme="filled_blue"
								shape="rectangular"
								size="large"
								text="continue_with"
								onSuccess={onGoogleLoginSuccess}
								onError={(error) => console.log("Error:", error)}
								className="w-100 h-100"
							/>
						</div> 
					</Col>
				</Row>
			</Container>
		</div>
	);
};
export default Home;
