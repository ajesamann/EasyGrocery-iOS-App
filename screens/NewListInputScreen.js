import React, { Component } from "react";
import { StatusBar, SafeAreaView, StyleSheet } from "react-native";
import NewListInput from "../components/NewListInput";

class NewListInputScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.newListInputContainer}>
        <StatusBar barStyle="dark-content" />
        <NewListInput
          //pass the navigate method to the child component using a prop
          goBackToMyLists={() => this.props.navigation.navigate("Home")}
          darkColor={this.props.navigation.getParam("darkColor")}
          lightColor={this.props.navigation.getParam("lightColor")}
          normalColor={this.props.navigation.getParam("normalColor")}
          normalColorText={this.props.navigation.getParam("normalColorText")}
          borderColor={this.props.navigation.getParam("borderColor")}
        />
      </SafeAreaView>
    );
  }
}

export default NewListInputScreen;

const styles = StyleSheet.create({
  newListInputContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  }
});
