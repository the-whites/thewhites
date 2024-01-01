import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React, {createContext, useState} from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import OverOns from "./pages/OverOns/OverOns";
import Contact from "./pages/Contact/Contact";
import BeheerderPortal from "./pages/BeheerderPortal/BeheerderPortal";
import Ervaringsdeskundige from "./pages/BeheerderPortal/Ervaringsdeskundige/Ervaringsdeskundige";
import Onderzoeken from "./pages/BeheerderPortal/Onderzoeken/Onderzoeken";
import Bedrijven from "./pages/BeheerderPortal/Bedrijven/Bedrijven";
import DefaultBeheerderPage from "./pages/BeheerderPortal/DefaultBeheerderTab/DefaultBeheerderTab";

import NavigationBar from "./components/Navbar/Navbar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import useUpdateLoginState from "./hooks/useUpdateLoginState";
import { UserProvider } from "./contexts/UserContext";

export const CustomLoginContext = createContext("");
export const AuthContext = createContext("");

function App() {
	const [googleCredentials, setGoogleCredentials] = useState("");
	const [loggedIn, setLoggedIn] = useState(false);

	useUpdateLoginState(loggedIn, setLoggedIn);

	return (
		<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} >
			<UserProvider>
				<div className="App">
					<AuthContext.Provider value={{loggedIn, setLoggedIn}}>
						<CustomLoginContext.Provider value={{googleCredentials, setGoogleCredentials}}>
							<NavigationBar /> 
							<Routes>
								<Route path="/" element={<Home />} />
								<Route path="/over-ons" element={<OverOns />} />
								<Route path="/contact" element={<Contact />} />
								<Route path="/beheerder" element={<BeheerderPortal />}>
									<Route index element={<DefaultBeheerderPage />} />
									<Route path="ervaringsdeskundige" element={<Ervaringsdeskundige />} />
									<Route path="onderzoeken" element={<Onderzoeken />} />
									<Route path="bedrijven" element={<Bedrijven />} />
								</Route>
							</Routes>
						</CustomLoginContext.Provider>
					</AuthContext.Provider>
				</div>
			</UserProvider>
		</GoogleOAuthProvider>
	);
}

export default App;
