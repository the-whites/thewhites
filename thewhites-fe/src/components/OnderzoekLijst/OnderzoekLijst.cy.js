import React from 'react';
import OnderzoekLijst from './OnderzoekLijst';

describe('<OnderzoekLijst />', () => {
  const onderzoekList = [
    {
      id: 1,
      titel: "A onderzoek",
      startDatum: new Date(2022, 0, 1, 12, 0, 0),
      eindDatum: new Date(2022, 1, 1, 12, 0, 0),
    },
    {
      id: 2,
      titel: "F onderzoek",
      startDatum: new Date(2022, 2, 1, 12, 0, 0),
      eindDatum: new Date(2025, 3, 1, 12, 0, 0),
    },
    {
      id: 3,
      titel: "5 onderzoek",
      startDatum: new Date(2021, 2, 1, 12, 0, 0),
      eindDatum: new Date(2020, 3, 1, 12, 0, 0),
    },
  ];

  it('renders and tests sorting by titel', () => {
    cy.mount(<OnderzoekLijst onderzoekLijst={onderzoekList} />);

    cy.get('#sort-icon').should('exist').click();

    cy.get('[data-cy=onderzoeken-preview-div] h3').then(($titles) => {
      expect($titles.eq(0)).to.contain('F onderzoek');
      expect($titles.eq(1)).to.contain('A onderzoek');
      expect($titles.eq(2)).to.contain('5 onderzoek');
    });
  });
});
