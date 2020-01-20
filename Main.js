import React, { Component } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import NewListInputScreen from "./screens/NewListInputScreen";
import NewListItemInputScreen from "./screens/NewListItemInputScreen";
import { PersistGate } from "redux-persist/integration/react";

//importing the persistor and store from configure store
const { persistor, store } = configureStore();

export default class Main extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}

//create all the screens to navigate to and set the header style
const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    NewListInput: NewListInputScreen,
    NewListItemInput: NewListItemInputScreen,
    Settings: SettingsScreen
  },
  {
    headerMode: "none"
  }
);

//create the container component to hold all the screens to navigate to
const AppContainer = createAppContainer(AppNavigator);
