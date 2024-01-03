import React, { useState } from "react";
import "./ProfielPagina.css"; // Make sure this path is correct

const ProfielPagina = () => {
	const [phone, setPhone] = useState("");
	const [disabilityType, setDisabilityType] = useState("");
	const [aid, setAid] = useState("");
	const [condition, setCondition] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		// Process the entered data here
		console.log({ phone, disabilityType, aid, condition });
	};

	return (
		<div className="profile-page">
			<h2>Registratieformulier 1/2</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="phone">Telefoonnummer *</label>
					<input 
						type="tel" 
						id="phone" 
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						placeholder="0612345678"
						required 
					/>
				</div>
        
				<div className="form-group">
					<label htmlFor="disabilityType">Type beperking *</label>
					<select 
						id="disabilityType" 
						value={disabilityType}
						onChange={(e) => setDisabilityType(e.target.value)}
						required
					>
						<option value="">Selecteer beperkingen</option>
						<option value="motor">Motorische beperking</option>
						<option value="visual">Visuele beperkingen</option>
						<option value="intellectual">Verstandelijke beperking</option>
						<option value="hearing">Gehoorverlies</option>
					</select>
				</div>

				<div className="form-group">
					<label htmlFor="aid">Hulpmiddelen</label>
					<textarea 
						id="aid" 
						value={aid}
						onChange={(e) => setAid(e.target.value)}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="condition">Aandoening/ziekte *</label>
					<input 
						type="text" 
						id="condition" 
						value={condition}
						onChange={(e) => setCondition(e.target.value)}
						required 
					/>
				</div>

				<button type="submit">Volgende</button>
			</form>
		</div>
	);
};

export default ProfielPagina;
