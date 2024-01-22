import React from 'react';
import OnderzoekLijst from './OnderzoekLijst';

describe('<OnderzoekLijst />', () => {
  it('renders and tests sorting by titel', () => {
    cy.fixture('onderzoekList').then((fixtureData) => {
      const { onderzoekList} = fixtureData;

    cy.mount(<OnderzoekLijst onderzoekLijst={onderzoekList} />);

    cy.get('#sort-icon').should('exist').click();

    cy.get('[data-cy=onderzoeken-preview-div] h3').then(($titles) => {
      expect($titles.eq(0)).to.contain('F onderzoek');
      expect($titles.eq(1)).to.contain('A onderzoek');
      expect($titles.eq(2)).to.contain('5 onderzoek');
    });
  });
});
});
