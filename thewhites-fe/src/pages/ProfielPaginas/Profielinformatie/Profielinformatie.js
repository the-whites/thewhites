import React, { useState } from "react";
import "./Profielinformatie.css";
import { useNavigate } from "react-router-dom";

const Profielinformatie = () => {
	const [aandoening, setAandoening] = useState("");
	const [hulpmiddelen, setHulpmiddelen] = useState("");
	const [onderzoekType, setOnderzoekType] = useState("");
	const [benaderingsvoorkeur, setBenaderingsvoorkeur] = useState("");
	const [beschikbaarheid, setBeschikbaarheid] = useState(""); // Je zou hier een date-time picker kunnen integreren
	const [toestemmingCommercieel, setToestemmingCommercieel] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		// Process the entered data here
		console.log({ aandoening, hulpmiddelen, onderzoekType, benaderingsvoorkeur, beschikbaarheid, toestemmingCommercieel });
	};

	const navigate = useNavigate();

	const handleBack = () => {
		navigate("/profielpaginas/profielpagina");
	};
	

	return (
		<div className="profile-info-page">
			<h1>Profielinformatie 2/2</h1>
			<form onSubmit={handleSubmit}>
				{/* Aandoening/Ziekte */}
				<div className="form-group">
					<label htmlFor="aandoening">Aandoening/Ziekte *</label>
					<input 
						type="Algemeen" 
						id="aandoening" 
						value={aandoening}
						onChange={(e) => setAandoening(e.target.value)}
						required 
					/>
				</div>

				{/* Gebruikte hulpmiddelen */}
				<div className="form-group">
					<label htmlFor="hulpmiddelen">Gebruikte Hulpmiddelen</label>
					<input 
						type="Algemeen" 
						id="hulpmiddelen" 
						value={hulpmiddelen}
						onChange={(e) => setHulpmiddelen(e.target.value)}
					/>
				</div>

				{/* Type onderzoek */}
				<div className="form-group">
					<label htmlFor="onderzoekType">Type onderzoek *</label>
					<input 
						type="Algemeen" 
						id="onderzoekType" 
						value={onderzoekType}
						onChange={(e) => setOnderzoekType(e.target.value)}
						required 
					/>
				</div>

				{/* Voorkeur voor benaderingswijze */}
				<div className="form-group">
					<label htmlFor="benaderingsvoorkeur">Voorkeur voor benaderingswijze *</label>
					<input 
						type="Algemeen" 
						id="benaderingsvoorkeur" 
						value={benaderingsvoorkeur}
						onChange={(e) => setBenaderingsvoorkeur(e.target.value)}
						required 
					/>
				</div>

				{/* Beschikbaarheid gedurende de week */}
				<div className="form-group">
					<label htmlFor="beschikbaarheid">Beschikbaarheid *</label>
					<input 
						type="Algemeen" // Hier zou je een date-time picker component kunnen integreren
						id="beschikbaarheid" 
						value={beschikbaarheid}
						onChange={(e) => setBeschikbaarheid(e.target.value)}
						required 
					/>
				</div>

				{/* Toestemming voor benadering door commerciële partijen */}
				<div className="form-group">
					<label htmlFor="toestemmingCommercieel">Mogen commerciële partijen u benaderen? *</label>
					<input 
						type="Algemeen" 
						id="toestemmingCommercieel" 
						checked={toestemmingCommercieel}
						onChange={(e) => setToestemmingCommercieel(e.target.checked)}
					/>
				</div>

				<button type="submit">Opslaan</button>
				<button type="submit" onClick={handleBack}>Terug</button>
			</form>
		</div>
	);
};

export default Profielinformatie;

