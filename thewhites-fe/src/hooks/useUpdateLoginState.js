import { useEffect } from "react";
import { fetchApi } from "./useApi";

const useUpdateLoginState = (loggedIn, setLoggedIn) => {
	return useEffect(() => {

		const fetchLoginStatus = async () => {
			const response = await fetchApi({route: "api/Login/profileInfo"}).catch(
				(error) => {
					console.log(error);
				}
			);

			if (response)
			{
				if (response.status == 200) {
					setLoggedIn(true);
				}
				else if (response.status == 401) {
					setLoggedIn(false);
				}
				else {
					setLoggedIn(false);
					// send error?
				}
			}
		};

		fetchLoginStatus();
	});
  
};

export default useUpdateLoginState;
