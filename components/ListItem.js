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
      listId: this.props.index,
      itemId: this.props.itemId
    });
  };

  //method to check if it's complete or not
  checkComplete = isComplete => {
    this.props.dispatch({
      type: "CHECK_ITEM",
      payload: !isComplete,
      listId: this.props.index
    });
  };

  //method to delete item from list
  deleteItemFromLists = price => {
    this.props.dispatch({
      type: "DELETE_LIST_ITEM",
      payload: this.props.itemId,
      listId: this.props.index,
      price,
      isComplete: this.props.isComplete
    });
  };

  //check if all items are checked or not
  checkCompleted = () => {
    this.props.dispatch({
      type: "CHECK_ALL_ITEMS"
    });
  };

  //update the total number of completed lists
  updateTotalComplete = () => {
    if (this.props.listComplete) {
      this.props.dispatch({
        type: "ADD_ONE"
      });
      this.props.dispatch({
        type: "PUSH_LIST",
        listId: this.props.listId
      });
    }

    if (
      this.props.listComplete === false &&
      this.props.listsArray.indexOf(this.props.listId) > -1
    ) {
      this.props.dispatch({
        type: "SUBTRACT_ONE"
      });
      this.props.dispatch({
        type: "REMOVE_FROM_COMPLETED",
        listId: this.props.listId
      });
    }
  };

  render() {
    return (
      <Animatable.View
        animation={"fadeIn"}
        duration={450}
        easing={"ease-in-out"}
        style={styles.itemContainer}
      >
        {this.props.isComplete ? (
          <Animatable.View
            animation={"fadeIn"}
            duration={450}
            easing={"ease-in-out"}
            style={styles.itemContainer}
            style={[this.props.darkColor, styles.bar]}
          ></Animatable.View>
        ) : null}
        <View style={styles.topItemInfo}>
          <CheckBox
            checked={this.props.isComplete}
            onPress={() => {
              this.toggleCompleted(this.props.isComplete);
              this.checkComplete(this.props.isComplete);
              this.checkCompleted();
              setTimeout(() => {
                this.updateTotalComplete();
              }, 1);
            }}
            uncheckedIcon="square"
            containerStyle={{
              marginLeft: 0,
              paddingLeft: 0,
              marginRight: 0,
              paddingRight: 0
            }}
            uncheckedColor="#e8e8e8"
            checkedColor="#969696"
          />
          {this.state.fontLoaded ? (
            <Text
              style={[
                styles.itemNameText,
                this.props.normalColorText,
                this.props.isComplete ? styles.lowOpacityText : null
              ]}
            >
              {this.props.name}
            </Text>
          ) : (
            <ActivityIndicator size="small" style={{ marginBottom: 15 }} />
          )}
          {this.state.fontLoaded ? (
            <Text
              style={[
                styles.itemAmountText,
                this.props.darkColorText,
                this.props.isComplete ? styles.lowOpacityText : null
              ]}
            >
              {this.props.quantity}
            </Text>
          ) : (
            <ActivityIndicator size="small" style={{ marginBottom: 15 }} />
          )}
        </View>
        {this.props.mNumber > 0 || this.props.price > 0 ? (
          <View style={styles.bottomItemInfo}>
            {this.props.mNumber > 0 ? (
              <View
                style={[
                  styles.itemOunces,
                  this.props.darkColor,
                  this.props.isComplete ? styles.lowOpacity : null
                ]}
              >
                <Text style={styles.text}>
                  {this.props.mNumber} {this.props.mLabel}
                </Text>
              </View>
            ) : null}
            {this.props.price > 0 ? (
              <View
                style={[
                  styles.itemPrice,
                  this.props.isComplete ? styles.lowOpacity : null
                ]}
              >
                <Text style={styles.text}>${this.props.price}</Text>
              </View>
            ) : null}
          </View>
        ) : null}
        {/**delete list item button */}
        {this.props.deleteItem ? (
          <TouchableOpacity
            onPress={() => {
              this.deleteItemFromLists(this.props.price);
              this.props.items.length === 1
                ? this.props.updateTotalComplete()
                : null;
            }}
            style={styles.deleteItemBtn}
          >
            <Animatable.View
              style={styles.deleteItemBtnAnimation}
              animation={"tada"}
              iterationCount={"infinite"}
              easing={"ease-in-out"}
            >
              <Text style={styles.deleteItemBtnText}>x</Text>
            </Animatable.View>
          </TouchableOpacity>
        ) : null}
      </Animatable.View>
    );
  }
}

export default connect()(listItem);

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "92%",
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 10,
    zIndex: -2
  },

  bottomItemInfo: {
    paddingBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    width: "85%"
  },

  text: {
    color: "white",
    fontSize: 15
  },

  itemOunces: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 100
  },

  itemPrice: {
    backgroundColor: "#4fc951",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 100,
    marginLeft: "auto"
  },

  itemNameText: {
    fontSize: 16,
    fontFamily: "Raleway-Bold",
    textAlign: "center"
  },

  topItemInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "85%"
  },

  itemAmountText: {
    fontSize: 18,
    fontFamily: "Raleway-Bold"
  },

  deleteItemBtn: {
    position: "absolute",
    right: 0,
    justifyContent: "center",
    alignItems: "center"
  },

  deleteItemBtnAnimation: {
    position: "absolute",
    width: 26,
    height: 26,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#ff4a4a",
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    shadowOpacity: 0.25,
    zIndex: 101
  },

  deleteItemBtnText: {
    color: "white",
    fontWeight: "bold",
    position: "absolute",
    top: 3,
    right: 8,
    fontSize: 15
  },

  lowOpacity: {
    backgroundColor: "#dedede"
  },

  lowOpacityText: {
    color: "#dedede"
  }
});
