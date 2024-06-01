import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import userReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  cart:cartReducer,
});

export default rootReducer;
