import axios from "axios";
import AxiosInstance from "../components/AxiosInstance";

// Authenticatie is cookie-based, dus er hoeft geen Authorization header te zijn.
export const fetchApi = async ({
	route, 
	options = {
		headers: {
			"Content-Type": "application/json"
		}
	}
}) => {
	return await AxiosInstance.get(route, {...options, withCredentials: true });
};

export const postApi = async ({
	route, 
	body = {},
	options = {
		headers: {
			"Content-Type": "application/json",
		}
	}
}) => {
	return await AxiosInstance.post(route, body, {...options, withCredentials: true  });
};


/*export const useFetchWithAuth = async (
	route, 
	body = {}, 
	options = {
		headers: {
			"Content-Type": "application/json",
		}
	}
) => {
	const {token} = useContext(JwtTokenContext);
	return await AxiosInstance.post(route, body, {...options, withCredentials: true, headers: {...options.headers, Authorization: "Bearer " + token} });
};*/


