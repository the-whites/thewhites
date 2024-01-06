import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import OverOns from "./pages/OverOns/OverOns";
import Contact from "./pages/Contact/Contact";
import ProfielPaginas from "./pages/ProfielPaginas/ProfielPaginas";
import ProfielPagina from "./pages/ProfielPaginas/Profielpagina/ProfielPagina";
import BeheerderPortal from "./pages/BeheerderPortal/BeheerderPortal";
import ErvaringsdeskundigeBHP from "./pages/BeheerderPortal/Ervaringsdeskundige/Ervaringsdeskundige";
import Onderzoeken from "./pages/BeheerderPortal/Onderzoeken/Onderzoeken";
import Bedrijven from "./pages/BeheerderPortal/Bedrijven/Bedrijven";
import DefaultBeheerderPage from "./pages/BeheerderPortal/DefaultBeheerderTab/DefaultBeheerderTab";
import BedrijvenPortal from "./pages/BedrijvenPortal/BedrijvenPortal";
import DefaultBedrijvenPage from "./pages/BedrijvenPortal/DefaultBedrijvenTab/DefaultBedrijvenTab";
import Chat from "./pages/BedrijvenPortal/ChatBedrijf/ChatBedrijf";
import Opdrachten from "./pages/BedrijvenPortal/Opdrachten/Opdrachten";
import Profiel from "./pages/BedrijvenPortal/ProfielUpdate/ProfielUpdate";
import ErvaringsdekundigePortal from "./pages/ErvaringsdeskundigePortal/ErvaringsdeskundigePortal";
import DefaultErvaringsdeskundigePage from "./pages/ErvaringsdeskundigePortal/DefaultErvaringsdeskundigeTab/DefaultErvaringsdeskundigeTab";
import ChatErvaringsdeskundige from "./pages/ErvaringsdeskundigePortal/ChatErvaringsdeskundige/ChatErvaringdeskundige";
import Overzichtonderzoeken from "./pages/ErvaringsdeskundigePortal/OverzichtOnderzoeken/OverzichtOnderzoeken";
import ProfielErvaringsdeskundige from "./pages/ErvaringsdeskundigePortal/ProfielErvaringsdeskundige/ProfielErvaringdeskundige";

import NavigationBar from "./components/Navbar/Navbar";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { UserProvider } from "./contexts/UserProvider";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import { ROLES } from "./constants/roles";

function App() {

	return (
		<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} >
			<div className="App">

				<UserProvider>
					<NavigationBar /> 
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/over-ons" element={<OverOns />} />
						<Route path="/contact" element={<Contact />} />

						<Route path="/profielpaginas" element={<ProfielPaginas />}>
							<Route path="profielpagina" element={<ProfielPagina />} />
						</Route>
						


						<Route element={<RequireAuth allowedRoles={[ROLES.beheerder]} />}>
							<Route path="/beheerder" element={<BeheerderPortal />}>
								<Route index element={<DefaultBeheerderPage />} />
								<Route path="ervaringsdeskundigBHP" element={<ErvaringsdeskundigeBHP />} />
								<Route path="onderzoeken" element={<Onderzoeken />} />
								<Route path="bedrijven" element={<Bedrijven />} />
							</Route>
						</Route>
						<Route element={<RequireAuth allowedRoles={[ROLES.bedrijf]} />}>
							<Route path="/bedrijf" element={<BedrijvenPortal />} >
								<Route index element={<DefaultBedrijvenPage />} />
								<Route path="chat" element={<Chat />} />
								<Route path="opdrachten" element={<Opdrachten />} />
								<Route path="profiel" element={<Profiel />} />
							</Route>
						</Route>
						<Route element={<RequireAuth allowedRoles={[ROLES.ervaringsdeskundige]} />}>
							<Route path="/ervaringsdeskundige" element={<ErvaringsdekundigePortal />} >
								<Route index element={<DefaultErvaringsdeskundigePage />} />
								<Route path="chat" element={<ChatErvaringsdeskundige />} />
								<Route path="overzicht" element={<Overzichtonderzoeken />} />
								<Route path="profiel" element={<ProfielErvaringsdeskundige />} />
							</Route>
						</Route>
					</Routes>
				</UserProvider>
			</div>
		</GoogleOAuthProvider>
	);
}

export default App;
