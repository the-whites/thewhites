import { createSlice } from "@reduxjs/toolkit";

export const loginStatusSlice = createSlice({
	name: "login_status",
	initialState: {
		isLoggedIn: false
	},
	reducers: {
		setLoggedIn: (state, action) => {
			state.isLoggedIn = action.payload;
		},
	},
});
  
// Action creators are generated for each case reducer function
export const { setLoggedIn, setToken } = loginStatusSlice.actions;
  
export default loginStatusSlice.reducer;