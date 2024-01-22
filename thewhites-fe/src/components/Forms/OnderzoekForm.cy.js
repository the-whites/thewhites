import React from 'react'
import OnderzoekForm from './OnderzoekForm'
import { BrowserRouter } from 'react-router-dom'
import { ONDERZOEK_DATA } from "../../constants/onderzoekData";

describe('<OnderzoekForm />', () => {
  it('renders', () => {
    const startDate = new Date(2021, 1, 1, 12, 0, 0);
	const endDate = new Date(2022, 1, 1, 12, 0, 0);
	const testOnderzoek = {
		[ONDERZOEK_DATA.NAAM]: "Test onderzoek naam",
		[ONDERZOEK_DATA.OMSCHRIJVING]: "Test omschrijving",
		[ONDERZOEK_DATA.INHOUD]: "Test inhoud",
		[ONDERZOEK_DATA.TYPE_ONDERZOEK]: [], // kan niet met API testen
		[ONDERZOEK_DATA.BEPERKING]: [],
		[ONDERZOEK_DATA.LEEFTIJD]: [
			{
				minLeeftijd: 10,
				maxLeeftijd: 10
			},
			{
				minLeeftijd: 50,
				maxLeeftijd: 77
			}
		],
		[ONDERZOEK_DATA.POSTCODE]: [
			{
				postcode: "2255GW"
			}
		],
		[ONDERZOEK_DATA.START_DATUM]: startDate,
		[ONDERZOEK_DATA.EIND_DATUM]: endDate,
		[ONDERZOEK_DATA.LOCATIE]: "Test locatie",
		[ONDERZOEK_DATA.BELONING]: "Test beloning"
	}
    cy.mount(<BrowserRouter>
    			<OnderzoekForm onderzoek={testOnderzoek} buttonConfirmText="Test button tekst"/>
    		</BrowserRouter>)

	// Alle input fields
	cy.get('[data-cy=input-field-onderzoeknaam]').should('have.value', testOnderzoek[ONDERZOEK_DATA.NAAM]);
	cy.get('[data-cy=input-field-onderzoekomschrijving]').should('have.value', testOnderzoek[ONDERZOEK_DATA.OMSCHRIJVING]);
	cy.get('[data-cy=input-field-onderzoekinhoud]').should('have.value', testOnderzoek[ONDERZOEK_DATA.INHOUD]);
	cy.get('[data-cy=input-field-locatievanonderzoek]').should('have.value', testOnderzoek[ONDERZOEK_DATA.LOCATIE]);
	cy.get('[data-cy=input-field-beloning]').should('have.value', testOnderzoek[ONDERZOEK_DATA.BELONING]);
	cy.get('[data-cy=input-field-uitstellenopleeftijd]').should('have.value', '10, 50-77');
	cy.get('[data-cy=input-field-postcode').should('have.value', "2255GW");

	// Dates
	const formatDate = (date) => `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

	cy.get('[id=datepicker-startdatum]').should('have.value', formatDate(startDate));
	cy.get('[id=datepicker-einddatum]').should('have.value', formatDate(endDate));

	// Buttons
	cy.get('[data-cy=onderzoek-button-confirm]').should('have.text', 'Test button tekst');
	cy.get('[data-cy=onderzoek-button-cancel]').should('have.text', 'Terug');
  })
})