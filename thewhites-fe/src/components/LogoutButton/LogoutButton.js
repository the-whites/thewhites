import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./LogoutButton.css";

const ButtonPortal = () => {
	const navigate = useNavigate();
  
	const handleLogout = () => {
		// Voer hier uitloglogica uit indien nodig, zoals state bijwerken, cookies verwijderen, etc.
		navigate("/"); // Redirect naar homepagina
	};
  
	return (
		<Button variant="outline-info" className="btn-uitloggen" onClick={handleLogout}>
        Uitloggen
		</Button>
	);
};
  
export default ButtonPortal;
