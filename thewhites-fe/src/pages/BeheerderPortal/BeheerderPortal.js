import React, { useState } from 'react';
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';

const Beheerdersportal = () => {
    const [beheerdersnaam] = useState('Uw Naam');

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Beheerdersdashboard</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#gebruikers">Gebruikers</Nav.Link>
                        <Nav.Link href="#rapporten">Rapporten</Nav.Link>
                        <Nav.Link href="#instellingen">Instellingen</Nav.Link>
                    </Nav>
                    <Button variant="outline-info">Uitloggen</Button>
                </Container>
            </Navbar>
            <Container className="mt-4">
                <Row>
                    <Col lg={12}>
                        <h2>Welkom, {beheerdersnaam}</h2>
                        <p>Beheer de inhoud van uw site en gebruikersaccounts snel en gemakkelijk.</p>
                    </Col>
                </Row>
                {/* Extra beheerfunctionaliteiten kunnen hier worden toegevoegd */}
            </Container>
        </div>
    );
};

export default Beheerdersportal;




/*import React from "react";

const BeheerderPortal = () => {
	return (
		<>
			<h4>BeheerderPortal Test</h4>
		</>	
	);
};
export default BeheerderPortal;
*/