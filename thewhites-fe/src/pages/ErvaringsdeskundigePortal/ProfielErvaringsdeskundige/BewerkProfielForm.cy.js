import React from 'react'
import { BewerkProfielForm } from './BewerkProfielForm'

describe('<BewerkProfielForm />', () => {
  it('renders', () => {
    cy.fixture('profileData').then((fixtureData) => {
      const { testProfileData } = fixtureData;

    cy.mount(<BewerkProfielForm profielData={testProfileData} />)
    cy.get('[data-cy=input-field-telefoonnummer]').should('have.value', testProfileData.telefoonnummer);
    cy.get('[data-cy=input-field-aandoening-ziekte]').should('have.value', testProfileData.ziekte);
    cy.get('[data-cy=input-field-beschikbaarheid]').should('have.value', testProfileData.beschikbaarheid);
    cy.get('[data-cy=input-field-hulpmiddelen]').should('have.value', testProfileData.hulpmiddel);
  })
})
})