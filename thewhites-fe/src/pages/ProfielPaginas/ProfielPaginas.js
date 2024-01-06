import React from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

const ProfielPaginas = () => {
	const navigate = useNavigate();
	const location = useLocation();
  
	return (
		<div>
			{location.pathname === "/profielpaginas" && (
				<>
					<h1>Profielpagina</h1>
					<h3>Welkom op de beginscherm van de Profielformulier</h3>
					<p3>U gaat bij de 1e scherm u persoonlijkegegevens invullen zoals: voornaam, achternaam en nog meer. </p3>
					<br></br>
					<p3>U gaat bij de 2e scherm u gegevens invullen voor de onderzoeken zoals: beschikbaarheid en locatie en nog meer. </p3>
					<br></br>
					<button onClick={() => navigate("profielpagina")}>Volgende</button>
				</>
			)}
			<Outlet />
		</div>
	);
};
  
export default ProfielPaginas;

  
  