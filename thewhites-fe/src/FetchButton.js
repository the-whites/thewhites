import React, { useState } from "react";

const FetchButton = () => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	const fetchData = async () => {
		try {
			const response = await fetch(process.env.REACT_APP_API_PATH + "api/Gebruiker/gebruikers");

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const result = await response.json();
			setData(result);
			setError(null);
		} catch (error) {
			console.error("Error fetching data:", error);
			setError("Error fetching data. Please try again.");
		}
	};

	return (
		<>
			<button onClick={fetchData}>Fetch Data</button>
			{error && <p style={{ color: "red" }}>{error}</p>}
			{data && (
				<div>
					<h2>Received Data:</h2>
					<pre>{JSON.stringify(data, null, 2)}</pre>
				</div>
			)}
		</>
	);
};

export default FetchButton;