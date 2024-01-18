import React, { useContext, useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import InputBar from "../../components/Inputbar/InputBar";
import MultiSelectionBar from "../../components/MultiSelectionBar/MultiSelectionBar";
import "./ProfielPagina.css";
import { ProfielContext, UserContext, UserProvider } from "../../contexts/UserProvider";
import { fetchApi } from "../../hooks/useApi";
import { validation } from "../../components/Validation/Validation";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import CustomDatePicker from "../../components/CustomDatePicker/CustomDatePicker";

const ProfielPagina = () => {
	const { profielData, setProfielData } = useContext(ProfielContext);
	const navigate = useNavigate();
	const [beperkingTypes, setBeperkingItems] = useState([]);
	const { isFormValid, errors } = validation(profielData);
	const [showModal, setShowModal] = useState(false);
	const [modalContent, setModalContent] = useState("");
	const {setupVoornaam, setupAchternaam} = useContext(UserContext);

	useEffect(() => {
		const fetch = async () => {
			const beperkingTypesResponse = await fetchApi({route: "api/Beperking/beperkingen"});

			setBeperkingItems(Object.values(beperkingTypesResponse.data).map(item => {
				return {id: item.id, naam: item.naam};
			}));
		};
		fetch();
		updateProfielData("voornaam", setupVoornaam);
		updateProfielData("achternaam", setupAchternaam);
	}, []);

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
							<p>Vul u postcode in als de volgende format: <strong>2424WT</strong></p>
						</Col>
						<InputBar
							label="Postcode"
							required
							value={profielData.postcode || ""}
							handleChange={(value) => updateProfielData("postcode", value)}
						/>
						<Col md={10} className="uitleg">
							<p>Vul u telefoonnummer in als de volgende format: <strong> 0612345678</strong></p>
						</Col>
						<InputBar
							label="Telefoonnummer"
							required
							value={profielData.telefoonnummer || ""}
							handleChange={(value) => updateProfielData("telefoonnummer", value)}
						/>
						<CustomDatePicker 
							label="Geboortedatum" 
							required={true} 
							value={profielData.geboortedatum || null}
							handleChange={(value) => updateProfielData("geboortedatum", value)}
							isInvalid={profielData.geboortedatum == null}
							dateFormat="yyyy-MM-dd"
							timeFormat={null}
							canEdit={true} />
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