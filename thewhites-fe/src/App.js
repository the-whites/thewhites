import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React, {createContext, useEffect, useState} from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import OverOns from "./pages/OverOns/OverOns";
import Contact from "./pages/Contact/Contact";


import NavigationBar from "./components/Navbar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AxiosInterceptors } from "./components/AxiosInstance";
import { fetchApi } from "./hooks/useApi";

export const CustomLoginContext = createContext("");
export const AuthContext = createContext("");

function App() {
	const [googleCredentials, setGoogleCredentials] = useState("");
	const [loggedin, setLoggedin] = useState(false);

	useEffect(() => {

		const fetchLoginStatus = async () => {
			const response = await fetchApi({route: "api/Login/profileInfo"}).catch(
				(error) => {
					console.log(error);
				}
			);

			if (response)
			{
				if (response.status == 200) {
					setLoggedin(true);
				}
				else if (response.status == 401) {
					setLoggedin(false);
				}
				else {
					setLoggedin(false);
					// send error?
				}
			}
		};

		fetchLoginStatus();
	});

	return (
		<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} >
			<div className="App">
				<AuthContext.Provider value={{loggedin, setLoggedin}}>
					<CustomLoginContext.Provider value={{googleCredentials, setGoogleCredentials}}>
						<NavigationBar /> 
						<Routes>
							<Route path="/" element = {<Home />} />
							<Route path="/over-ons" element = {<OverOns />} />
							<Route path="/contact" element = {<Contact />} />
						</Routes>
					</CustomLoginContext.Provider>
				</AuthContext.Provider>
			</div>
		</GoogleOAuthProvider>
	);
}

export default App;
