import React from "react";
import "./Footer.css";
import { Col, Container, Row } from "react-bootstrap";


export const Footer = () => {
	return (
		<>
			<Row className="footer">
				<Col>	
					<div className="copyright">© Copyright 2024 Stichting Accessibilty</div>	
				</Col>
					
				<Col>
					<a className="over-ons" href="/over-ons">Over ons</a>
				</Col>	

				<Col>	
					<a className="contact" href="/contact">Contact</a>
				</Col>

				<Col>	
					<a className="cookies" href="/cookies">Cookies</a>	
				</Col>	
				
				<Col>	
					<a className="privacy-policy" href="/privacy-policy">Privacy policy</a>
				</Col>
			</Row>	
		</>
	);
};

export default Footer;