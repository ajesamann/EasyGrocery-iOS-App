import { createStore } from "redux";
import allReducers from "./reducers";
import { AsyncStorage } from "react-native";
import { persistStore, persistReducer } from "redux-persist";

//persist the state to AsyncStorage, using root as the key, if you change the key it's like moving to a new house, nothing will be there that was in the old key
const persistConfig = {
  key: "main",
  storage: AsyncStorage
};

//tell the persisted store what to save by passing in all the reducers from index.js
const persistedReducer = persistReducer(persistConfig, allReducers);

//export the store and persistor
export default () => {
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);
  return { store, persistor };
};
