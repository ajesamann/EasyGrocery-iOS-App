import React, { Component } from "react";
import { StatusBar, SafeAreaView, StyleSheet } from "react-native";
import Settings from "../components/Settings";

class SettingsScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.settingsContainer}>
        <StatusBar barStyle="dark-content" />
        <Settings
          //pass the navigate method to the child component using a prop
          goBackToMyLists={() => this.props.navigation.navigate("Home")}
          useCustomMsg={this.props.navigation.getParam("useCustomMsg")}
          themeColor={this.props.navigation.getParam("themeColor")}
          customMsg={this.props.navigation.getParam("customMsg")}
        />
      </SafeAreaView>
    );
  }
}

export default SettingsScreen;

const styles = StyleSheet.create({
  settingsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  }
});
