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
