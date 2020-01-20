import React, { Component } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import * as Font from "expo-font";

export default class WelcomeMSG extends Component {
  state = {
    fontLoaded: false
  };

  //load in the fonts
  async componentDidMount() {
    await Font.loadAsync({
      "Raleway-Medium": require("../assets/fonts/Raleway-Medium.ttf"),
      "Raleway-Light": require("../assets/fonts/Raleway-Light.ttf")
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <View>
        {this.state.fontLoaded ? (
          this.props.useCustomMsg ? (
            <Text style={styles.welcomeMsg}>{this.props.welcomeMsg}</Text>
          ) : (
            <Text style={styles.welcomeMsg}>Welcome!</Text>
          )
        ) : (
          <ActivityIndicator size="small" style={{ marginBottom: 15 }} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcomeMsg: {
    fontSize: 27,
    marginBottom: 25,
    color: "#fff",
    fontFamily: "Raleway-Light"
  }
});
