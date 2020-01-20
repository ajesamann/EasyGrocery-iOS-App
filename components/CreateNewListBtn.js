import React, { Component } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from "react-native";
import * as Font from "expo-font";

export default class CreateNewListBtn extends Component {
  state = {
    fontLoaded: false
  };

  //loading in the fonts
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
          <TouchableOpacity
            onPress={() => {
              this.props.navigateToNewListInput();
              this.props.turnOffToggle();
            }}
            style={[styles.button, this.props.normalColor]}
          >
            <View style={[styles.plusContainer, this.props.lightColor]}>
              <Text style={styles.plusSign}>+</Text>
            </View>
            <Text style={styles.text}>Create new list</Text>
          </TouchableOpacity>
        ) : (
          <ActivityIndicator size="small" style={{ marginBottom: 15 }} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 190,
    height: 40,
    borderRadius: 100,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    shadowOffset: { width: 0, height: 3 },
    shadowColor: "black",
    shadowOpacity: 0.15
  },

  plusContainer: {
    width: 25,
    height: 25,
    position: "absolute",
    left: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100
  },

  plusSign: {
    position: "absolute",
    top: -4,
    left: 5,
    color: "white",
    fontSize: 25
  },

  text: {
    position: "absolute",
    right: 17,
    color: "white",
    fontSize: 18.75,
    fontFamily: "Raleway-Medium"
  }
});
