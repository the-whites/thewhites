import axios from "axios";


const AxiosInstance = axios.create({
	baseURL: process.env.REACT_APP_API_PATH,
	timeout: 5000, // Timeout in milliseconds
	withCredentials: true
});

export default AxiosInstance;