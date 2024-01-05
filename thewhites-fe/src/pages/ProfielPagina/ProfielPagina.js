import React, { useState } from "react";
import "./ProfielPagina.css";

const ProfielPagina = () => {
	const [Telefoon, setTelefoon] = useState("");
	const [Beperkingstype, setBeperkingstype] = useState("");
	const [Hulpmiddelen, setHulpmiddelen] = useState("");
	const [Aandoening, setAandoening] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		// Process the entered data here
		console.log({ Telefoon, Beperkingstype, Hulpmiddelen, Aandoening });
	};

	return (
		<div className="profile-page">
			<h1>Profielpagina</h1>
			<h3>Profielformulier 1/2</h3>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="Telefoon">Telefoonnummer *</label>
					<p>Vul u telefoonnummer in de volgende format in : 0612345678</p>
					<input 
						type="Algemeen" 
						id="phone" 
						value={Telefoon}
						onChange={(e) => setTelefoon(e.target.value)}
						placeholder="0612345678"
						required 
					/>
				</div>
        
				<div className="form-group">
					<label htmlFor="Beperkingstype">Type beperking *</label>
					<select 
						type= "Algemeen"
						id="Beperkingstype" 
						value={Beperkingstype}
						onChange={(e) => setBeperkingstype(e.target.value)}
						placeholder="Selecteer beperkingen"
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
					<label htmlFor="Hulpmiddelen">Hulpmiddelen</label>
					<input 
						type= "Algemeen"
						id="Hulpmiddelen" 
						value={Hulpmiddelen}
						onChange={(e) => setHulpmiddelen(e.target.value)}
						placeholder="Rolstoel, gehoorapparaat"
						required 
					/>
				</div>

				<div className="form-group">
					<label htmlFor="Aandoening">Aandoening/ziekte *</label>
					<input 
						type="Algemeen" 
						id="Aandoening" 
						value={Aandoening}
						onChange={(e) => setAandoening(e.target.value)}
						placeholder="dyslexie, gehoorverlies"
						required 
					/>
				</div>

				<button type="submit">Volgende</button>
			</form>
		</div>
	);
};

export default ProfielPagina;
