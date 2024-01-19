import React from "react";
import "./Contact.css";

const Contact = () => {
	return (
		<div className="contact">
			<h1 className="header">Contact</h1>
			<p>Stichting Accessibility is gevestigd in het bedrijfsverzamelgebouw de Krammstate op</p>
			<p>een paar minuten lopen van Station Utrecht Overvecht.</p>
			<br></br>
			<h3 className="adres">Bezoek- en postadres:</h3>
			<p>Christiaan Krammlaan 2</p>
			<p>3571 AX Utrecht</p>
			<br></br>
			<h3 className="contact-opnemen">Contact opnemen:</h3>
			<p>Tel. +31 30 239 82 70</p>
			<p>E-mail: <a href="mailto:info@accessibility.nl">info@accessibilty.nl</a></p>
		</div>
	);
};
export default Contact;
