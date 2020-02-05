import React, { Component } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from "react-native";
import { CheckBox } from "react-native-elements";
import { connect } from "react-redux";
import * as Animatable from "react-native-animatable";
import * as Font from "expo-font";

class listItem extends Component {
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

  //toggle for complete or not
  toggleCompleted = isComplete => {
    this.props.dispatch({
      type: "COMPLETE_LIST_ITEM",
      isComplete: !isComplete,
      listId: this.props.listId,
      itemId: this.props.itemId
    });
  };

  //method to check if it's complete or not
  checkComplete = isComplete => {
    this.props.dispatch({
      type: "CHECK_ITEM",
      payload: !isComplete,
      listId: this.props.listId
    });
  };

  //method to delete item from list
  deleteItemFromLists = () => {
    this.props.dispatch({
      type: "DELETE_LIST_ITEM",
      payload: this.props.itemId,
      listId: this.props.listId
    });
  };

  render() {
    return (
      <Animatable.View
        animation={"fadeIn"}
        duration={450}
        easing={"ease-in-out"}
        style={styles.itemContainer}
      >
        <CheckBox
          checked={this.props.isComplete}
          onPress={() => {
            this.toggleCompleted(this.props.isComplete);
            this.checkComplete(this.props.isComplete);
          }}
          checkedColor="#969696"
        />
        <View style={styles.itemContentContainer}>
          {this.state.fontLoaded ? (
            <Text
              style={[
                styles.itemNameText,
                this.props.normalColorText,
                this.props.isComplete
                  ? { textDecorationLine: "line-through" }
                  : null
              ]}
            >
              {this.props.name}
            </Text>
          ) : (
            <ActivityIndicator size="small" style={{ marginBottom: 15 }} />
          )}
          <View style={styles.seperator}></View>
          {this.state.fontLoaded ? (
            <Text style={[styles.itemAmountText, this.props.darkColorText]}>
              {this.props.quantity}
            </Text>
          ) : (
            <ActivityIndicator size="small" style={{ marginBottom: 15 }} />
          )}
        </View>
        {this.props.deleteItem ? (
          <Animatable.View
            style={styles.deleteItemBtn}
            animation={"tada"}
            iterationCount={"infinite"}
            easing={"ease-in-out"}
          >
            {/**delete list item button */}
            <TouchableOpacity onPress={() => this.deleteItemFromLists()}>
              <Text style={styles.deleteItemBtnText}>x</Text>
            </TouchableOpacity>
          </Animatable.View>
        ) : null}
      </Animatable.View>
    );
  }
}

export default connect()(listItem);

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 300,
    marginTop: 5,
    height: 50,
    backgroundColor: "white",
    borderRadius: 5,
    zIndex: -2
  },

  itemContentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1
  },

  itemNameText: { fontSize: 16, fontFamily: "Raleway-Medium" },

  seperator: {
    width: 2,
    height: 25,
    backgroundColor: "#e3e3e3"
  },

  itemAmountText: {
    marginRight: 25,
    fontSize: 15,
    fontFamily: "Raleway-Bold"
  },

  deleteItemBtn: {
    position: "absolute",
    width: 25,
    height: 25,
    top: 12.5,
    right: -12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#ff4a4a",
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    shadowOpacity: 0.25,
    zIndex: 1
  },

  deleteItemBtnText: {
    color: "white",
    fontWeight: "bold",
    position: "absolute",
    top: -8.75,
    right: -4.25
  }
});
