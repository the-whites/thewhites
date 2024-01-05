import React from "react";
import { Card, Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./NavigationCard.css";

const NavigationCard = ({ title, content, linkTo}) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(linkTo);
	};

	return (
		<>
			<Card className="card-style">
				<Card.Body>
					<Card.Title>{title}</Card.Title>
					<Card.Text>{content}</Card.Text>
				</Card.Body>
				<Card.Footer>
					<Button variant="primary" onClick={handleClick}>Ga door</Button>
				</Card.Footer>
			</Card>
		</>
	);
};


export default NavigationCard;
