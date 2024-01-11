import React from "react";
import { Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

const LoadingAnimation = () => {
	return (
		<Col className="text-center">
			<Spinner animation="border" variant="primary" />
			<p>Aan het laden...</p>
		</Col>
	);
};

export default LoadingAnimation;
