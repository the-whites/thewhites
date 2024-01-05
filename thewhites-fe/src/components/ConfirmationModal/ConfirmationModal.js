import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmationModal = ({ show, handleClose, handleConfirm, title, htmlMessage }) => {
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div dangerouslySetInnerHTML={{ __html: htmlMessage }} />
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
				Annuleren
				</Button>
				<Button variant="primary" onClick={handleConfirm}>
				Bevestigen
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ConfirmationModal;