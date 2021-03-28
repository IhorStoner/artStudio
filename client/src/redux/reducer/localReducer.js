import { createReducer } from "@reduxjs/toolkit";
import { MobileMenu } from "../action/localAction";

const initialState = {
	mobileMenu: false,
}

const localReducer = createReducer(initialState,{
	[MobileMenu.type]: (state, action) => {
		state.mobileMenu = action.payload;
	}
})

export default localReducer;