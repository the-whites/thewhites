import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import OverOns from "./pages/OverOns";
import Contact from "./pages/Contact";


import NavigationBar from "./components/Navbar";

import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
	return (
		<GoogleOAuthProvider clientId="712169306292-k3ch7qbttauabtsdh7p4sv0k1kthr2qg.apps.googleusercontent.com">
			<div className="App">
				<NavigationBar /> 
				<Routes>
					<Route path="/" element = {<Home />} />
					<Route path="/over-ons" element = {<OverOns />} />
					<Route path="/contact" element = {<Contact />} />
				</Routes>
			</div>
		</GoogleOAuthProvider>
	);
}

export default App;
