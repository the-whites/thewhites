export const Validation = (profielData) => {
	const errors = {};

	const validateEmail = (email) => {
		const emailRegex = /\S+@\S+\.\S+/;
		if (!emailRegex.test(email)) {
			errors.emailadres = "Ongeldig e-mailadres";
			return false;
		}
		return true;
	};

	const validatePostcode = (postcode) => {
		const postcodeRegex = /^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/;
		if (!postcodeRegex.test(postcode)) {
			errors.postcode = "Ongeldige postcode";
			return false;
		}
		return true;
	};

	const validateTelefoon = (telefoonnummer) => {
		const telefoonRegex = /^06\d{8}$/;
		if (!telefoonRegex.test(telefoonnummer)) {
			errors.telefoonnummer = "Ongeldig telefoonnummer";
			return false;
		}
		return true;
	};

	const validateBeperkingType = (beperkingTypes) => {
		if
		(beperkingTypes.length === 0) {
			errors.beperkingTypes = "Er is geen type beperking geselecteerd";
			return false;
		}
		return true;
	};

	const isFormValid = () => {
		return (
			profielData.voornaam.length > 0 &&
            profielData.achternaam.length > 0 &&
            validateEmail(profielData.emailadres) &&
            validatePostcode(profielData.postcode) &&
            validateTelefoon(profielData.telefoonnummer) &&
            validateBeperkingType(profielData.beperkingTypes)
		);
	};

	return { isFormValid, errors };
};