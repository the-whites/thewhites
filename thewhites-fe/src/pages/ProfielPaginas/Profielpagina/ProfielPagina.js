import React, { useState, useEffect } from "react";
import "./ProfielPagina.css";
import { useNavigate } from "react-router-dom";

const ProfielPagina = () => {
	const [voornaam, setVoornaam] = useState(localStorage.getItem("voornaam") || "");
	const [achternaam, setAchternaam] = useState(localStorage.getItem("achternaam") ||"");
	const [postcode, setPostcode] = useState(localStorage.getItem("postcode") ||"");
	const [email, setEmail] = useState(localStorage.getItem("email") ||"");
	const [telefoonnummer, setTelefoonnummer] = useState(localStorage.getItem("telefoonnummer") ||"");
	const [beperkingstype, setBeperkingstype] = useState(localStorage.getItem("beperkingstype") ||"");

	useEffect(() => {
		// Update localStorage wanneer de state verandert
		localStorage.setItem("voornaam", voornaam);
		localStorage.setItem("achternaam", achternaam);
		localStorage.setItem("postcode", postcode);
		localStorage.setItem("email", email);
		localStorage.setItem("telefoonnummer", telefoonnummer);
		localStorage.setItem("beperkingstype", beperkingstype);
		// Doe dit voor alle andere velden...
	}, [voornaam, achternaam, postcode, email, telefoonnummer, beperkingstype]);

	const handleSubmit = (e) => {
		e.preventDefault();
		// Process the entered data here
		console.log({ voornaam, achternaam, postcode, email, telefoonnummer, beperkingstype });
	};

	const navigate = useNavigate();

	const handleForward = () => {
		navigate("/profielpaginas/profielinformatie");
	};

	return (
		<div className="profile-page">
			<h1>Profielformulier 1/2</h1>
			<form onSubmit={handleSubmit}>
				{/* Voornaam */}
				<div className="form-group">
					<label htmlFor="voornaam">Voornaam *</label>
					<input
						type="Algemeen"
						id="voornaam"
						value={voornaam}
						onChange={(e) => setVoornaam(e.target.value)}
						required
					/>
				</div>

				{/* Achternaam */}
				<div className="form-group">
					<label htmlFor="achternaam">Achternaam *</label>
					<input
						type="Algemeen"
						id="achternaam"
						value={achternaam}
						onChange={(e) => setAchternaam(e.target.value)}
						required
					/>
				</div>

				{/* Postcode */}
				<div className="form-group">
					<label htmlFor="postcode">Postcode *</label>
					<input
						type="Algemeen"
						id="postcode"
						value={postcode}
						onChange={(e) => setPostcode(e.target.value)}
						required
					/>
				</div>

				{/* E-mailadres */}
				<div className="form-group">
					<label htmlFor="email">E-mailadres *</label>
					<input
						type="Algemeen"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>

				{/* Telefoonnummer */}
				<div className="form-group">
					<label htmlFor="telefoonnummer">Telefoonnummer *</label>
					<input
						type="Algemeen"
						id="telefoonnummer"
						value={telefoonnummer}
						onChange={(e) => setTelefoonnummer(e.target.value)}
						placeholder="0612345678"
						required
					/>
				</div>

				{/* Type beperking */}
				<div className="form-group">
					<label htmlFor="beperkingstype">Type beperking (lijst) *</label>
					<select
						id="beperkingstype"
						value={beperkingstype}
						onChange={(e) => setBeperkingstype(e.target.value)}
						required
					>
						<option value="">Selecteer beperkingen</option>
						<option value="motor">Motorische beperking</option>
						<option value="visual">Visuele beperkingen</option>
						<option value="intellectual">Verstandelijke beperking</option>
						<option value="hearing">Gehoorverlies</option>
					</select>
				</div>

				<button type="submit" onClick={handleForward}>Volgende</button>
			</form>
		</div>
	);
};

export default ProfielPagina;

