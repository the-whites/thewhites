import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { postApi } from "../../hooks/useApi";
import "./LogoutButton.css";

const ButtonPortal = () => {
	const navigate = useNavigate();

	const handleLogout = async () => {
		await postApi({route: "api/Login/logout"});
		navigate("/");
		location.reload();
	};
  
	return (
		<Button variant="outline-info" className="btn-uitloggen" onClick={handleLogout}>
        Uitloggen
		</Button>
	);
};
  
export default ButtonPortal;
