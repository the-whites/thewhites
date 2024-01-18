import React, { useContext, useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import InputBar from "../../components/Inputbar/InputBar";
import MultiSelectionBar from "../../components/MultiSelectionBar/MultiSelectionBar";
import "./ProfielPagina.css";
import { ProfielContext } from "./ProfielContext";
import { fetchApi } from "../../hooks/useApi";
import { Validation } from "../../components/Validation/Validation";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";

const ProfielPagina = () => {
	const { profielData, setProfielData } = useContext(ProfielContext);
	const navigate = useNavigate();
	const [beperkingTypes, setBeperkingItems] = useState([]);
	const { isFormValid, errors } = Validation(profielData);
	const [showModal, setShowModal] = useState(false);
	const [modalContent, setModalContent] = useState("");

	useEffect(() => {
		const fetch = async () => {
			const beperkingTypesResponse = await fetchApi({route: "api/Beperking/beperkingen"});

			setBeperkingItems(Object.values(beperkingTypesResponse.data).map(item => {
				return {id: item.id, naam: item.naam};
			}));
		};
		fetch();
	}, []);

	useEffect(() => {
		sessionStorage.setItem("profielData", JSON.stringify(profielData));
	}, [profielData]);

	const updateProfielData = useCallback((name, value) => {
		setProfielData(prevState => ({ ...prevState, [name]: value }));
	}, [setProfielData]);

	const handleSubmitForm = (event) => {
		event.preventDefault();
        
		if (!isFormValid()) {
			let errorMessage = "Sommige velden zijn niet correct ingevuld:\n";
			for (const key in errors) {
				errorMessage += `${errors[key]}\n`;
			}
			setModalContent(errorMessage);
			setShowModal(true);
		} else {
			navigate("/Medischepagina");
		}
	};
	
	return (
		<Form validated={true} onSubmit={handleSubmitForm}>
			<Container>
				<h2>Profiel pagina 1/2</h2>
				<p>Vul hieronder uw persoonlijke gegevens in</p>
				<Row className="persoonlijkegegevens">
					<Col md={10} className="inputvelden">
						<InputBar
							label="Voornaam"
							required
							value={profielData.voornaam || ""}
							handleChange={(value) => updateProfielData("voornaam", value)}
						/>
						<InputBar
							label="Achternaam"
							required
							value={profielData.achternaam || ""}
							handleChange={(value) => updateProfielData("achternaam", value)}
						/>
						<Col md={10} className="uitleg">
							<p2>Vul u postcode in als de volgende format: <strong>2424tq</strong></p2>
						</Col>
						<InputBar
							label="Postcode"
							required
							value={profielData.postcode || ""}
							handleChange={(value) => updateProfielData("postcode", value)}
						/>
						<Col md={10} className="uitleg">
							<p2>Vul u email in als de volgende format: <strong>test@gmail.com</strong></p2>
						</Col>
						<InputBar
							label="E-mailadres"
							required
							value={profielData.emailadres || ""}
							handleChange={(value) => updateProfielData("emailadres", value)}
						/>
						<Col md={10} className="uitleg">
							<p2>Vul u telefoonnummer in als de volgende format: <strong> 0612345678</strong></p2>
						</Col>
						<InputBar
							label="Telefoonnummer"
							required
							value={profielData.telefoonnummer || ""}
							handleChange={(value) => updateProfielData("telefoonnummer", value)}
						/>
						<MultiSelectionBar
							label="Type beperkingen"
							required
							items={beperkingTypes}
							handleSelection={(selectedItems) => updateProfielData("beperkingTypes", selectedItems)}
							initialSelectedItems={profielData.beperkingTypes}
							getKey={(option) => option.id}
							getValue={(option) => option.naam}
						/>
					</Col>
				</Row>
				<Button type="submit">Volgende</Button>
			</Container>
			<ConfirmationModal 
				show={showModal}
				handleClose={() => setShowModal(false)}
				handleConfirm={() => setShowModal(false)}
				title="Foutmelding">
				{modalContent}
			</ConfirmationModal>
		</Form>
	);
};

export default ProfielPagina;