import { combineReducers } from "redux";
import lists from "./listsReducer";
import themeColor from "./themeColorReducer";
import welcomeMsg from "./welcomeMsgReducer";
import totalListsCompleted from "./listsCompletedReducer";
import listsCompleteArray from "./listArrayReducer";

//combine all the reducers in this file
const allReducers = combineReducers({
  lists,
  themeColor,
  welcomeMsg,
  totalListsCompleted,
  listsCompleteArray
});

export default allReducers;
