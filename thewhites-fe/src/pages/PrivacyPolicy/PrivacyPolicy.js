import React from "react";
import "./PrivacyPolicy.css";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const PrivacyPolicy = () => {
	return (
		<Container md className="privacy-policy">
			<br />
			<h1>Privacy Verklaring</h1>
			{/* Algemeen */}
			<Row>
				<Col md={10}>
					<h2 className="algemeen">Algemeen</h2>
					<p>Stichting Accessibility stelt de beveiliging en het gebruik van uw gegevens op prijs. <br /> 
						<br />
                        Wij vinden het erg belangrijk dat we zo transparant mogelijk zijn met mensen met beperkingen  over hun gegevens op onze diensten: <br /> 
						<ul></ul>
						<li>visuele beperking</li>
						<li>verstandelijke beperking</li>
						<li>gehoorverlies</li>
						<br />
                        Onze dienst bestaat uit de website. Op deze website hanteren we de Algemene verordening gegevensbescherming (AVG) wet om te voldoen aan het bovenstaande. </p>
				</Col>
			</Row>

			{/* Grondslagen AVG */}
			<Row id="grondslagen">
				<Col md={10}>
					<h2>Grondslagen AVG</h2>
					<p>Stichting Accessibility baseert het gebruik van persoonsgegevens op grondslagen uit artikel 6 van de AVG. </p>
					<h6>Op onze website maken we gebruik van de volgende grondslagen: </h6>
					<ul></ul>                        
					<li>Stichting Accessibility heeft toestemming van de persoon om wie het gaat (Grondslag toestemming)</li> 
					<li>Het is noodzakelijk om gegevens te verwerken om een overeenkomst uit te voeren (Grondslag overeenkomst) </li> <br />
					<p>We hebben bijvoorbeeld toestemming nodig van een ouder/verzorger/voogd om een profiel aan te kunnen maken op onze website met de gegevens van u (en uw ouder/verzorger/voogd).
                        Verder kan het zo zijn dat we benodigde contactgegevens nodig hebben om u te laten deelnemen aan een onderzoek waarbij er een fysieke deelname nodig is. </p>
				</Col>
			</Row>

			{/* Verzameling van gegevens */}
			<Row id="verzameling-gegevens">
				<Col md={10}>
					<h2>Verzameling van gegevens</h2>
					<ul></ul>
					<li>Voornaam, achternaam:</li> 
					<p>Als u een account aanmaakt willen we graag dat u een voor- en achternaam invult zodat we weten om welk persoon het gaat.</p>
					<li>Leeftijd:</li>
					<p>Graag hebben we uw leeftijdscategorie (minderjarigen, jongvolwassenen, ouderen) geregistreerd zodat we eventuele hulpmiddelen kunnen afstellen op uw leeftijd. </p>
					<li>Postcode:</li> 
					<p>Graag hebben we uw postcode en eventueel huisnummer zodat we onderzoeksresultaten kunnen opsturen naar u. Of medicijnen en hulpmiddelen bijvoorbeeld.</p>
					<li>E-mailadres: </li>
					<p>We willen graag uw email geregistreerd hebben zodat we u kunnen benaderen bij belangrijke updates van onze diensten, zoals een privacyverklaringsupdate. Ook gebruiken we uw e-mail (als er toestemming naar gegeven is) om u op de hoogte te stellen van uitnodigingen naar passende onderzoeken. </p>
					<li>Telefoonnummer:</li>
					<p>We willen u graag telefonisch kunnen bereiken over eventuele onderzoeken van u. We geven u wel de keuze of u gebruik wilt maken van deze mogelijkheid.</p>
					<li>Type beperking</li>
					<li>Voorkeur benadering (Telefonisch of alleen via portal):</li>
					<li>Of commerciële partijen deze participant mogen benaderen:</li>
					<li>Op welke tijden gedurende de week de participant wel of niet beschikbaar is:</li>
					<br /> 
					<br />
					<br />
					<h6>De volgende (persoons)gegevens gebruiken we voornamelijk om aanbevelingen te doen over welke onderzoeken passen: </h6>
					<ul></ul>
					<li>Welke hulpmiddelen deze persoon gebruikt </li>
					<li>Aandoening/Ziekte </li>
					<li>Type onderzoek waaraan men wil deelnemen</li>
					<p>(Interview, Groepsgesprekken, Online onderzoek, Engelstalig onderzoek) </p>
					<li>Voorkeur benadering (Telefonisch of alleen via portal):</li>
					<p>We willen dat u invult wat uw voorkeur is voor benadering zodat wij dit kunnen respecteren en erop in kunnen spelen. U krijgt de keuze om telefonisch benaderd te worden of alleen via de portal.</p>
					<li>Of commerciële partijen deze participant mogen benaderen:</li>
					<p>We willen dat u aangeeft of commerciële partijen u mogen benaderen voor eventuele interviews of onderzoeken. De keuze staat standaard op “ja”, maar u kunt dit eenvoudig aanpassen als u hier geen interesse in heeft.</p>
					<li>Op welke tijden gedurende de week de participant wel of niet beschikbaar is:</li>
					<p>Uw beschikbaarheid is nuttig voor ons en bedrijven zodat we u niet benaderen in ongelegen momenten. Dit voorkomt overlast en onnodige situaties.</p>
					<p>Het is belangrijk om te weten dat u al deze gegevens zelf kunt invullen bij het aanmaken van een profiel, maar dit kan ook gedaan worden a.d.h.v. andere sociale diensten, zoals Google, LinkedIn, Facebook etc. Houdt er rekening mee dat we vanuit deze diensten van derden alleen opvragen wat we normaal van u vragen als u tijdens het registreren de informatie zelf invult. </p>
				</Col>
			</Row>

			{/* Persoonsgegevens delen met derden */}
			<Row id="delen-met-derden">
				<Col md={10}>
					<h2>Persoonsgegevens delen met derden binnen en buiten de EU</h2>
					<p>We delen uw persoonsgegevens niet met derden anders dan de bedrijven die de onderzoeken aangemaakt hebben. Uw persoonsgegevens worden nooit buiten de EU gedeeld en worden alleen met bedrijven binnen de EU gedeeld. Als we persoonsgegevens met deze bedrijven delen, zijn het voornamelijk contactgegevens (e-mail, telefoonnummer als u hier toestemming voor geeft) die van belang zijn om het onderzoek op gang te brengen. Denk aan groepsgesprekken of interviews die fysiek worden afgenomen. </p>
				</Col>
			</Row>

			{/* Privacy rechten van gebruikers */}
			<Row id="privacy-rechten">
				<Col md={10}>
					<h2>Privacy rechten van gebruikers</h2>
					<ul></ul>
					<li>Toegang tot uw gegevens:</li>
					<p>U heeft het recht om toegang te krijgen tot de persoonlijke informatie die we over u hebben verzameld. Dit omvat informatie zoals uw naam, e-mailadres, postcode, telefoonnummer en andere gegevens die u hebt verstrekt bij registratie.</p>
					<li>Corrigeren van gegevens: </li>
					<p>Verwijdering van gegevens: U heeft het recht om te verzoeken om verwijdering van uw persoonlijke gegevens. Deze gegevens worden vervolgens volledig verwijderd en zijn niet meer terug te krijgen. Als u uw account besluit te verwijderen tijdens een deelname bij een lopend onderzoek is het volgende om op te merken: </p>
					<li>Gevolgen voor lopend onderzoek:</li>
					<p>Het verwijderen van uw account tijdens deelname aan een lopend onderzoek kan leiden tot beëindiging van uw betrokkenheid bij dat specifieke onderzoek. Uw gegevens kunnen niet langer worden gebruikt voor dat onderzoek.</p>
					<li>Klachten:</li>
					<p>Als u van mening bent dat uw rechten met betrekking tot uw persoonlijke gegevens zijn geschonden, heeft u het recht om een klacht in te dienen bij de Autoriteit Persoonsgegevens</p>
					<li>Bewaartermijn gegevens:</li>
					<p>Wij bewaren uw persoonlijke gegevens in overeenstemming met de toepasselijke wet- en regelgeving met betrekking tot gegevensbescherming. De bewaartermijnen kunnen variëren, afhankelijk van de aard van de informatie en de specifieke wettelijke vereisten. </p> <br />
					<h6>In het algemeen gelden de volgende bewaartermijnen: </h6>
					<li>Registratiegegevens: </li>
					<p>Uw registratiegegevens worden bewaard zolang dit noodzakelijk is voor de doeleinden waarvoor ze zijn verzameld en in overeenstemming met de wettelijke verplichtingen. Indien u besluit uw account te verwijderen, zullen we uw persoonlijke gegevens zo snel mogelijk verwijderen. Voor inactieve gebruikersaccounts behouden wij ons het recht voor om de persoonlijke gegevens te verwijderen na een periode van 16 maanden, om de bescherming van gegevens te waarborgen. </p>
					<li>Bedrijfsgegevens: </li>
					<p>Gegevens van bedrijven wordt bewaard zolang het bedrijf actief gebruikmaakt van onze webapplicatie en in overeenstemming met de wettelijke vereisten. Indien het bedrijf besluit de samenwerking te beëindigen, zullen we de bedrijfsinformatie zo snel mogelijk verwijderen.</p>
				</Col>
			</Row>

			{/* Beveiliging van gegevens */}
			<Row id="beveiliging-van-gegevens">
				<Col md={10}>
					<h2>Beveiliging van gegevens</h2>
					<p>Bij Stichting Accessibility staat privacy hoog in het vaandel. We treffen zorgvuldige technische en organisatorische maatregelen om ervoor te zorgen dat uw gegevens veilig blijven. Onze website waarborgt beveiligde verbindingen via certificaten en versleutelt gegevens tijdens verzending. Organisatorisch beperken we toegang tot wat strikt noodzakelijk is. Bedrijven krijgen alleen toegang tot persoonsgegevens van ervaringsdeskundigen als dit relevant is voor deelname aan gerelateerde onderzoeken. Stichting Accessibility beheert persoonsgegevens en onderzoeken, met aandacht voor privacy en naleving van wetten. </p>
				</Col>
			</Row>

			{/* Datalek */}
			<Row id="datalek">
				<Col md={10}>
					<h2>Datalek</h2>
					<p>In het geval dat er een datalek (een beveiligingsincident waarbij derden toegang hebben tot gegevens waar zij niet voor bevoegd zijn) of een vermoeden ervan, kun je het melden via onze contactgegevens. U vindt de contactgegevens onderaan de privacyverklaring. 
                        Wij zullen zelf achter de schermen maatregelen nemen om dit ten eerste zo snel mogelijk te melden aan Autoriteit Persoongegevens (AP). Dit doen we samen met een documentatie van de getroffen gegevens, zodat we zo transparant mogelijk zijn in de redenen en gevolgen en dat we strategisch de datalek kunnen herstellen. </p>
				</Col>
			</Row>

			{/* Contact */}
			<Row id="contact">
				<Col md={10}>
					<h2>Contact</h2>
					<p>Bij enige onduidelijkheden bij het lezen van deze verklaring of andere belangrijke zaken, kunt u contact opnemen met ons.</p>
					<br />
					<h6>Bezoek- en postadres: </h6>
					<p>Christiaan Krammlaan 2 <br />
                        3571 AX Utrecht <br /> <br />
                        Tel. +31 30 239 82 70 <br />
                        E-mail: info@accessibility.nl
					</p>
				</Col>
			</Row>
		</Container>



	);
};

export default PrivacyPolicy;