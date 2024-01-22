import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import OverOns from "./pages/OverOns/OverOns";
import Contact from "./pages/Contact/Contact";
import BeheerderPortal from "./pages/BeheerderPortal/BeheerderPortal";
import ErvaringsdeskundigeBHP from "./pages/BeheerderPortal/Ervaringsdeskundige/Ervaringsdeskundige";
import Onderzoeken from "./pages/BeheerderPortal/Onderzoeken/Onderzoeken";
import Bedrijven from "./pages/BeheerderPortal/Bedrijven/Bedrijven";
import DefaultBeheerderPage from "./pages/BeheerderPortal/DefaultBeheerderTab/DefaultBeheerderTab";
import BedrijvenPortal from "./pages/BedrijvenPortal/BedrijvenPortal";
import DefaultBedrijvenPage from "./pages/BedrijvenPortal/DefaultBedrijvenTab/DefaultBedrijvenTab";
import Chat from "./pages/BedrijvenPortal/ChatBedrijf/ChatBedrijf";
import Profiel from "./pages/BedrijvenPortal/ProfielUpdate/ProfielUpdate";
import ErvaringsdekundigePortal from "./pages/ErvaringsdeskundigePortal/ErvaringsdeskundigePortal";
import DefaultErvaringsdeskundigePage from "./pages/ErvaringsdeskundigePortal/DefaultErvaringsdeskundigeTab/DefaultErvaringsdeskundigeTab";

import Overzichtonderzoeken from "./pages/ErvaringsdeskundigePortal/OverzichtOnderzoeken/OverzichtOnderzoeken";
import ProfielErvaringsdeskundige from "./pages/ErvaringsdeskundigePortal/ProfielErvaringsdeskundige/ProfielErvaringdeskundige";
import LopendeOnderzoeken from "./pages/BedrijvenPortal/Onderzoeken/LopendeOnderzoeken/LopendeOnderzoek";
import BeheerOnderzoek from "./pages/BedrijvenPortal/Onderzoeken/BeheerOnderzoek/BeheerOnderzoek";
import OudeOnderzoeken from "./pages/BedrijvenPortal/Onderzoeken/OudeOnderzoeken/OudeOnderzoeken";
import WijzigOnderzoek from "./pages/BedrijvenPortal/Onderzoeken/BeheerOnderzoek/WijzigOnderzoek";
import NieuwOnderzoek from "./pages/BedrijvenPortal/Onderzoeken/NieuwOnderzoek/NieuwOnderzoek";
import DefaultOnderzoekenTab from "./pages/BedrijvenPortal/Onderzoeken/DefaultOnderzoekenTab/DefaultOnderzoekenTab";
import BedrijfOnderzoeken from "./pages/BedrijvenPortal/Onderzoeken/Onderzoeken";
import ProfielPagina from "./pages/ProfielRegisterPaginas/ProfielPagina"; 
import MedischePagina from "./pages/ProfielRegisterPaginas/Medischepagina";
import BevestigingsPagina from "./pages/ProfielRegisterPaginas/BevestingPagina";

import NavigationBar from "./components/Navbar/Navbar";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { UserProvider } from "./contexts/UserProvider";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import { ROLES } from "./constants/roles";

import Footer from "./components/Footer/Footer";
import Meldingen from "./pages/Meldingen/Meldingen";
import Layout from "./components/Toastify/ToastifyLayout";
import ChatErvaringsdeskundige from "./pages/ErvaringsdeskundigePortal/ChatErvaringsdeskundige/ChatErvaringdeskundige";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import { CookiePrompt } from "./components/Cookies/CookiePrompt";
import { CookiesVerklaring } from "./pages/Cookies/Cookies";
function App() {

	return (
		<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} >
			<div className="App">
				<UserProvider>
					<CookiePrompt />
					<NavigationBar /> 
					<div className="main-body">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/over-ons" element={<OverOns />} />
							<Route path="/privacy-policy" element={<PrivacyPolicy />} />
							<Route path="/contact" element={<Contact />} />
							<Route path="/cookies" element={<CookiesVerklaring />} />
							<Route element={<RequireAuth allowedRoles={[ROLES.beheerder, ROLES.ervaringsdeskundige, ROLES.bedrijf]} />}>
								<Route path="/meldingen" element={<Meldingen />} />
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
								<Route path="/bedrijf" element={<Layout><BedrijvenPortal /></Layout>} >
									<Route index element={<DefaultBedrijvenPage />} />
									<Route path="chat" element={<Chat />} />
									<Route path="onderzoeken" element={<BedrijfOnderzoeken />}>
										<Route index element={<DefaultOnderzoekenTab />} />
										<Route path="nieuw" element={<NieuwOnderzoek />} />
										<Route path="lopende-onderzoeken" element={<LopendeOnderzoeken />} />
										<Route path="oude-onderzoeken" element={<OudeOnderzoeken />} />
										<Route path=":id" element={<BeheerOnderzoek />} />
										<Route path="wijzig/:id" element={<WijzigOnderzoek />} />
									</Route>
									<Route path="profiel" element={<Profiel />} />
								</Route>
							</Route>
							<Route element={<RequireAuth allowedRoles={[ROLES.ervaringsdeskundige]} />}>
								<Route path="/ervaringsdeskundige" element={<ErvaringsdekundigePortal />} >
									<Route index element={<DefaultErvaringsdeskundigePage />} />
									<Route path="chat/:id" element={<ChatErvaringsdeskundige />} />
									<Route path="overzicht" element={<Overzichtonderzoeken />} />
									<Route path="profiel" element={<ProfielErvaringsdeskundige />} />
								</Route>
							</Route>
							<Route path="profielPagina" element={<ProfielPagina />} />
							<Route path="medischePagina" element={<MedischePagina/>} />
							<Route path="bevestingsPagina" element={<BevestigingsPagina/>} />
						</Routes>
					</div>
					<Footer />
				</UserProvider>
			</div>
		</GoogleOAuthProvider>
	);
}

export default App;
