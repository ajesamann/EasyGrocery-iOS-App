import { combineReducers } from "redux";
import lists from "./listsReducer";
import themeColor from "./themeColorReducer";
import welcomeMsg from "./welcomeMsgReducer";

//combine all the reducers in this file
const allReducers = combineReducers({ lists, themeColor, welcomeMsg });

export default allReducers;
