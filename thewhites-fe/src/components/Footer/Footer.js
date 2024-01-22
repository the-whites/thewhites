import React from "react";
import "./Footer.css";
import { Col, Container, Row } from "react-bootstrap";


export const Footer = () => {
	return (
		<>
			<div className="footer">
				<Container>
					<Row className="footer-row">
						<Col>	
							<div className="copyright">© Copyright 2024 Stichting Accessibilty</div>	
						</Col>
						
						<Col>
							<a href="/over-ons">Over ons</a>
						</Col>	

						<Col>	
							<a  href="/contact">Contact</a>
						</Col>

						<Col>	
							<a href="/cookies">Cookies</a>	
						</Col>	
					
						<Col>	
							<a href="/privacy-policy">Privacy verklaring</a>
						</Col>
					</Row>
				</Container>
			</div>	
		</>
	);
};

export default Footer;