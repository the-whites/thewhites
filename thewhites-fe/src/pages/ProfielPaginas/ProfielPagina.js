import React, { useContext, useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import InputBar from "../../components/Inputbar/InputBar";
import MultiSelectionBar from "../../components/MultiSelectionBar/MultiSelectionBar";
import "./ProfielPagina.css";
import { ProfielContext } from "./ProfielContext";
import { fetchApi } from "../../hooks/useApi";

const ProfielPagina = () => {
	const { profielData, setProfielData } = useContext(ProfielContext);
	const navigate = useNavigate();
	const [beperkingTypes, setBeperkingItems] = useState([]);

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
		//Aparte component van maken !
		// Basisvalidatie voor e-mailadres
		const emailRegex = /\S+@\S+\.\S+/;
		const isEmailValid = emailRegex.test(profielData.emailadres);

		// Basisvalidatie voor Nederlandse postcode
		const postcodeRegex = /^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/;
		const isPostcodeValid = postcodeRegex.test(profielData.postcode);

		// Basisvalidatie voor telefoonnummer (Nederlands formaat)
		const telefoonRegex = /^06\d{8}$/;
		const isTelefoonValid = telefoonRegex.test(profielData.telefoonnummer);
		// Controleer of alle velden zijn ingevuld
		const isFormValid =
			profielData.voornaam.length > 0 &&
			profielData.achternaam.length > 0 &&
			isEmailValid &&
			isPostcodeValid &&
			isTelefoonValid &&
			profielData.beperkingTypes.length > 0 ; 
	
		if (!isFormValid) {
			alert("Sommige velden zijn niet correct ingevuld. Controleer alstublieft uw invoer.");
		} else {
			navigate("/medischePagina");
		}
	};
	
	return (
		<Form validated={true} onSubmit={handleSubmitForm}>
			<Container>
				<h2>Profiel pagina</h2>
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
						<InputBar
							label="Postcode"
							required
							value={profielData.postcode || ""}
							handleChange={(value) => updateProfielData("postcode", value)}
						/>
						<InputBar
							label="E-mailadres"
							required
							value={profielData.emailadres || ""}
							handleChange={(value) => updateProfielData("emailadres", value)}
						/>
						<InputBar
							label="Telefoonnummer"
							required
							value={profielData.telefoonnummer || ""}
							handleChange={(value) => updateProfielData("telefoonnummer", value)}
						/>
						<MultiSelectionBar
							label="Type beperkingen"
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
		</Form>
	);
};

export default ProfielPagina;