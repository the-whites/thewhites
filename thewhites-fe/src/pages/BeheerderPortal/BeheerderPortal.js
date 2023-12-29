import React, { useState } from 'react';
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';
import './BeheerderPortal.css'; 


const Beheerdersportal = () => {
    const [beheerdersnaam] = useState('Test Beheerder'); // moet de beheerdersnaam nog uit de database halen 

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="home">Beheerdersdashboard</Navbar.Brand>
                    <Nav className="me-auto">
						<Nav.Link href="Ervaringsdeskundige">Ervaringsdeskundige</Nav.Link>
						<Nav.Link href="Onderzoeken">Onderzoeken</Nav.Link>
						<Nav.Link href="Bedrijven">Bedrijven</Nav.Link>
                    </Nav>
                    <Button variant="outline-info" className="btn-uitloggen">Uitloggen</Button>
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