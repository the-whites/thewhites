import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import OverOns from "./pages/OverOns/OverOns";
import Contact from "./pages/Contact/Contact";


import NavigationBar from "./components/Navbar/Navbar";

import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
	return (
		<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} >
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
