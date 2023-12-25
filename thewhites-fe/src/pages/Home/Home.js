import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import handi from "../assets/handi-op-tablet.png";

import "./Home.css";
import { GoogleLogin } from "@react-oauth/google";
//import FetchButton from "../FetchButton";

const Home = () => {
	return (
		<div className="position-relative">
			<Row>
				<GoogleLogin
					onSuccess={async (credentialResponse) => {
						console.log(credentialResponse);
						const response = await fetch(process.env.REACT_APP_API_PATH + "api/Login/login_google", {
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify(credentialResponse),
						});

						if (response.ok) {
							const data = await response.json();
							console.log("Authenticated. Data = " + JSON.stringify(data));
						}
					}}
					onError={() => {
						console.log("Login Failed");
					}}
				/>
			</Row>
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
							<p className="button-text">Wilt u deelnemen hieraan klik dan op <strong>Inloggen</strong></p>
							<Button variant="primary" size="lg" className="button" onClick={() => alert("L")}>Inloggen</Button>
						</div>
						<div className="button-block d-grid gap-2">
							<p className="button-text">Heeft u nog geen account klik dan op <strong>Registreren</strong></p>
							<Button variant="primary" size="lg" className="button" onClick={() => alert("L")}>Registreren</Button>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};
export default Home;
