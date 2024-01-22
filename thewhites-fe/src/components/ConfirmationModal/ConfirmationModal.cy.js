import React from "react";
import ConfirmationModal from "./ConfirmationModal";

describe("<ConfirmationModal />", () => {
	it("renders", () => {
		// see: https://on.cypress.io/mounting-react
		cy.mount(<ConfirmationModal show={true} handleClose={null} handleConfirm={null} title="Test titel">Test body</ConfirmationModal>);

		// Assert that the modal is visible
		cy.get(".modal").should("be.visible");

		// Perform actions in the modal
		cy.get(".modal-title").should("have.text", "Test titel");
		cy.get(".modal-body").should("contain.text", "Test body");
	});
});