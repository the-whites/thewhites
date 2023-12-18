import "./App.css";
import React from "react";

function getData() {
	// Make a fetch request to the API endpoint
	fetch('http://richano.strangled.net:8066/api/Gebruiker/gebruikers')
		.then(response => {
			if (!response.ok) {
			throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then(data => {
			// Handle the data received from the API
			console.log('Data received:', data);
	
			// You can perform further actions with the data here
			// For example, update the UI with the received data
		})
		.catch(error => {
			console.error('There was a problem with the fetch operation:', error);
	});
}

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<button id="getDataButton" onClick={getData()}>Get User Data</button>
			</header>
		</div>
	);
}

export default App;
