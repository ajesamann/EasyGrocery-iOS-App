import React, { Component } from "react";
import {
  TouchableOpacity,
  TextInput,
  Button,
  View,
  StyleSheet,
  Text,
  SafeAreaView
} from "react-native";
import { connect } from "react-redux";
import NumericInput from "react-native-numeric-input";
import { AntDesign } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import * as Font from "expo-font";

class NewListItemInput extends Component {
  state = {
    itemName: "",
    itemQuantity: 1,
    isEmpty: false,
    tooLong: false,
    itemAdded: false
  };

  //loading in the fonts
  async componentDidMount() {
    await Font.loadAsync({
      "Raleway-Medium": require("../assets/fonts/Raleway-Medium.ttf"),
      "Raleway-Light": require("../assets/fonts/Raleway-Light.ttf")
    });
  }

  //method to add item to the list
  addItemToList = (name, quantity) => {
    this.props.dispatch({
      type: "ADD_LIST_ITEM",
      itemName: name,
      itemQuantity: quantity,
      listId: this.props.listId
    });
    this.setState({
      tooLong: false,
      isEmpty: false,
      itemAdded: true,
      itemName: "",
      itemQuantity: 1
    });

    setTimeout(() => {
      this.setState({ itemAdded: false });
    }, 2500);
  };

  render() {
    return (
      <SafeAreaView style={styles.nlContainer}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, this.props.normalColorText]}>
            {this.props.listName}
          </Text>
        </View>
        {/**go back to lists aka homescreen button*/}
        <TouchableOpacity
          style={styles.goBack}
          onPress={this.props.goBackToMyLists}
        >
          <AntDesign
            name="leftcircleo"
            style={[styles.backIcon, this.props.normalColorText]}
            size={28}
          />
          <Text style={[styles.goBackText, this.props.normalColorText]}>
            Go back to my lists
          </Text>
        </TouchableOpacity>
        {this.state.itemAdded === true ? (
          <Animatable.View
            animation={"fadeIn"}
            duration={450}
            easing={"ease-in-out"}
            style={styles.listAddedText}
          >
            <Text style={{ color: "#fff", fontFamily: "Raleway-Medium" }}>
              Item added to {this.props.listName}!
            </Text>
          </Animatable.View>
        ) : null}
        {this.state.tooLong === true && this.state.itemName.length > 14 ? (
          <Animatable.View
            animation={"fadeIn"}
            duration={450}
            easing={"ease-in-out"}
            style={styles.warningText}
          >
            <Text style={{ color: "#fff", fontFamily: "Raleway-Medium" }}>
              Item name must be less than 15 characters!
            </Text>
          </Animatable.View>
        ) : null}
        {this.state.isEmpty === true && this.state.itemName.length === 0 ? (
          <Animatable.View
            animation={"fadeIn"}
            duration={450}
            easing={"ease-in-out"}
            style={styles.warningText}
          >
            <Text style={{ color: "#fff", fontFamily: "Raleway-Medium" }}>
              You must name your item!
            </Text>
          </Animatable.View>
        ) : null}
        <TextInput
          style={[styles.listNameInput, this.props.borderColor]}
          returnKeyType="done"
          placeholder="Name of item"
          value={this.state.itemName}
          onChangeText={text => this.setState({ itemName: text })}
        />
        <View style={styles.quantityInput}>
          <NumericInput
            value={this.state.itemQuantity}
            onChange={value => this.setState({ itemQuantity: value })}
            totalWidth={200}
            totalHeight={50}
            initValue={1}
            minValue={1}
            rightButtonBackgroundColor={"#757575"}
            leftButtonBackgroundColor={"#757575"}
            iconStyle={{ color: "white" }}
            borderColor={"white"}
          />
        </View>
        {/**add item to specific list button*/}
        <TouchableOpacity
          style={[styles.button, this.props.normalColor]}
          onPress={() => {
            if (this.state.itemName.length === 0) {
              this.setState({ isEmpty: true, itemQuantity: 1 });
            } else if (this.state.itemName.length > 14) {
              this.setState({ tooLong: true, itemQuantity: 1 });
            } else {
              this.addItemToList(this.state.itemName, this.state.itemQuantity);
            }
          }}
        >
          <View style={[styles.plusContainer, this.props.lightColor]}>
            <Text style={styles.plusSign}>+</Text>
          </View>
          <Text style={styles.text}>Add item to list</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

export default connect()(NewListItemInput);

const styles = StyleSheet.create({
  nlContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },

  listNameInput: {
    width: 200,
    paddingBottom: 8,
    borderBottomWidth: 2,
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Raleway-Medium"
  },

  button: {
    width: 200,
    height: 40,
    borderRadius: 100,
    flexDirection: "row",
    marginTop: 60,
    marginBottom: 45,
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
    fontSize: 20,
    fontFamily: "Raleway-Light"
  },

  backIcon: {
    marginRight: 10
  },

  goBack: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    bottom: 100
  },

  goBackText: {
    fontSize: 20,
    fontFamily: "Raleway-Medium"
  },

  warningText: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 100,
    backgroundColor: "#ff4a4a",
    color: "#fff",
    position: "absolute",
    top: 130,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },

  listAddedText: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 100,
    backgroundColor: "#4fc951",
    color: "#fff",
    position: "absolute",
    top: 130,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },

  quantityInput: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50
  },

  titleContainer: {
    position: "absolute",
    top: 65,
    justifyContent: "center",
    alignItems: "center"
  },

  title: {
    fontSize: 27,
    fontFamily: "Raleway-Medium"
  }
});
