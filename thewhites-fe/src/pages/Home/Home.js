import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { CustomLoginContext } from "../../contexts/UserProvider";
import { GoogleLogin } from "@react-oauth/google";
import { UserContext } from "../../contexts/UserProvider";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../constants/roles";
import handi from "../../assets/rolstoel-tablet.png";

import "./Home.css";

const Home = () => {
	
	const {setGoogleCredentials} = useContext(CustomLoginContext);

	const { role, username } = useContext(UserContext);

	const navigate = useNavigate();

	const onGoogleLoginSuccess = (credentialResponse) => {
		console.log(credentialResponse);
		setGoogleCredentials(credentialResponse);
	};

	useEffect(() => {
		if (role && username) {
			console.log(`Role: ${role}, Username: ${username} are set.`);

			switch (role) {
			case ROLES.beheerder:
				navigate("/beheerder");
				break;
			case ROLES.bedrijf:
				navigate("/bedrijf");
				break;
			case ROLES.ervaringsdeskundige:
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
				<Row className="home-heading-row justify-content-md-center align-items-center">
					<Col lg="6" className="pt-5 p-2 text-start">
						<h1>Welkom op de website van Stichting Accessibility</h1>
						<p>Waar we streven naar hoogste normen van gebruiksvriendelijkheid en toegankelijkheid. Voor iedereen, ongeacht hun achtergrond of mogelijkheden.</p>
					</Col>
					<Col lg="6">
						<img src={handi} alt="handi" className="img-fluid" />
					</Col>
				</Row>
				<Row className="home-kop justify-content-md-center">
					<Col lg="4" className="d-flex flex-column login-block">
						<h3>Log in</h3>
						<p>Log in met de knop hieronder om naar je portaal te komen. Geen account? Klik op de knop hieronder en vervolgens op de knop Account Aanmaken. </p>
						<GoogleLogin
							theme="filled_blue"
							shape="rectangular"
							size="large"
							text="continue_with"
							onSuccess={onGoogleLoginSuccess}
							onError={(error) => console.log("Error:", error)}
						/>
					</Col>
				</Row>
			</Container>
		</div>
	);
};
export default Home;
