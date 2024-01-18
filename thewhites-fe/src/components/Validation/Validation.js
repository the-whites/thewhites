import { postcodeValidator } from "postcode-validator";

export const validation = (profielData) => {
	const errors = {};

	const validatePostcode = (postcode) => {
		if (!postcodeValidator(postcode, "NL")) 
		{
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
            validatePostcode(profielData.postcode) &&
            validateTelefoon(profielData.telefoonnummer) &&
            validateBeperkingType(profielData.beperkingTypes)
		);
	};

	return { isFormValid, errors };
};