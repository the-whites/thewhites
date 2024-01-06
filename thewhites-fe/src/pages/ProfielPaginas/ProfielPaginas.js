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
					<h3>Profielformulier</h3>
					<button onClick={() => navigate("profielpagina")}>Volgende</button>
				</>
			)}
			<Outlet />
		</div>
	);
};
  
export default ProfielPaginas;

  
  