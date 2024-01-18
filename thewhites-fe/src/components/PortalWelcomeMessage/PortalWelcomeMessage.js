import { React, useContext }from "react";
import { Container, Row, Col } from "react-bootstrap";
import { UserContext } from "../../contexts/UserProvider";

import "./PortalWelcomeMessage.css";

const PortalWelcomeMessage = ( {name} ) => {
	const { username } = useContext(UserContext);

	return (<h1 className="admin-welcome">Welkom bij het {name} scherm, {username}.</h1>);
};

export default PortalWelcomeMessage;
