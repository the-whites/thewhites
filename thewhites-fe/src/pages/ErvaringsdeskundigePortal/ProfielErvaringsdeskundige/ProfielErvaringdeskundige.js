import React, { useEffect, useRef, useState } from "react";
import InputBar from "../../../components/Inputbar/InputBar";
import { Form } from "react-router-dom";

import { fetchApi } from "../../../hooks/useApi";
import MultiSelectionBar, { MultiSelectionBarTwo } from "../../../components/MultiSelectionBar/MultiSelectionBar";
import { Dropdown } from "react-bootstrap";

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
	const [onderzoekTypeItems, setOnderzoekTypeItems] = useState([]);
	const [initialOnderzoekTypeItems, setInitialOnderzoekTypeItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

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
			}))

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


	return (
		<>
			<br />
			<InputBar inputRef={telRef} label="Telefoonnummer"/>
			{!isLoading && <MultiSelectionBar 
				label="Type beperking" 
				items={beperkingItems}
				initialSelectedItems={initialBeperkingItems} 
				getKey={(option) => option.id} 
				getValue={(option) => option.naam}
			/>}
			<InputBar inputRef={hulpmiddelenRef} label="Hulpmiddelen"/>
			<InputBar inputRef={aandoeningZiekteRef} label="Aandoening/Ziekte"/>
			
			{!isLoading && <MultiSelectionBar 
				label="Type beperking" 
				items={onderzoekTypeItems}
				initialSelectedItems={initialOnderzoekTypeItems} 
				getKey={(option) => option.id} 
				getValue={(option) => option.type}
			/>}

			<label htmlFor="com-benadering">Of commerciële partijen u mogen benaderen</label>
			<input ref={comPartijenBenaderingRef} type="checkbox" id="com-benadering" name="com-benadering-voorkeur"></input>

			<label htmlFor="portaal-benadering">Portaal benaderen</label>
			<input ref={portaalVoorkeurRef} type="checkbox" id="portaal-benadering" name="portaal-benadering-voorkeur"></input>

			<label htmlFor="telefonisch-benadering">Telefonisch benaderen</label>
			<input ref={telefonischVoorkeurRef} type="checkbox" id="telefonisch-benadering" name="telefonisch-benadering-voorkeur"></input>

			<InputBar inputRef={beschikbaarheidRef} label="Beschikbaarheid"/>
		</>
	);
};

export default ProfielErvaringsdeskundige;