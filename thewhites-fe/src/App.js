import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React, {createContext, useState} from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import OverOns from "./pages/OverOns/OverOns";
import Contact from "./pages/Contact/Contact";
import BeheerderPortal from "./pages/BeheerderPortal/BeheerderPortal";

import NavigationBar from "./components/Navbar/Navbar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import useUpdateLoginState from "./hooks/useUpdateLoginState";

export const CustomLoginContext = createContext("");
export const AuthContext = createContext("");

function App() {
	const [googleCredentials, setGoogleCredentials] = useState("");
	const [loggedIn, setLoggedIn] = useState(false);

	useUpdateLoginState(loggedIn, setLoggedIn);

	return (
		<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} >
			<div className="App">
				<AuthContext.Provider value={{loggedIn, setLoggedIn}}>
					<CustomLoginContext.Provider value={{googleCredentials, setGoogleCredentials}}>
						<NavigationBar /> 
						<Routes>
							<Route path="/" element = {<Home />} />
							<Route path="/over-ons" element = {<OverOns />} />
							<Route path="/contact" element = {<Contact />} />
							<Route path="/beheerder" element={<BeheerderPortal />} />
						</Routes>
					</CustomLoginContext.Provider>
				</AuthContext.Provider>
			</div>
		</GoogleOAuthProvider>
	);
}

export default App;
