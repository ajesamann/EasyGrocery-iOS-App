import React, { Component } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from "react-native";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import ListItem from "./ListItem";
import * as Animatable from "react-native-animatable";
import * as Font from "expo-font";

class Lists extends Component {
  state = { itemsAreShowing: false, deleteListItems: false, fontLoaded: false };

  //load in the fonts
  async componentDidMount() {
    await Font.loadAsync({
      "Raleway-Medium": require("../assets/fonts/Raleway-Medium.ttf"),
      "Raleway-Light": require("../assets/fonts/Raleway-Light.ttf"),
      "Raleway-Bold": require("../assets/fonts/Raleway-Bold.ttf")
    });

    this.setState({ fontLoaded: true });
  }

  //reset list items to unchecked
  resetList = id => {
    this.props.dispatch({ type: "RESET_LIST", payload: id });
  };

  //delete specific list
  deleteFromLists = id => {
    this.props.dispatch({ type: "REMOVE_LIST", payload: id });
  };

  render() {
    return (
      <View style={styles.containerAll}>
        {this.props.removeList ? (
          <Animatable.View
            style={styles.deleteBtnContainer}
            animation={"tada"}
            iterationCount={"infinite"}
            easing={"ease-in-out"}
          >
            {/**delete list button*/}
            <TouchableOpacity
              onPress={() => this.deleteFromLists(this.props.id)}
            >
              <View>
                <Text style={styles.deleteBtnTxt}>-</Text>
              </View>
            </TouchableOpacity>
          </Animatable.View>
        ) : null}
        {this.state.fontLoaded ? (
          ({
            /**press the list to open it and show items */
          },
          (
            <TouchableOpacity
              style={styles.container}
              onPress={() =>
                this.setState({
                  itemsAreShowing: !this.state.itemsAreShowing,
                  deleteListItems: false
                })
              }
            >
              <View style={[styles.listNameContainer, this.props.darkColor]}>
                <Text style={[styles.listName, this.props.lightColorText]}>
                  {this.props.name}
                </Text>
              </View>
              <View style={styles.itemAndCompletedContainer}>
                {this.props.items.length === 0 ? (
                  <View style={styles.emptyTextContainer}>
                    <Text style={[styles.emptyList, this.props.darkColorText]}>
                      This list is empty!
                    </Text>
                    <Text
                      style={[styles.helpAddItem, this.props.lightColorText]}
                    >
                      Press the green button to add a item!
                    </Text>
                  </View>
                ) : null}
                {this.props.items.length === 1 &&
                this.props.items.length != this.props.completedItems.length ? (
                  <View style={styles.listInfo}>
                    <Text style={[styles.itemCount, this.props.darkColorText]}>
                      {this.props.items.length} item
                    </Text>
                    <View style={styles.seperatorSmall}></View>
                    <Text style={[styles.itemCount, this.props.lightColorText]}>
                      {this.props.completedItems.length} completed
                    </Text>
                  </View>
                ) : null}
                {this.props.items.length > 1 &&
                this.props.items.length != this.props.completedItems.length ? (
                  <View style={styles.listInfo}>
                    <Text style={[styles.itemCount, this.props.darkColorText]}>
                      {this.props.items.length} items
                    </Text>
                    <View style={styles.seperatorSmall}></View>
                    <Text style={[styles.itemCount, this.props.lightColorText]}>
                      {this.props.completedItems.length} completed
                    </Text>
                  </View>
                ) : null}
                {this.props.items.length === this.props.completedItems.length &&
                this.props.items.length != 0 ? (
                  <Animatable.View
                    animation={"fadeIn"}
                    duration={450}
                    easing={"ease-in-out"}
                    style={styles.listComplete}
                  >
                    <View style={styles.listCompleteContainer}>
                      <Ionicons
                        name="ios-checkmark-circle-outline"
                        style={styles.backIcon}
                        size={25}
                        color="#4fc951"
                      />
                      <Text style={styles.listCompleteText}>
                        List complete!
                      </Text>
                    </View>
                    {/**reset lists button, pops up when all are marked complete*/}
                    <TouchableOpacity
                      style={[styles.resetListContainer, this.props.darkColor]}
                      onPress={() => this.resetList(this.props.id)}
                    >
                      <EvilIcons
                        name="redo"
                        style={styles.resetIcon}
                        size={26}
                        color="#fff"
                      />
                      <Text style={styles.resetListText}>Reset list</Text>
                    </TouchableOpacity>
                  </Animatable.View>
                ) : null}
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <ActivityIndicator size="small" style={{ marginBottom: 15 }} />
        )}
        {/**add a list item button*/}
        <TouchableOpacity
          style={styles.addNewListItemBtnContainer}
          onPress={() => {
            this.props.navigateToNewListItemInput();
            this.props.turnOffToggle();
          }}
        >
          <View>
            <Text style={styles.addListItemBtnTxt}>+</Text>
          </View>
        </TouchableOpacity>
        <View>
          {this.state.itemsAreShowing === true &&
          this.props.items.length > 0 ? (
            <View
              style={{
                zIndex: 0,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {/**toggle delete list items on or off*/}
              <TouchableOpacity
                style={styles.deleteListItemsBtn}
                onPress={() =>
                  this.setState({
                    deleteListItems: !this.state.deleteListItems
                  })
                }
              >
                {this.state.deleteListItems ? (
                  <Animatable.Text
                    animation={"fadeIn"}
                    easing={"ease-in-out"}
                    style={styles.deleteListItemsTxt}
                  >
                    I'm finished deleting!
                  </Animatable.Text>
                ) : (
                  <Animatable.Text
                    animation={"fadeIn"}
                    easing={"ease-in-out"}
                    style={styles.deleteListItemsTxt}
                  >
                    Delete list items
                  </Animatable.Text>
                )}
              </TouchableOpacity>
              {/**all the list items */}
              {this.props.items.map(item => (
                <ListItem
                  key={item.itemId}
                  listId={this.props.id}
                  itemId={item.itemId}
                  name={item.itemName}
                  darkColor={this.props.darkColor}
                  normalColor={this.props.normalColor}
                  lightColor={this.props.lightColor}
                  darkColorText={this.props.darkColorText}
                  normalColorText={this.props.normalColorText}
                  lightColorText={this.props.lightColorText}
                  isComplete={item.isComplete}
                  quantity={item.itemQuantity}
                  deleteItem={this.state.deleteListItems}
                />
              ))}
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}

export default connect()(Lists);

const styles = StyleSheet.create({
  container: {
    width: 320,
    height: 125,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 45,
    paddingBottom: 45,
    paddingRight: 25,
    paddingLeft: 25,
    backgroundColor: "white",
    borderRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    shadowOpacity: 0.25,
    zIndex: 1
  },

  containerAll: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 70
  },

  listName: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Raleway-Bold"
  },

  resetIcon: {
    position: "absolute",
    left: 4,
    top: 4.5
  },

  listNameContainer: {
    position: "absolute",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 100,
    top: -17
  },

  itemCount: {
    fontSize: 17.5,
    fontFamily: "Raleway-Medium"
  },

  listComplete: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },

  listCompleteContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  resetListContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: 105,
    height: 30,
    borderRadius: 100,
    top: 60,
    right: 138
  },

  resetListText: {
    fontFamily: "Raleway-Medium",
    color: "#fff",
    position: "absolute",
    right: 13.5,
    fontSize: 13.5
  },

  listCompleteText: {
    fontFamily: "Raleway-Medium",
    marginLeft: 7,
    fontSize: 17.5,
    color: "#4fc951"
  },

  listInfo: {
    flexDirection: "row",
    width: 320,
    justifyContent: "space-evenly",
    alignItems: "center"
  },

  emptyTextContainer: { justifyContent: "center", alignItems: "center" },

  emptyList: { fontSize: 15, fontFamily: "Raleway-Bold", marginBottom: 10 },

  helpAddItem: {
    fontFamily: "Raleway-Medium",
    fontSize: 13
  },

  deleteBtnContainer: {
    position: "absolute",
    right: -12,
    top: -14,
    width: 35,
    height: 35,
    backgroundColor: "#ff4a4a",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    shadowOpacity: 0.25,
    zIndex: 2
  },

  deleteBtnTxt: {
    color: "#fff",
    position: "absolute",
    fontSize: 25,
    top: -16.5,
    left: -5
  },

  addNewListItemBtnContainer: {
    position: "absolute",
    top: -17,
    left: -12,
    width: 35,
    height: 35,
    backgroundColor: "#4fc951",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    shadowOpacity: 0.25,
    zIndex: 2
  },

  itemAndCompletedContainer: {
    alignItems: "flex-end"
  },

  addListItemBtnTxt: {
    color: "#fff",
    position: "absolute",
    fontSize: 23,
    top: -15,
    left: -7
  },

  seperatorSmall: {
    width: 2,
    height: 35,
    backgroundColor: "#e3e3e3"
  },

  deleteListItemsBtn: {
    marginTop: 15,
    marginBottom: 12
  },

  deleteListItemsTxt: {
    color: "white",
    fontSize: 13,
    textDecorationLine: "underline"
  }
});
