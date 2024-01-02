import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { CustomLoginContext } from "../../contexts/UserProvider";
import { GoogleLogin } from "@react-oauth/google";
import { UserContext } from "../../contexts/UserProvider";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../constants/roles";
import handi from "../../assets/handi-op-tablet.png";

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
