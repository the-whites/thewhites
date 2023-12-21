import "./App.css";

import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home, OverOns, Contact } from "./pages/index";

import Navbar from "./components/Navbar";

function App() {
	return (
		<div className="App">
			<Navbar /> 
			<Routes>
				<Route path="/" element = {<Home />} />
				<Route path="/over-ons" element = {<OverOns />} />
				<Route path="/contact" element = {<Contact />} />
			</Routes>
		</div>
	);
}

export default App;
