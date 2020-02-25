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
import { SplashScreen, AppLoading } from "expo";
import CreateNewListBtn from "../components/CreateNewListBtn";
import Lists from "../components/Lists";
import WelcomeMSG from "../components/WelcomeMSG";
import { connect } from "react-redux";
import ListItem from "../components/ListItem";
import { Foundation, Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as Animatable from "react-native-animatable";

class HomeScreen extends Component {
  state = {
    toggleRemoveList: false,
    fontLoaded: false,
    hideTop: false
  };

  //import the fonts
  async componentDidMount() {
    await Font.loadAsync({
      "Raleway-Medium": require("../assets/fonts/Raleway-Medium.ttf"),
      "Raleway-Light": require("../assets/fonts/Raleway-Light.ttf")
    });
  }

  //toggle hide top
  toggleHideTop = () => {
    this.setState({ hideTop: !this.state.hideTop });
  };

  //when navigating away from the page, turn off the toggle for the delete list button if it's on
  turnOffToggle = () => {
    this.setState({ toggleRemoveList: false });
  };

  //when lists are empty force the top to show again if it's hidden
  forceShowTop = () => {
    this.props.lists.length === 1 ? this.setState({ hideTop: false }) : null;
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
    } else if (this.props.themeColor === "cheetah") {
      return styles.darkCheetah;
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
    } else if (this.props.themeColor === "cheetah") {
      return styles.darkCheetahText;
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
    } else if (this.props.themeColor === "cheetah") {
      return styles.lightCheetah;
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
    } else if (this.props.themeColor === "cheetah") {
      return styles.lightCheetahText;
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
    } else if (this.props.themeColor === "cheetah") {
      return styles.cheetah;
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
    } else if (this.props.themeColor === "cheetah") {
      return styles.cheetahText;
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
    } else if (this.props.themeColor === "cheetah") {
      return styles.cheetahBorder;
    }
  };

  //centering the top half based on if there is lists or not
  center = () => {
    if (this.props.lists.length > 1) {
      return styles.centerNoFlex;
    } else if (this.props.lists.length === 0) {
      return styles.centerFlex;
    }
  };

  render() {
    return (
      <SafeAreaView style={[styles.homeContainer, this.darkThemeColor()]}>
        <StatusBar barStyle="light-content" />
        <View
          style={[
            styles.top,
            this.props.lists.length === 0 ? { marginBottom: 30 } : null
          ]}
        >
          <View
            style={this.state.hideTop ? { display: "none" } : styles.topHalf}
          >
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
          {/** above the lists info */}
          {this.props.lists.length > 1 ? (
            <View style={styles.aboveListsInfo}>
              {this.props.lists.length === this.props.totalCompleted ? (
                <View
                  style={[
                    styles.yourListsTextContainer,
                    { backgroundColor: "#4fc951" }
                  ]}
                >
                  <Ionicons
                    name="ios-checkmark"
                    style={{ marginRight: 5, fontSize: 30 }}
                    size={25}
                    color="white"
                  />
                  <Text style={styles.yourListsText}>All lists completed</Text>
                </View>
              ) : (
                <View style={styles.completedAndLists}>
                  <View
                    style={[
                      styles.yourListsTextContainer,
                      this.lightThemeColor()
                    ]}
                  >
                    <Text style={styles.yourListsText}>
                      {this.props.lists.length} lists
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.yourListsTextContainer,
                      this.lightThemeColor()
                    ]}
                  >
                    <Text style={styles.yourListsText}>
                      {this.props.totalCompleted} Complete
                    </Text>
                  </View>
                </View>
              )}
              <TouchableOpacity
                style={styles.removeListsBtn}
                onPress={() =>
                  this.setState({
                    toggleRemoveList: !this.state.toggleRemoveList
                  })
                }
              >
                {!this.state.toggleRemoveList ? (
                  <View
                    style={[
                      styles.removeListsTextContainerNormal,
                      this.normalThemeColor()
                    ]}
                  >
                    <Text style={styles.removeListsBtnText}>Delete a list</Text>
                  </View>
                ) : (
                  <View style={styles.removeListsTextContainerGreen}>
                    <Text style={styles.removeListsBtnText}>I'm done!</Text>
                  </View>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.hideTopBtn, this.darkThemeColor()]}
                onPress={() => {
                  this.toggleHideTop();
                }}
              >
                {this.state.hideTop === false ? (
                  <Ionicons
                    name="ios-arrow-up"
                    style={styles.arrowUpBtn}
                    color="white"
                    size={25}
                  />
                ) : (
                  <Ionicons
                    name="ios-arrow-down"
                    style={styles.arrowDownBtn}
                    color="white"
                    size={25}
                  />
                )}
              </TouchableOpacity>
            </View>
          ) : null}
          {this.props.lists.length === 1 ? (
            <View style={styles.aboveListsInfo}>
              {this.props.lists.length === this.props.totalCompleted ? (
                <View
                  style={[
                    styles.yourListsTextContainer,
                    { backgroundColor: "#4fc951" }
                  ]}
                >
                  <Ionicons
                    name="ios-checkmark"
                    style={{ marginRight: 5, fontSize: 30 }}
                    size={25}
                    color="white"
                  />
                  <Text style={styles.yourListsText}>All lists completed</Text>
                </View>
              ) : (
                <View style={styles.completedAndLists}>
                  <View
                    style={[
                      styles.yourListsTextContainer,
                      this.lightThemeColor()
                    ]}
                  >
                    <Text style={styles.yourListsText}>
                      {this.props.lists.length} list
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.yourListsTextContainer,
                      this.lightThemeColor()
                    ]}
                  >
                    <Text style={styles.yourListsText}>
                      {this.props.totalCompleted} Complete
                    </Text>
                  </View>
                </View>
              )}
              <TouchableOpacity
                style={styles.removeListsBtn}
                onPress={() =>
                  this.setState({
                    toggleRemoveList: !this.state.toggleRemoveList
                  })
                }
              >
                {!this.state.toggleRemoveList ? (
                  <View
                    style={[
                      styles.removeListsTextContainerNormal,
                      this.normalThemeColor()
                    ]}
                  >
                    <Text style={styles.removeListsBtnText}>Delete a list</Text>
                  </View>
                ) : (
                  <View style={styles.removeListsTextContainerGreen}>
                    <Text style={styles.removeListsBtnText}>I'm done!</Text>
                  </View>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.hideTopBtn, this.darkThemeColor()]}
                onPress={() => {
                  this.toggleHideTop();
                }}
              >
                {this.state.hideTop === false ? (
                  <Ionicons
                    name="ios-arrow-up"
                    style={styles.arrowUpBtn}
                    color="white"
                    size={25}
                  />
                ) : (
                  <Ionicons
                    name="ios-arrow-down"
                    style={styles.arrowDownBtn}
                    color="white"
                    size={25}
                  />
                )}
              </TouchableOpacity>
            </View>
          ) : null}
        </View>

        {/**this scrollview contains the total amount of list's text, the delete list button, and the lists themselves */}
        {this.state.fontLoaded ? (
          <ScrollView
            style={[styles.listsContainer, this.normalThemeColor()]}
            contentContainerStyle={this.center()}
          >
            {this.props.lists.length === 0 ? (
              <Text style={styles.listsEmptyMsg}>
                You don't have any lists! To create a new list, press the create
                new list button at the top!
              </Text>
            ) : (
              <View style={styles.listsMainContainer}>
                {this.props.lists.map((list, index) => (
                  <Lists
                    key={index}
                    name={list.name}
                    id={index}
                    listId={list.listId}
                    showTop={this.forceShowTop}
                    lists={this.props.lists}
                    items={list.items}
                    listComplete={list.listComplete}
                    listsArray={this.props.listsArray}
                    total={this.props.totalCompleted}
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
                        listId: index,
                        name: list.name,
                        darkColor: this.darkThemeColor(),
                        normalColor: this.normalThemeColor(),
                        lightColor: this.lightThemeColor(),
                        lightColorText: this.lightThemeColorText(),
                        normalColorText: this.normalThemeColorText(),
                        borderColor: this.borderColor()
                      })
                    }
                    turnOffToggle={this.turnOffToggle}
                    totalPrice={list.totalPrice}
                  />
                ))}
              </View>
            )}
          </ScrollView>
        ) : (
          <AppLoading
            startAsync={this.componentDidMount}
            onFinish={() => {
              this.setState({ fontLoaded: true });
            }}
            onError={console.warn}
          />
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
    themeColor: state.themeColor,
    totalCompleted: state.totalListsCompleted,
    listsArray: state.listsCompleteArray
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

  darkCheetah: {
    backgroundColor: "#1a1a1a"
  },

  darkCheetahText: {
    color: "#1a1a1a"
  },

  lightCheetah: {
    backgroundColor: "#edc86d"
  },

  lightCheetahText: {
    color: "#edc86d"
  },

  cheetah: {
    backgroundColor: "#DDAA36"
  },

  cheetahBorder: {
    borderColor: "#DDAA36"
  },

  cheetahText: {
    color: "#DDAA36"
  },

  //colors for themes ----------------------------------

  homeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  topHalf: {
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center"
  },

  listsMainContainer: {
    width: "100%",
    paddingTop: 85,
    justifyContent: "center",
    alignItems: "center"
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
    width: "100%",
    zIndex: 100
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

  centerFlex: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },

  centerNoFlex: {
    alignItems: "center",
    justifyContent: "center",
    flex: 0
  },

  listsContainer: {
    width: "100%"
  },

  hideTopBtn: {
    position: "absolute",
    bottom: -20,
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: "black",
    shadowOpacity: 0.15
  },

  arrowDownBtn: {
    position: "absolute",
    top: 5
  },

  listsEmptyMsg: {
    fontSize: 16.5,
    paddingRight: 40,
    paddingLeft: 40,
    textAlign: "center",
    color: "#fff",
    fontFamily: "Raleway-Light"
  },

  aboveListsInfo: {
    width: "100%",
    marginTop: 30,
    paddingTop: 25,
    paddingBottom: 35,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ededed",
    position: "relative"
  },

  removeListsTextContainerNormal: {
    height: 37,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center"
  },

  removeListsTextContainerGreen: {
    backgroundColor: "#ff4a4a",
    height: 37,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center"
  },

  yourListsText: {
    fontSize: 14,
    textAlign: "center",
    color: "white",
    fontFamily: "Raleway-Medium"
  },

  yourListsTextContainer: {
    height: 37,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 100,
    marginRight: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },

  removeListsBtnText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Raleway-Medium"
  },

  completedAndLists: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  removeListsBtn: {
    alignItems: "center",
    justifyContent: "center"
  }
});
