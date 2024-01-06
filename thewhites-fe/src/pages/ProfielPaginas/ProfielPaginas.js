import React from "react";
import { useNavigate } from "react-router-dom";

const ProfielPaginas = () => {
	const navigate = useNavigate();
  
	const goToProfielPagina = () => {
		navigate("/profielpagina"); // Dit is relatief aan de huidige route ("/profielpaginas/")
	};
  
	return (
		<div>
			<h1>Profielpagina</h1>
			<h3>Profielformulier</h3>
			<button onClick={goToProfielPagina}>Volgende</button>
		</div>
	);
};
  
export default ProfielPaginas;
  