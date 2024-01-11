export const getTimeLeft = (date) => {
	const timeleft = date - new Date().getTime();

	const days = timeleft / (1000 * 60 * 60 * 24);

	const hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));

	return { days: (days < 0 ? Math.ceil(days) : Math.floor(days)), hours, minutes };
};

export const formatDateText = (date) => {
	const { days, hours, minutes } = getTimeLeft(date);
	// Kan dit beter?
	switch (true) {
	case days > 0:
		return `over ${days} dag${days !== 1 ? "en" : ""}`;
	case days < 0:
		return `${-days} dag${-days !== 1 ? "en" : ""} geleden`;  // -days om het positief te maken, voeg "en" toe als het meerdere dagen zijn
	case hours > 0:
		return `over ${hours} uur`;
	case hours < 0:
		return `${-hours} uur geleden`;
	case minutes > 0:
		return `over ${minutes} minuten`;
	case minutes === 1:
		return "over 1 minuut";
	case minutes === -1:
		return "1 minuut geleden";
	case minutes < 0:
		return `${-minutes} minuten geleden`;
	default:
		return "Nu";
	}
};  