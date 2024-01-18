import React, { useContext, useEffect,useCallback, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import InputBar from "../../components/Inputbar/InputBar";
import { useNavigate } from "react-router-dom";
import MultiSelectionBar from "../../components/MultiSelectionBar/MultiSelectionBar";
import { ProfielContext } from "../../contexts/UserProvider";
import { fetchApi } from "../../hooks/useApi";
import "./Medischepagina.css"; 

const medischepagina = () => {
	const { profielData, setProfielData } = useContext(ProfielContext);
	const navigate = useNavigate();
	const [onderzoekTypes, setOnderzoekTypes] = useState([]);
	const [akkoordprivacyverklaring, setAkkoordprivacyverklaring] = useState(false);

	const navigateBack = () => {
		navigate("/profielPagina");
	};

	useEffect(() => {
		const fetch = async () => {
			const onderzoekTypesResponse = await fetchApi({route: "api/OnderzoekType/onderzoek-types"});

			setOnderzoekTypes(Object.values(onderzoekTypesResponse.data).map(item => {
				return {id: item.id, type: item.type};
			}));
		};
		fetch();
	}, []);

	const updateProfielData = useCallback((name, value) => {
		setProfielData(prevState => ({ ...prevState, [name]: value }));
	}, [setProfielData]);


	const handleSubmitForm = (event) => {
		event.preventDefault();
		navigate("/bevestingsPagina"); 
	};
	

	return (
		<Form validated={true} onSubmit={handleSubmitForm}>
			<Container>
				<h2>Profiel pagina 2/2</h2>
				<p>Vul hieronder u medische gegevens in</p>
				<Row className="persoonlijkegegevens">
					<InputBar 
						label="Aandoening/ziekte" 
						required 
						value={profielData.aandoening || ""} 
						handleChange={(value) => updateProfielData("aandoening", value)} 
					/>
					<InputBar 
						label="Hulpmiddelen" 
						required 
						value={profielData.hulpmiddelen || ""} 
						handleChange={(value) => updateProfielData("hulpmiddelen", value)} 
					/>

					<MultiSelectionBar 
						label="Type onderzoeken" 
						items={onderzoekTypes}
						handleSelection={(selectedItems) => { 
							console.log(selectedItems);
							return updateProfielData("onderzoekTypes", selectedItems);
						}}
						initialSelectedItems={profielData.onderzoekTypes} 
						getKey={(option) => option.id} 
						getValue={(option) => option.type}
					/>
					<div className="bewerk-profiel-checkbox">
						<label htmlFor="portaal-benadering">Portaal benaderen</label>
						<input 
							type="checkbox" 
							id="portaal-benadering" 
							name="portaal-benadering-voorkeur"
							checked={profielData.portaalbenadering || false} 
							onChange={(event) => updateProfielData("portaalbenadering", event.target.checked)}
						/>
					</div>

					<div className="bewerk-profiel-checkbox">
						<label htmlFor="telefonisch-benadering">Telefonisch benaderen</label>
						<input  
							type="checkbox" 
							id="telefonisch-benadering" 
							name="telefonisch-benadering-voorkeur"
							checked={profielData.telefonischBenadering || false} 
							onChange={(event) => updateProfielData("telefonischBenadering", event.target.checked)}
						/>
					</div>

					<InputBar 
						label="Beschikbaar" 
						required 
						value={profielData.beschikbaar || ""} 
						handleChange={(value) => updateProfielData("beschikbaar", value)} 
					/>
	
					<div className="bewerk-profiel-checkbox">
						<label htmlFor="com-benadering">Of commerciële partijen u mogen benaderen</label>
						<input 
							type="checkbox" 
							id="com-benadering" 
							name="com-benadering-voorkeur" 
							checked={profielData.toestemmingUitnodigingen || false}  
							onChange={(event) => updateProfielData("toestemmingUitnodigingen", event.target.checked)}
						/>
					</div>	
					
					<div className="bewerk-profiel-checkbox">
						<label htmlFor="akkoord-privacy">Akkoord met privacyverklaring</label>
						<input 
							type="checkbox" 
							id="akkoord-privacy" 
							name="akkoord-met-privacy" 
							checked={akkoordprivacyverklaring}  
							onChange={(event) => setAkkoordprivacyverklaring(event.target.checked)}	
							required
						/>
					</div>	

					<p>U vindt de privacyverklaring <a href="#">hier</a></p>				
				</Row>
				<div className="button-container">
					<Button variant="secondary" type="button" onClick={navigateBack} className="button-spacing">Terug</Button>
					<Button type="submit">Volgende</Button>
				</div>
				
			</Container>
		</Form>
	);
};

export default medischepagina;