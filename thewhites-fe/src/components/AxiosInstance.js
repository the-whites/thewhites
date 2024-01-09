import axios from "axios";
import { useSelector } from "react-redux";


const AxiosInstance = axios.create({
	baseURL: process.env.REACT_APP_API_PATH,
	timeout: 10000, // Timeout in milliseconds
	withCredentials: true
});

// Function to refresh the access token
export const refreshToken = async () => {
	const response = await axios.post(
		process.env.REACT_APP_API_PATH + "api/Login/refresh-token", 
		{ oldToken: sessionStorage.getItem("ac_token") ?? ""}, 
		{withCredentials: true, headers: {"Content-Type": "application/json"}}
	).catch((e) => {
		console.log(e);
	});

	if (response) {
		const newAccessToken = response.data.token;
		setToken(newAccessToken);
		return newAccessToken;
	} else {
		// Silent error and logout
		/*if (loggedInStatus)
		{
			console.log("logging out...");
			logout();
			
			setTimeout(() => {
				window.location.href = "/";
				location.reload();
			}, 3000);
		}*/

	}
};

export const setToken = (value) => {
	sessionStorage.setItem("ac_token", value);
};

export const getToken = () => sessionStorage.getItem("ac_token");

export default AxiosInstance;