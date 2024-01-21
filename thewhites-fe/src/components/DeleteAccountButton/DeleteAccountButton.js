import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { postApi } from "../../hooks/useApi";
import { getToken } from "../AxiosInstance";

const DeleteAccountButton = () => {
	const [showModal, setShowModal] = useState(false);

	const handleDeleteAccount = async () => {
		let token = getToken();
		const response = await postApi({route: "/api/gebruiker/verwijder-account", body: token});
		sessionStorage.removeItem("ac_token");

		if (response.status === 200) {
			window.location.href = "/";
			console.log("Account deleted successfully");
		} else {
			console.error("Error while deleting account:", response.statusText);
		}
	};

	return (
		<>
			<Button variant="outline-danger" onClick={() => setShowModal(true)}>Verwijder account</Button>

			<ConfirmationModal title="Weet u het zeker?" show={showModal} handleClose={() => setShowModal(false)} handleConfirm={handleDeleteAccount}>
				<p>U bent op het punt om uw account <strong>permanent</strong> te verwijderen.
                    Dit betekent dat al uw ingevulde gegevens niet meer te herstellen vallen.</p>
				<p>Als u op de knop &apos;<strong>Bevestigen</strong>&apos; klikt, wordt u direct uitgelogd en wordt uw account verwijderd.</p>
				<p>Om uw account te behouden en dit scherm weg te halen, klik op de knop &apos;<strong>Annuleren</strong>&apos;.</p>
			</ConfirmationModal>
		</>
	);
};

export default DeleteAccountButton;
