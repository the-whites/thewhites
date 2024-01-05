import { useContext, useEffect } from "react";
import { fetchApi, setLastRefreshTime } from "./useApi";
import { getToken } from "../components/AxiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedIn } from "../redux/loginSlice";

const useUpdateLoginState = () => {
	const dispatch = useDispatch();

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
					dispatch(setLoggedIn(true));
				}
				else if (response.status == 401) {
					//dispatch(setLoggedIn(false));
				}
				else {
					//dispatch(setLoggedIn(false));
					// send error?
				}
			}
		};

		fetchLoginStatus();
	});
  
};

export default useUpdateLoginState;
