// I.P.V. layout kan toastcontainer miss in app.js? aangezien het voor niks anders wordt gebruikt nu
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }) => (
	<>
		{children}
		<ToastContainer />
	</>
);

export default Layout;
