import React, { useContext, useEffect, useState } from "react";
import { Badge, Button, Card, Col, Row } from "react-bootstrap";
import { fetchApi } from "../../../hooks/useApi";
import { UserContext } from "../../../contexts/UserProvider";

export const SingleChat = ({toNaam, messages, handleVersturen = (newMessage) => {}}) => {
	const [chats, setChats] = useState([]);
	const [testInt, setTestInt] = useState(1);
	const [selectedChat, setSelectedChat] = useState(null);
	const [newMessage, setNewMessage] = useState("");
	const { userId } = useContext(UserContext);

	return (<>
		<Card className="text-center h-100">
			<Card.Header>{toNaam}</Card.Header>
			<Card.Body className=" chat-message-body">
				{messages.map(message => {
					if (userId < 1)
						return console.error("Er is geen user id opgeslagen. Niet ingelogd?");

					if (message.fromId == userId)
					{
						return <Row key={message.id} className="chat-sender-card">
							<div className="d-flex align-items-end w-100">
								<Badge className="chat-msg-send-badge ms-auto m-2 p-2" aria-label={"U zegt: " + message.message}>{message.message }</Badge>
							</div>
						</Row>;
					}
					else
					{
						return <Row key={message.id} className="chat-receiver-card">
							<div className="d-flex align-items-start w-100">
								<Badge bg="secondary" aria-label={toNaam + " zegt: " + message.message} className="m-2 p-2">{message.message }</Badge>
							</div>
						</Row>;
					}
				})}
			</Card.Body>
			<Card.Footer className="text-muted">
				<input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} type="text" id="myText" className="chat-input" name="myText" />
				<Button variant="primary" onClick={(e) => handleVersturen(newMessage)}>Versturen</Button>
			</Card.Footer>
		</Card>
	</>);
};
