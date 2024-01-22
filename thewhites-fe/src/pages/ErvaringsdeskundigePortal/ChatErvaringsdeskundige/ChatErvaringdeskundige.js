import React, { useContext, useEffect, useState } from "react";
import PortalWelcomeMessage from "../../../components/PortalWelcomeMessage/PortalWelcomeMessage";
import { Button,  Card,  Col, Container, Row } from "react-bootstrap";

import { fetchApi, postApi } from "../../../hooks/useApi";
import { SingleChat } from "../../../components/Chat/SingleChat";
import { useParams } from "react-router-dom";

const ChatErvaringsdeskundige = () => {
	const { id } = useParams(); // partner id voor chat
	const [toNaam, setToNaam] = useState("");
	const [messages, setMessages] = useState([]);

	const fetchMessages = async () => {
		const response = await fetchApi({route: "api/Gebruiker/chats/" + id});

		if (response && response.status == 200)
		{
			setMessages(response.data.messages);
			setToNaam(response.data.toNaam);
			console.log(response);
		}
	};

	useEffect(() => {

		fetchMessages();
	}, []);

	useEffect(() => {
		const interval = setInterval(async () => {
			await fetchMessages();
		}, 4000);
		return () => clearInterval(interval);
	}, []);

	const handleVersturen = async (message) => {
		const body = {
			message: message
		};

		const response = await postApi({route: "api/Gebruiker/chat/" + id, body: body});

		if (response && response.status == 200)
		{
			console.log(response);
			await fetchMessages();
		}
	}
	
	return (
		<>
			<PortalWelcomeMessage name="chat" />
			<Container>
				<Row>
					<Card className="chat-container">
						<Card.Body className="chat-message-window">
							<SingleChat toNaam={toNaam} messages={messages} handleVersturen={handleVersturen} />
						</Card.Body>	
					</Card>
				</Row>
			</Container>
		</>
	);
};

export default ChatErvaringsdeskundige;