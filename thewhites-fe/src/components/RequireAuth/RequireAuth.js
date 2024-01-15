import React from "react";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserProvider";
import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import "../MainStyles.css";
import "./RequireAuth.css";

const RequireAuth = ({ allowedRoles }) => {
	const { role } = useContext(UserContext);
	return (
		<>
			{allowedRoles.includes(role) ? (
				<Outlet />
			) : (
				<Container className="d-flex align-items-center justify-content-center error-403-container">
					<Row>
						<Col className="text-center">
							<h1 className="big-text font-weight-bold">Error 403.</h1>
							<p className="font-weight-bold">Je hebt geen toegang tot deze pagina</p>
						</Col>
					</Row>
				</Container>
			)}
		</>
	);
};

export default RequireAuth;
