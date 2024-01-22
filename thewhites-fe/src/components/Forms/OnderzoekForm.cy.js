import React from 'react'
import OnderzoekForm from './OnderzoekForm'
import { BrowserRouter } from 'react-router-dom'
import { ONDERZOEK_DATA } from "../../constants/onderzoekData";

describe('<OnderzoekForm />', () => {
  it('renders', () => {
    cy.fixture('onderzoekField').then((fixtureData) => {
		const { onderzoek } = fixtureData;

		// Date parsing werkte niet via fixture
		onderzoek[ONDERZOEK_DATA.START_DATUM] = new Date(2015, 1, 2);
		onderzoek[ONDERZOEK_DATA.EIND_DATUM] = new Date(2015, 1, 3);
		
    cy.mount(<BrowserRouter>
    			<OnderzoekForm onderzoek={onderzoek} buttonConfirmText="Test button tekst"/>
    		</BrowserRouter>)

	// Alle input fields
	cy.get('[data-cy=input-field-onderzoeknaam]').should('have.value', onderzoek[ONDERZOEK_DATA.NAAM]);
	cy.get('[data-cy=input-field-onderzoekomschrijving]').should('have.value', onderzoek[ONDERZOEK_DATA.OMSCHRIJVING]);
	cy.get('[data-cy=input-field-onderzoekinhoud]').should('have.value', onderzoek[ONDERZOEK_DATA.INHOUD]);
	cy.get('[data-cy=input-field-locatievanonderzoek]').should('have.value', onderzoek[ONDERZOEK_DATA.LOCATIE]);
	cy.get('[data-cy=input-field-beloning]').should('have.value', onderzoek[ONDERZOEK_DATA.BELONING]);
	cy.get('[data-cy=input-field-uitstellenopleeftijd]').should('have.value', '10, 50-77');
	cy.get('[data-cy=input-field-postcode').should('have.value', "2255GW");
	
	// Dates
	const formatDate = (date) => `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
	
	cy.get('[id=datepicker-startdatum]').should('have.value', formatDate(onderzoek[ONDERZOEK_DATA.START_DATUM]));
	cy.get('[id=datepicker-einddatum]').should('have.value', formatDate(onderzoek[ONDERZOEK_DATA.EIND_DATUM]));

	// Buttons
	cy.get('[data-cy=onderzoek-button-confirm]').should('have.text', 'Test button tekst');
	cy.get('[data-cy=onderzoek-button-cancel]').should('have.text', 'Terug');
	
  })})
})