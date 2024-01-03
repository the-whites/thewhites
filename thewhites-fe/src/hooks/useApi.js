import AxiosInstance, { getToken, refreshToken } from "../components/AxiosInstance";

export var lastRefreshTime = 0;
export const setLastRefreshTime = (value) => lastRefreshTime = value;

const checkForRefreshToken = async () => {
	if (lastRefreshTime < Date.now() - 30 * 1000)
	{
		console.log("attempting to refresh the token...");
		lastRefreshTime = Date.now();
		await refreshToken();
	}
	else
	{
		//console.log("skipping refresh...");
	}
}

// Authenticate = JWT (bearer)
export const fetchApi = async ({
	route, 
	options = {
		headers: {
			"Content-Type": "application/json"
		}
	}
}) => {
	await checkForRefreshToken();
	return await AxiosInstance.get(route, {...options, withCredentials: true, headers: {...options.headers, Authorization: "Bearer " + getToken()} });
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
	await checkForRefreshToken();
	return await AxiosInstance.post(route, body, {...options, withCredentials: true, headers: {...options.headers, Authorization: "Bearer " + getToken()} });
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


