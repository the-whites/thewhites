import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { fetchApi, postApi } from "../../hooks/useApi";
import { UserContext } from "../../contexts/UserProvider";
import { SingleChat } from "./SingleChat";

export const MultiChat = () => {
	const [selectedChatPartner, setSelectedChatPartner] = useState(null);
	const [selectedChatPartnerMessages, setSelectedChatPartnerMessages] = useState([]);
	const [chatPartners, setChatPartners] = useState([]);

	const fetchMessages = async () => {
		const response = await fetchApi({route: "api/Gebruiker/chats/" + selectedChatPartner.id});

		if (response && response.status == 200)
		{
			setSelectedChatPartnerMessages(response.data.messages);
			console.log(response);
		}
	};

	useEffect(() => {
		const fetchChatPartners = async () => {
			const response = await fetchApi({route: "api/Gebruiker/chats"});

			if (response && response.status == 200)
			{
				setChatPartners(response.data ?? []);
				console.log(response);
			}
		};

		fetchChatPartners();
	}, []);

	useEffect(() => {

		if (selectedChatPartner != null)
			fetchMessages();
	}, [selectedChatPartner]);

	useEffect(() => {
		if (selectedChatPartner != null) {
			const interval = setInterval(async () => {
				await fetchMessages();
			}, 4000);
			return () => clearInterval(interval);
		}
	}, [selectedChatPartner]);



	const handleVersturen = async (message) => {
		const body = {
			message: message
		};

		const response = await postApi({route: "api/Gebruiker/chat/" + selectedChatPartner.id, body: body});

		if (response && response.status == 200)
		{
			console.log(response);
			await fetchMessages();
		}
	};

	return (
		<Row>
			<Col>
				<Card className="chat-container">
					<Card.Body>
						<Row className="h-100">
							<Col md={3} className="chat-list-panel">

								{chatPartners.map(chatPartner => 	<Card key={chatPartner.id}>
									<Card.Body>
										<Button 
											variant="outline-secondary" 
											className="w-100 h-100"
											onClick={() => setSelectedChatPartner(chatPartner)}
										>
											{chatPartner.naam}
										</Button>
									</Card.Body>
								</Card>)}
							</Col>
							<Col md={9} className="chat-message-window">
								{selectedChatPartner != null && 
									<SingleChat messages={selectedChatPartnerMessages} toNaam={selectedChatPartner.naam} handleVersturen={handleVersturen} />
								}
										
							</Col>
						</Row>
					</Card.Body>	
				</Card>
			</Col>
		</Row>
	);
};
