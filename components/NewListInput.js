import React, { Component } from "react";
import {
  TouchableOpacity,
  TextInput,
  Button,
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import * as Font from "expo-font";

class NewListInput extends Component {
  state = {
    name: "",
    isEmpty: false,
    tooLong: false,
    listAdded: false
  };

  //loading in the fonts
  async componentDidMount() {
    await Font.loadAsync({
      "Raleway-Medium": require("../assets/fonts/Raleway-Medium.ttf"),
      "Raleway-Light": require("../assets/fonts/Raleway-Light.ttf")
    });
  }

  //add item to the specified list
  addToList = name => {
    this.props.dispatch({
      type: "CREATE_NEW_LIST",
      name,
      uniqueNum: this.generateUniqueId()
    });
    this.setState({
      tooLong: false,
      isEmpty: false,
      name: "",
      listAdded: true
    });
    setTimeout(() => {
      this.setState({ listAdded: false });
    }, 2500);
  };

  //create a unique id for each list by generating a random number, yes i know this isnt that efficient but i was gonna shoot my brains out
  generateUniqueId = () => {
    let lists = this.props.lists;
    let randomNumber = getRandomInt(0, 75000);
    if (lists.length === 0) {
      return getRandomInt(0, 75000);
    } else if (lists.length > 0) {
      for (let i = 0; i < lists.length; i++) {
        if (lists[i].listId === randomNumber) {
          return getRandomInt(0, 75000);
        } else {
          return randomNumber;
        }
      }
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.nlContainer}>
        {this.state.listAdded === true ? (
          <Animatable.View
            animation={"fadeIn"}
            duration={450}
            easing={"ease-in-out"}
            style={styles.listAddedText}
          >
            <Text style={{ color: "#fff", fontFamily: "Raleway-Medium" }}>
              List created!
            </Text>
          </Animatable.View>
        ) : null}
        {this.state.tooLong === true && this.state.name.length > 15 ? (
          <Animatable.View
            animation={"fadeIn"}
            duration={450}
            easing={"ease-in-out"}
            style={styles.warningText}
          >
            <Text style={{ color: "#fff", fontFamily: "Raleway-Medium" }}>
              List name can only be 15 characters!
            </Text>
          </Animatable.View>
        ) : null}
        {this.state.isEmpty === true && this.state.name.length === 0 ? (
          <Animatable.View
            animation={"fadeIn"}
            duration={450}
            easing={"ease-in-out"}
            style={styles.warningText}
          >
            <Text style={{ color: "#fff", fontFamily: "Raleway-Medium" }}>
              You must name your list!
            </Text>
          </Animatable.View>
        ) : null}
        <TextInput
          style={[styles.listNameInput, this.props.borderColor]}
          placeholder="Name your list"
          value={this.state.name}
          returnKeyType="done"
          onChangeText={text => this.setState({ name: text })}
        />
        {/**add list to lists button*/}
        <TouchableOpacity
          style={[styles.button, this.props.normalColor]}
          onPress={() => {
            if (this.state.name.length === 0) {
              this.setState({ isEmpty: true });
            } else if (this.state.name.length > 15) {
              this.setState({ tooLong: true });
            } else {
              this.addToList(this.state.name);
            }
          }}
        >
          <View style={[styles.plusContainer, this.props.lightColor]}>
            <Text style={styles.plusSign}>+</Text>
          </View>
          <Text style={styles.text}>Create list</Text>
        </TouchableOpacity>
        {/**go back to list aka homescreen button */}
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
      </SafeAreaView>
    );
  }
}

//get a random number for the list id
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//grabbing state from redux
const mapStateToProps = state => {
  return {
    lists: state.lists
  };
};

export default connect(mapStateToProps)(NewListInput);

const styles = StyleSheet.create({
  nlContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    height: 400
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
    width: 150,
    height: 40,
    borderRadius: 100,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
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
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },

  listAddedText: {
    width: 200,
    padding: 10,
    borderRadius: 100,
    backgroundColor: "#4fc951",
    color: "#fff",
    justifyContent: "center",
    alignItems: "center"
  }
});
