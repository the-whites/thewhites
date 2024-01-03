import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { postApi } from "../../hooks/useApi";
import "./LogoutButton.css";
import { logout } from "../logout";

const ButtonPortal = () => {
	const navigate = useNavigate();

	const handleLogout = async () => {
		logout();
		setTimeout(() => {
			// navigate werkt soms niet zo goed?
			//navigate("/");
			window.location.href = "/";
		}, 1500);
	};
  
	return (
		<Button variant="outline-info" className="btn-uitloggen" onClick={handleLogout}>
        Uitloggen
		</Button>
	);
};
  
export default ButtonPortal;
