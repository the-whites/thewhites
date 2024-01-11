import React, { useEffect } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import InputBar from "../../../components/Inputbar/InputBar";
import MultiSelectionBar from "../../../components/MultiSelectionBar/MultiSelectionBar";

export const BewerkProfielForm = ({profielData, setProfielData = (items) => {}, formIsValidated = true, handleSubmitForm = (event) => {}, beperkingItems, onderzoekTypeItems}) => {


	return (
		<Form validated={formIsValidated} onSubmit={handleSubmitForm}>

			<InputBar 
				required 
				value={profielData?.telefoonnummer || ""} 
				handleChange={(value) => setProfielData({...profielData, telefoonnummer: value})} 
				min={8}
				label="Telefoonnummer"
			/>

			<MultiSelectionBar 
				label="Type beperkingen" 
				items={beperkingItems}
				handleSelection={(selectedItems) => setProfielData({...profielData, beperkingTypes: selectedItems})}
				initialSelectedItems={profielData.beperkingTypes} 
				getKey={(option) => option.id} 
				getValue={(option) => option.naam}
			/>

			<InputBar 
				label="Hulpmiddelen"
				value={profielData?.hulpmiddel || ""} 
				handleChange={(value) => setProfielData({...profielData, hulpmiddel: value})} 
			/>
			<InputBar
				label="Aandoening/Ziekte"
				value={profielData?.ziekte || ""} 
				handleChange={(value) => setProfielData({...profielData, ziekte: value})} 
			/>
					
			<MultiSelectionBar 
				label="Type onderzoeken" 
				items={onderzoekTypeItems}
				handleSelection={(selectedItems) => setProfielData({...profielData, onderzoekTypes: selectedItems})}
				initialSelectedItems={profielData.onderzoekTypes} 
				getKey={(option) => option.id} 
				getValue={(option) => option.type}
			/>

			<label htmlFor="com-benadering">Of commerciële partijen u mogen benaderen</label>
			<input 
				type="checkbox" 
				id="com-benadering" 
				name="com-benadering-voorkeur" 
				checked={profielData?.benaderingVoorkeur?.toestemmingUitnodigingen || false} 
				onChange={(event) => setProfielData({...profielData, benaderingVoorkeur: {...profielData.benaderingVoorkeur, toestemmingUitnodigingen: event.target.checked}})} 
			/>

			<label htmlFor="portaal-benadering">Portaal benaderen</label>
			<input 
				type="checkbox" 
				id="portaal-benadering" 
				name="portaal-benadering-voorkeur"
				checked={profielData?.benaderingVoorkeur?.portaal || false} 
				onChange={(event) => setProfielData({...profielData, benaderingVoorkeur: {...profielData.benaderingVoorkeur, portaal: event.target.checked}})} 
			/>

			<label htmlFor="telefonisch-benadering">Telefonisch benaderen</label>
			<input  
				type="checkbox" 
				id="telefonisch-benadering" 
				name="telefonisch-benadering-voorkeur"
				checked={profielData?.benaderingVoorkeur?.telefonisch || false} 
				onChange={(event) => setProfielData({...profielData, benaderingVoorkeur: {...profielData.benaderingVoorkeur, telefonisch: event.target.checked}})} 
			/>

			<InputBar 
				required={true} 
				label="Beschikbaarheid"
				value={profielData?.beschikbaarheid || ""} 
				handleChange={(value) => setProfielData({...profielData, beschikbaarheid: value})} 
			/>

			<Button type="submit">Opslaan</Button>
		</Form>
	);
};