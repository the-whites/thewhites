import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import handi from "../images/handi-op-tablet.png";

import "./Home.css"

const Home = () => {
    return (
        <Container>
            <Row>
                <Col lg="4" className="pt-5 p-2 text-start">
                    <h4>Welkom op de website van Stichting Accesibility</h4>
                </Col>
            </Row>
            <Row>
                <Col lg="4" className="p-2 text-start">
                    <h5>Waar we streven naar hoogste normen van gebruiksvriendelijkheid en toegankelijkheid. Voor iedereen, ongeacht hun achtergrond of mogelijkheden.</h5>
                </Col>
            </Row>
            <Row>
                <Col lg="6">
                    <img src={handi} />
                </Col>
            </Row>
        </Container>
    );
};
export default Home;
