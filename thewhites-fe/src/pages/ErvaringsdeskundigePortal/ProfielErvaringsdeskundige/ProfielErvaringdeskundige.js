import React, { useEffect, useRef, useState } from "react";
import InputBar from "../../../components/Inputbar/InputBar";
import "./style.css";

import { fetchApi, postApi } from "../../../hooks/useApi";
import MultiSelectionBar from "../../../components/MultiSelectionBar/MultiSelectionBar";
import { Alert, Badge, Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

let oldProfielInfo = {
	telefoonnummer: "",
	hulpmiddel: "",
	ziekte: "",
	typeBeperking: "",
	typeOnderzoek: "",
	comBedrijvenBenadering: false,
	voorkeurBenadering: "",
	beschikbaarheid: []
};

const ProfielErvaringsdeskundige = () => {
	const telRef = useRef(null);
	const hulpmiddelenRef = useRef(null);
	const aandoeningZiekteRef = useRef(null);
	const comPartijenBenaderingRef = useRef(null);
	const portaalVoorkeurRef = useRef(null);
	const telefonischVoorkeurRef = useRef(null);
	const beschikbaarheidRef = useRef(null);
	const [beperkingItems, setBeperkingItems] = useState([]);
	const [initialBeperkingItems, setInitialBeperkingItems] = useState([]);
	const [gekozenBeperkingItems, setGekozenBeperkingItems] = useState([]);
	const [onderzoekTypeItems, setOnderzoekTypeItems] = useState([]);
	const [initialOnderzoekTypeItems, setInitialOnderzoekTypeItems] = useState([]);
	const [gekozenOnderzoekItems, setGekozenOnderzoekItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isConfirming, setIsConfirming] = useState(false);
	const [error, setError] = useState(null);
	const [formIsValidated, setFormIsValidated] = useState(false);
	const formRef = useRef(null);

	useEffect(() => {
		setIsLoading(true);
		const setInitialProfielInfoFromResponse = (response) => {
			oldProfielInfo = response;
			console.log(oldProfielInfo);
			telRef.current.value = oldProfielInfo.telefoonnummer;
			hulpmiddelenRef.current.value = oldProfielInfo.hulpmiddel;
			aandoeningZiekteRef.current.value = oldProfielInfo.ziekte;
			beschikbaarheidRef.current.value = oldProfielInfo.beschikbaarheid;
			comPartijenBenaderingRef.current.checked = oldProfielInfo.benaderingVoorkeur.toestemmingUitnodigingen;
			portaalVoorkeurRef.current.checked = oldProfielInfo.benaderingVoorkeur.portaal;
			telefonischVoorkeurRef.current.checked = oldProfielInfo.benaderingVoorkeur.telefonisch;
			
			setInitialBeperkingItems(Object.values(response.beperkingTypes).map(item => {
				return {id: item.id, naam: item.naam};
			}));
			setInitialOnderzoekTypeItems(Object.values(response.onderzoekTypes).map(item => {
				return {id: item.id, type: item.type};
			}));
		};

		const fetchData = async () => {
			const onderzoekTypesResponse = await fetchApi({route: "api/OnderzoekType/onderzoek-types"});
			const beperkingTypesResponse = await fetchApi({route: "api/Beperking/beperkingen"});

			setBeperkingItems(Object.values(beperkingTypesResponse.data).map(item => {
				return {id: item.id, naam: item.naam};
			}));

			setOnderzoekTypeItems(Object.values(onderzoekTypesResponse.data).map(item => {
				return {id: item.id, type: item.type};
			}));

			const profielInfoResponse = await fetchApi({route: "api/ErvaringsDeskundige/profiel-info"});
			console.log(onderzoekTypesResponse);
			setInitialProfielInfoFromResponse(profielInfoResponse.data);
			setIsLoading(false);
		};

		fetchData();
	}, []);

	const handleBeperkingSelection = (selectedItems) => {
		setGekozenBeperkingItems(selectedItems);
		
	};

	const handleOnderzoekSelection = (selectedItems) => {
		setGekozenOnderzoekItems(selectedItems);
	};

	const handleSubmitForm = (event) => {
		const form = event.currentTarget;
		console.log("submit");
		event.preventDefault();
		if (form.checkValidity() === false) {
			event.stopPropagation();
			setFormIsValidated(true);

		}
		else {
			setError(null);
			setIsConfirming(true);
			setFormIsValidated(true);
		}
	};

	const handlePostNewData = async () => {
		const body = {
			telefoonnummer: telRef.current.value,
			hulpmiddelen: hulpmiddelenRef.current.value,
			comBenadering: comPartijenBenaderingRef.current.checked,
			portaalBenadering: portaalVoorkeurRef.current.checked,
			telefonischBenadering: telefonischVoorkeurRef.current.checked,
			beschikbaarheid: beschikbaarheidRef.current.value,
			aandoeningZiekte: aandoeningZiekteRef.current.value,
			beperkingTypes: [
				...gekozenBeperkingItems.map((item) => item.id)
			],
			onderzoekTypes: [
				...gekozenOnderzoekItems.map((item) => item.id)
			]
		}
		const response = await postApi({route: "api/Ervaringsdeskundige/edit-profiel-info", body}).catch((e) =>	{
			setError(<Alert variant="danger">
				{(e.response &&e.response.data) || e.toString()}
			</Alert>);
		});

		if (response && response.status == 200)
		{
			setError(<Alert variant="success">
				De bewerking was successvol!
			</Alert>);
			setIsConfirming(false);
		}
	};

	useEffect(() => {
		setFormIsValidated(true);
	}, []);


	return (
		<>
			{error}
			{isConfirming && <>
				<h3>Uw profiel wordt met de volgende informatie bijgewerkt: </h3>
				<Container>
					<Row>
						<Col md={16}>
							<Table striped bordered hover>
								<tbody className="confirm-data-table">
									<tr>
										<td>Telefoonnummer</td>
										<td>{telRef.current.value}</td>
									</tr>
									<tr>
										<td>Beperking Types</td>
										<td>{gekozenBeperkingItems && gekozenBeperkingItems.map((item) => <p key={item.id}>{item.naam}<br/></p>)}</td>
									</tr>
									<tr>
										<td>Hulpmiddelen</td>
										<td>{hulpmiddelenRef.current.value}</td>
									</tr>
									<tr>
										<td>Aandoening/Ziekte</td>
										<td>{aandoeningZiekteRef.current.value}</td>
									</tr>
									<tr>
										<td>Onderzoek Types</td>
										<td>{gekozenOnderzoekItems && gekozenOnderzoekItems.map((item) => <p key={item.id}>{item.type}<br/></p>)}</td>
									</tr>
									<tr>
										<td>Of commerciële partijen u mogen benaderen</td>
										<td>{comPartijenBenaderingRef.current.checked ? "ja" : "nee"}</td>
									</tr>
									<tr>
										<td>Portaal benaderen</td>
										<td>{portaalVoorkeurRef.current.checked ? "ja" : "nee"}</td>
									</tr>
									<tr>
										<td>Telefonisch benaderen</td>
										<td>{telefonischVoorkeurRef.current.checked ? "ja" : "nee"}</td>
									</tr>
									<tr>
										<td>Beschikbaarheid</td>
										<td>{beschikbaarheidRef.current.value}</td>
									</tr>
								</tbody>
							</Table>
						</Col>
					</Row>
				</Container>
				<Button onClick={() => handlePostNewData()}>Bevestigen</Button>
				<Button onClick={() => setIsConfirming(false)}>Terug</Button>
			</>}


			<div hidden={isConfirming || isLoading ? "hidden" : ""}>
				<br />
				<Form ref={formRef} validated={formIsValidated} onSubmit={handleSubmitForm}>
					<InputBar required min={8} inputRef={telRef} label="Telefoonnummer"/>
					{!isLoading && <MultiSelectionBar 
						label="Type beperkingen" 
						items={beperkingItems}
						handleSelection={handleBeperkingSelection}
						initialSelectedItems={initialBeperkingItems} 
						getKey={(option) => option.id} 
						getValue={(option) => option.naam}
					/>}
					<InputBar inputRef={hulpmiddelenRef} label="Hulpmiddelen"/>
					<InputBar inputRef={aandoeningZiekteRef} label="Aandoening/Ziekte"/>
					
					{!isLoading && <MultiSelectionBar 
						label="Type onderzoeken" 
						items={onderzoekTypeItems}
						handleSelection={handleOnderzoekSelection}
						initialSelectedItems={initialOnderzoekTypeItems} 
						getKey={(option) => option.id} 
						getValue={(option) => option.type}
					/>}

					<label htmlFor="com-benadering">Of commerciële partijen u mogen benaderen</label>
					<input ref={comPartijenBenaderingRef} type="checkbox" id="com-benadering" name="com-benadering-voorkeur"></input>

					<label htmlFor="portaal-benadering">Portaal benaderen</label>
					<input ref={portaalVoorkeurRef} type="checkbox" id="portaal-benadering" name="portaal-benadering-voorkeur"></input>

					<label htmlFor="telefonisch-benadering">Telefonisch benaderen</label>
					<input  ref={telefonischVoorkeurRef} type="checkbox" id="telefonisch-benadering" name="telefonisch-benadering-voorkeur"></input>

					<InputBar required={true} inputRef={beschikbaarheidRef} label="Beschikbaarheid"/>

					<Button type="submit">Bevestigen</Button>
				</Form>
			</div>
		</>
	);
};

export default ProfielErvaringsdeskundige;