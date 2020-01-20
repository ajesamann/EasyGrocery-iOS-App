import React, { Component } from "react";
import {
  TouchableOpacity,
  StatusBar,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Switch,
  Picker,
  Alert
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import * as Animatable from "react-native-animatable";
import * as Font from "expo-font";

class Settings extends Component {
  state = {
    welcomeMsg: this.props.customMsg,
    themeColor: this.props.themeColor,
    changeWelcomeMessage: this.props.useCustomMsg,
    settingsSaved: false,
    allListsDeleted: false,
    tooLong: false,
    isEmpty: false
  };

  //load in the fonts
  async componentDidMount() {
    await Font.loadAsync({
      "Raleway-Medium": require("../assets/fonts/Raleway-Medium.ttf"),
      "Raleway-Light": require("../assets/fonts/Raleway-Light.ttf")
    });
  }

  //set the theme the user picked
  setColorTheme = color => {
    this.props.dispatch({
      type: "SET_COLOR_THEME",
      payload: color
    });
  };

  //set the message if the user selected custom message
  setMessage = (message, isOn) => {
    this.props.dispatch({
      type: "SET_MESSAGE",
      payload: message,
      isOn
    });
  };

  //show settings saved message once successfully saved
  showSuccessMsg = () => {
    this.setState({
      settingsSaved: true,
      isEmpty: false,
      tooLong: false
    });

    setTimeout(() => {
      this.setState({ settingsSaved: false });
    }, 2500);
  };

  //delete all lists method, get user feedback
  deleteAllLists = () => {
    Alert.alert(
      "Delete all lists",
      "Are you sure you want to proceed?",
      [
        {
          text: "Yes",
          onPress: () => {
            this.props.dispatch({
              type: "DELETE_ALL_LISTS"
            });
            this.setState({ allListsDeleted: true });
            setTimeout(() => {
              this.setState({ allListsDeleted: false });
            }, 2500);
          }
        },
        {
          text: "No",
          onPress: () => null
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.settingsContainer}>
        <View style={styles.settingsTitleContainer}>
          <Text style={styles.settingsTitle}>Settings</Text>
        </View>
        {this.state.tooLong &&
        this.state.welcomeMsg.length > 13 &&
        this.state.changeWelcomeMessage ? (
          <Animatable.View
            animation={"fadeIn"}
            duration={450}
            easing={"ease-in-out"}
            style={styles.settingsSaved}
          >
            <AntDesign
              name="exclamationcircle"
              style={styles.backIcon}
              size={25}
              color="#ff4a4a"
            />
            <Text style={styles.errorText}>
              Message must be less than 14 characters!
            </Text>
          </Animatable.View>
        ) : null}
        {this.state.isEmpty &&
        this.state.welcomeMsg.length === 0 &&
        this.state.changeWelcomeMessage ? (
          <Animatable.View
            animation={"fadeIn"}
            duration={450}
            easing={"ease-in-out"}
            style={styles.settingsSaved}
          >
            <AntDesign
              name="exclamationcircle"
              style={styles.backIcon}
              size={25}
              color="#ff4a4a"
            />
            <Text style={styles.errorText}>Message can't be empty!</Text>
          </Animatable.View>
        ) : null}
        {this.state.settingsSaved ? (
          <Animatable.View
            animation={"fadeIn"}
            duration={450}
            easing={"ease-in-out"}
            style={styles.settingsSaved}
          >
            <Ionicons
              name="ios-checkmark-circle"
              style={styles.backIcon}
              size={25}
              color="#35b84e"
            />
            <Text style={styles.settingsSavedText}>
              Settings saved successfully
            </Text>
          </Animatable.View>
        ) : null}
        {this.state.allListsDeleted && this.state.settingsSaved === false ? (
          <Animatable.View
            animation={"fadeIn"}
            duration={450}
            easing={"ease-in-out"}
            style={styles.settingsSaved}
          >
            <Ionicons
              name="ios-checkmark-circle"
              style={styles.backIcon}
              size={25}
              color="#35b84e"
            />
            <Text style={styles.settingsSavedText}>
              All lists have been deleted
            </Text>
          </Animatable.View>
        ) : null}
        {/**custom welcome message input*/}
        <View style={styles.customMsgContainerAll}>
          <View style={styles.customWelcomeMessage}>
            <Text style={styles.customWelcomeMessageText}>
              Custom Welcome Message
            </Text>
            <Switch
              onValueChange={() => {
                this.setState({
                  changeWelcomeMessage: !this.state.changeWelcomeMessage
                });
                if (this.state.changeWelcomeMessage === false) {
                  this.setState({
                    welcomeMsg: "Welcome!"
                  });
                }
                this.props.dispatch({
                  type: "TOGGLE_USE_MSG",
                  payload: this.state.changeWelcomeMessage
                });
              }}
              value={this.state.changeWelcomeMessage}
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
              trackColor={{ false: "#35b84e", true: "#35b84e" }}
            />
          </View>
          {this.state.changeWelcomeMessage ? (
            <View style={styles.customMsgInputContainer}>
              <TextInput
                style={styles.customWelcomeMessageTextInput}
                placeholder="Custom message"
                value={this.state.welcomeMsg}
                returnKeyType="done"
                onChangeText={text => this.setState({ welcomeMsg: text })}
              />
            </View>
          ) : null}
        </View>
        {/**where the user selects a theme*/}
        <View style={styles.selectorContainer}>
          <Text style={styles.selectorText}>Change Theme:</Text>
          <Picker
            selectedValue={this.state.themeColor}
            onValueChange={theme => this.setState({ themeColor: theme })}
            style={styles.themeSelector}
            itemStyle={styles.themeItems}
          >
            <Picker.Item label="Classic Blue" value="blue" />
            <Picker.Item label="Midnight Black" value="black" />
            <Picker.Item label="Ghost Grey" value="white" />
            <Picker.Item label="Preppy Pink" value="pink" />
            <Picker.Item label="Slime Green" value="green" />
            <Picker.Item label="Amethyst" value="amethyst" />
          </Picker>
        </View>
        {/**delete all lists from the state button*/}
        <TouchableOpacity
          style={styles.deleteAllButton}
          onPress={() => this.deleteAllLists()}
        >
          <Text style={styles.deleteAllText}>Delete all lists</Text>
        </TouchableOpacity>
        {/**save settings button*/}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => {
            if (this.state.changeWelcomeMessage === false) {
              this.setColorTheme(this.state.themeColor);
              this.setMessage(
                this.state.welcomeMsg,
                this.state.changeWelcomeMessage
              );
              this.showSuccessMsg();
            } else if (this.state.welcomeMsg.length === 0) {
              this.setState({ isEmpty: true });
            } else if (this.state.welcomeMsg.length > 13) {
              this.setState({ tooLong: true });
            } else {
              this.setColorTheme(this.state.themeColor);
              this.setMessage(
                this.state.welcomeMsg,
                this.state.changeWelcomeMessage
              );
              this.showSuccessMsg();
            }
          }}
        >
          <Text style={styles.saveText}>Save settings</Text>
        </TouchableOpacity>
        {/**go back to lists aka homescreen button*/}
        <TouchableOpacity
          style={styles.goBack}
          onPress={this.props.goBackToMyLists}
        >
          <AntDesign
            name="leftcircleo"
            style={styles.backIcon}
            size={28}
            color="#424242"
          />
          <Text style={styles.goBackText}>Go back to my lists</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

export default connect()(Settings);

const styles = StyleSheet.create({
  settingsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },

  settingsTitleContainer: {
    position: "absolute",
    top: 65,
    justifyContent: "center",
    alignItems: "center"
  },

  settingsTitle: {
    color: "#424242",
    fontSize: 27,
    fontFamily: "Raleway-Medium"
  },

  customWelcomeMessage: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: 325,
    height: 45,
    borderWidth: 2,
    borderColor: "#424242",
    borderRadius: 5
  },

  customWelcomeMessageText: {
    color: "#424242",
    fontSize: 15,
    fontFamily: "Raleway-Medium"
  },

  customWelcomeMessageTextInput: {
    width: 325,
    textAlign: "center"
  },

  customMsgInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#424242",
    marginTop: 12,
    height: 40,
    borderRadius: 5
  },

  backIcon: {
    marginRight: 10
  },

  themeSelector: {
    width: 150
  },

  themeItems: {
    color: "#424242",
    fontSize: 18,
    height: 100,
    fontFamily: "Raleway-Medium"
  },

  selectorContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderWidth: 2,
    width: 325,
    borderRadius: 5,
    borderColor: "#424242",
    marginTop: 12
  },

  selectorText: {
    color: "#424242",
    fontSize: 15,
    fontFamily: "Raleway-Medium"
  },

  saveButton: {
    width: 325,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#424242",
    borderRadius: 5,
    paddingTop: 14,
    paddingBottom: 14,
    marginTop: 12
  },

  settingsSaved: {
    position: "absolute",
    top: 145,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  settingsSavedText: {
    color: "#35b84e",
    fontSize: 17,
    fontFamily: "Raleway-Light"
  },

  errorText: { color: "#ff4a4a", fontSize: 14, fontFamily: "Raleway-Light" },

  saveText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Raleway-Light"
  },

  deleteAllButton: {
    width: 325,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ff4a4a",
    borderRadius: 5,
    marginTop: 12,
    paddingTop: 8,
    paddingBottom: 8
  },

  deleteAllText: {
    color: "#ff4a4a",
    fontSize: 15,
    fontFamily: "Raleway-Medium"
  },

  goBack: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    bottom: 100
  },

  goBackText: {
    color: "#424242",
    fontSize: 20,
    fontFamily: "Raleway-Medium"
  }
});
