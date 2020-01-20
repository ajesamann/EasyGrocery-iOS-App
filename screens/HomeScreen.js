import React, { Component } from "react";
import {
  ScrollView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  ActivityIndicator
} from "react-native";
import CreateNewListBtn from "../components/CreateNewListBtn";
import Lists from "../components/Lists";
import WelcomeMSG from "../components/WelcomeMSG";
import { connect } from "react-redux";
import ListItem from "../components/ListItem";
import { Foundation } from "@expo/vector-icons";
import * as Font from "expo-font";

class HomeScreen extends Component {
  state = {
    toggleRemoveList: false,
    fontLoaded: false
  };

  //import the fonts
  async componentDidMount() {
    await Font.loadAsync({
      "Raleway-Medium": require("../assets/fonts/Raleway-Medium.ttf"),
      "Raleway-Light": require("../assets/fonts/Raleway-Light.ttf")
    });

    //what for fonts to load before any other components show
    this.setState({ fontLoaded: true });
  }

  //when navigating away from the page, turn off the toggle for the delete list button if it's on
  turnOffToggle = () => {
    this.setState({ toggleRemoveList: false });
  };

  //all the methods return the correct color depending on what theme was picked, there has to be a better way to do this lol it's so ugly
  darkThemeColor = () => {
    if (this.props.themeColor === "blue") {
      return styles.darkBlue;
    } else if (this.props.themeColor === "pink") {
      return styles.darkPink;
    } else if (this.props.themeColor === "black") {
      return styles.darkBlack;
    } else if (this.props.themeColor === "green") {
      return styles.darkGreen;
    } else if (this.props.themeColor === "white") {
      return styles.darkWhite;
    } else if (this.props.themeColor === "amethyst") {
      return styles.darkAmethyst;
    }
  };

  darkThemeColorText = () => {
    if (this.props.themeColor === "blue") {
      return styles.darkBlueText;
    } else if (this.props.themeColor === "pink") {
      return styles.darkPinkText;
    } else if (this.props.themeColor === "black") {
      return styles.darkBlackText;
    } else if (this.props.themeColor === "green") {
      return styles.darkGreenText;
    } else if (this.props.themeColor === "white") {
      return styles.darkWhiteText;
    } else if (this.props.themeColor === "amethyst") {
      return styles.darkAmethystText;
    }
  };

  lightThemeColor = () => {
    if (this.props.themeColor === "blue") {
      return styles.lightBlue;
    } else if (this.props.themeColor === "pink") {
      return styles.lightPink;
    } else if (this.props.themeColor === "black") {
      return styles.lightBlack;
    } else if (this.props.themeColor === "green") {
      return styles.lightGreen;
    } else if (this.props.themeColor === "white") {
      return styles.lightWhite;
    } else if (this.props.themeColor === "amethyst") {
      return styles.lightAmethyst;
    }
  };

  lightThemeColorText = () => {
    if (this.props.themeColor === "blue") {
      return styles.lightBlueText;
    } else if (this.props.themeColor === "pink") {
      return styles.lightPinkText;
    } else if (this.props.themeColor === "black") {
      return styles.lightBlackText;
    } else if (this.props.themeColor === "green") {
      return styles.lightGreenText;
    } else if (this.props.themeColor === "white") {
      return styles.lightWhiteText;
    } else if (this.props.themeColor === "amethyst") {
      return styles.lightAmethystText;
    }
  };

  normalThemeColor = () => {
    if (this.props.themeColor === "blue") {
      return styles.blue;
    } else if (this.props.themeColor === "pink") {
      return styles.pink;
    } else if (this.props.themeColor === "black") {
      return styles.black;
    } else if (this.props.themeColor === "green") {
      return styles.green;
    } else if (this.props.themeColor === "white") {
      return styles.white;
    } else if (this.props.themeColor === "amethyst") {
      return styles.amethyst;
    }
  };

  normalThemeColorText = () => {
    if (this.props.themeColor === "blue") {
      return styles.blueText;
    } else if (this.props.themeColor === "pink") {
      return styles.pinkText;
    } else if (this.props.themeColor === "black") {
      return styles.blackText;
    } else if (this.props.themeColor === "green") {
      return styles.greenText;
    } else if (this.props.themeColor === "white") {
      return styles.whiteText;
    } else if (this.props.themeColor === "amethyst") {
      return styles.amethystText;
    }
  };

  borderColor = () => {
    if (this.props.themeColor === "blue") {
      return styles.blueBorder;
    } else if (this.props.themeColor === "pink") {
      return styles.pinkBorder;
    } else if (this.props.themeColor === "black") {
      return styles.blackBorder;
    } else if (this.props.themeColor === "green") {
      return styles.greenBorder;
    } else if (this.props.themeColor === "white") {
      return styles.whiteBorder;
    } else if (this.props.themeColor === "amethyst") {
      return styles.amethystBorder;
    }
  };

  render() {
    return (
      <SafeAreaView style={[styles.homeContainer, this.darkThemeColor()]}>
        <StatusBar barStyle="light-content" />
        <View style={styles.top}>
          {/**welcome message*/}
          <WelcomeMSG
            welcomeMsg={this.props.welcomeMsg.message}
            useCustomMsg={this.props.welcomeMsg.customMsgIsOn}
          />
          {/**create a new list button */}
          <View style={styles.buttonAndGear}>
            <CreateNewListBtn
              navigateToNewListInput={() =>
                this.props.navigation.navigate("NewListInput", {
                  darkColor: this.darkThemeColor(),
                  normalColor: this.normalThemeColor(),
                  lightColor: this.lightThemeColor(),
                  normalColorText: this.normalThemeColorText(),
                  borderColor: this.borderColor()
                })
              }
              darkColor={this.darkThemeColor()}
              normalColor={this.normalThemeColor()}
              lightColor={this.lightThemeColor()}
              turnOffToggle={this.turnOffToggle}
            />
            {/**settings button */}
            <TouchableOpacity
              style={[styles.gear, this.normalThemeColor()]}
              onPress={() => {
                this.props.navigation.navigate("Settings", {
                  useCustomMsg: this.props.welcomeMsg.customMsgIsOn,
                  themeColor: this.props.themeColor,
                  customMsg: this.props.welcomeMsg.message
                });
                this.turnOffToggle();
              }}
            >
              <Foundation
                name="wrench"
                style={styles.gearIcon}
                size={28}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>
        {/**this scrollview contains the total amount of list text, the delete list button, and the lists themselves */}
        {this.state.fontLoaded ? (
          <ScrollView
            style={[styles.listsContainer, this.normalThemeColor()]}
            contentContainerStyle={styles.center}
          >
            {this.props.lists.length > 1 ? (
              <View style={styles.aboveListsInfo}>
                <Text style={styles.yourListsText}>
                  You currently have {this.props.lists.length} lists{" "}
                </Text>
                <TouchableOpacity
                  style={styles.removeListsBtn}
                  onPress={() =>
                    this.setState({
                      toggleRemoveList: !this.state.toggleRemoveList
                    })
                  }
                >
                  {!this.state.toggleRemoveList ? (
                    <Text style={styles.removeListsBtnText}>Delete a list</Text>
                  ) : (
                    <Text style={styles.removeListsBtnText}>I'm done!</Text>
                  )}
                </TouchableOpacity>
              </View>
            ) : null}
            {this.props.lists.length === 1 ? (
              <View style={styles.aboveListsInfo}>
                <Text style={styles.yourListsText}>
                  You currently have {this.props.lists.length} list{" "}
                </Text>
                <TouchableOpacity
                  style={styles.removeListsBtn}
                  onPress={() =>
                    this.setState({
                      toggleRemoveList: !this.state.toggleRemoveList
                    })
                  }
                >
                  {!this.state.toggleRemoveList ? (
                    <Text style={styles.removeListsBtnText}>Delete a list</Text>
                  ) : (
                    <Text style={styles.removeListsBtnText}>I'm done!</Text>
                  )}
                </TouchableOpacity>
              </View>
            ) : null}
            {this.props.lists.length === 0 ? (
              <Text style={styles.listsEmptyMsg}>
                You don't have any lists! To create a new list, press the create
                new list button at the top!
              </Text>
            ) : (
              <View>
                {this.props.lists.map(list => (
                  <Lists
                    key={list.id}
                    name={list.name}
                    id={list.id}
                    items={list.items}
                    removeList={this.state.toggleRemoveList}
                    completedItems={list.completedItems}
                    darkColor={this.darkThemeColor()}
                    normalColor={this.normalThemeColor()}
                    lightColor={this.lightThemeColor()}
                    darkColorText={this.darkThemeColorText()}
                    normalColorText={this.normalThemeColorText()}
                    lightColorText={this.lightThemeColorText()}
                    navigateToNewListItemInput={() =>
                      this.props.navigation.navigate("NewListItemInput", {
                        listId: list.id,
                        name: list.name,
                        darkColor: this.darkThemeColor(),
                        normalColor: this.normalThemeColor(),
                        lightColor: this.lightThemeColor(),
                        normalColorText: this.normalThemeColorText(),
                        borderColor: this.borderColor()
                      })
                    }
                    turnOffToggle={this.turnOffToggle}
                  />
                ))}
              </View>
            )}
          </ScrollView>
        ) : (
          <ActivityIndicator size="small" style={{ marginBottom: 15 }} />
        )}
      </SafeAreaView>
    );
  }
}

//grabbing state from redux
const mapStateToProps = state => {
  return {
    lists: state.lists,
    welcomeMsg: state.welcomeMsg,
    themeColor: state.themeColor
  };
};

export default connect(mapStateToProps)(HomeScreen);

//the styles for the homepage
const styles = StyleSheet.create({
  //colors for themes ----------------------------------
  darkPink: {
    backgroundColor: "#8c0036"
  },

  darkPinkText: {
    color: "#8c0036"
  },

  lightPink: {
    backgroundColor: "#ff70a7"
  },

  lightPinkText: {
    color: "#ff70a7"
  },

  pink: {
    backgroundColor: "#ff0867"
  },

  pinkBorder: {
    borderColor: "#ff0867"
  },

  pinkText: {
    color: "#ff0867"
  },

  darkBlue: {
    backgroundColor: "#002a52"
  },

  darkBlueText: {
    color: "#002a52"
  },

  lightBlue: {
    backgroundColor: "#40a3ff"
  },

  lightBlueText: {
    color: "#40a3ff"
  },

  blue: {
    backgroundColor: "#0084ff"
  },

  blueBorder: {
    borderColor: "#0084ff"
  },

  blueText: {
    color: "#0084ff"
  },

  darkBlack: {
    backgroundColor: "#0f0f0f"
  },

  darkBlackText: {
    color: "#0f0f0f"
  },

  lightBlack: {
    backgroundColor: "#919191"
  },

  lightBlackText: {
    color: "#919191"
  },

  black: {
    backgroundColor: "#363636"
  },

  blackBorder: {
    borderColor: "#363636"
  },

  blackText: {
    color: "#363636"
  },

  darkGreen: {
    backgroundColor: "#00450d"
  },

  darkGreenText: {
    color: "#00450d"
  },

  lightGreen: {
    backgroundColor: "#7bc98a"
  },

  lightGreenText: {
    color: "#7bc98a"
  },

  green: {
    backgroundColor: "#35b84e"
  },

  greenBorder: {
    borderColor: "#35b84e"
  },

  greenText: {
    color: "#35b84e"
  },

  darkWhite: {
    backgroundColor: "#545454"
  },

  darkWhiteText: {
    color: "#545454"
  },

  lightWhite: {
    backgroundColor: "#b3b3b3"
  },

  lightWhiteText: {
    color: "#b3b3b3"
  },

  white: {
    backgroundColor: "#919191"
  },

  whiteBorder: {
    borderColor: "#919191"
  },

  whiteText: {
    color: "#919191"
  },

  darkAmethyst: {
    backgroundColor: "#2c0661"
  },

  darkAmethystText: {
    color: "#2c0661"
  },

  lightAmethyst: {
    backgroundColor: "#a96bff"
  },

  lightAmethystText: {
    color: "#a96bff"
  },

  amethyst: {
    backgroundColor: "#852eff"
  },

  amethystBorder: {
    borderColor: "#852eff"
  },

  amethystText: {
    color: "#852eff"
  },

  //colors for themes ----------------------------------

  homeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  newListInputContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },

  top: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 15
  },

  gearIcon: {
    position: "absolute",
    top: 5.5,
    right: 8
  },

  gear: {
    width: 40,
    height: 40,
    borderRadius: 100,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: "black",
    shadowOpacity: 0.15
  },

  buttonAndGear: {
    width: 275,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },

  center: {
    alignItems: "center",
    justifyContent: "center"
  },

  listsContainer: {
    marginTop: 30,
    alignSelf: "stretch"
  },

  listsEmptyMsg: {
    marginTop: 20,
    fontSize: 16.5,
    paddingRight: 40,
    paddingLeft: 40,
    position: "absolute",
    textAlign: "center",
    top: 250,
    color: "#fff",
    fontFamily: "Raleway-Light"
  },

  aboveListsInfo: {
    marginTop: 35,
    marginBottom: 30,
    paddingRight: 50,
    paddingLeft: 50,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Raleway-Light"
  },

  yourListsText: {
    fontSize: 19,
    textAlign: "center",
    color: "white",
    fontFamily: "Raleway-Light"
  },

  removeListsBtn: {
    marginTop: 25,
    marginBottom: 20
  },

  removeListsBtnText: {
    color: "#fff",
    textDecorationLine: "underline",
    fontSize: 16,
    fontFamily: "Raleway-Medium"
  }
});
