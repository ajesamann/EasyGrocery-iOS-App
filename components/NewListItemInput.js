import React, { Component } from "react";
import {
  TouchableOpacity,
  TextInput,
  Button,
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Picker
} from "react-native";
import { connect } from "react-redux";
import { AntDesign, Ionicons, Entypo } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import * as Font from "expo-font";
import ModalSelector from "react-native-modal-selector";
import { TextInputMask } from "react-native-masked-text";

class NewListItemInput extends Component {
  state = {
    //errors
    itemLabelMissing: false,
    itemMeasurementMissing: false,
    isEmpty: false,
    tooLong: false,
    tooManyDecimals: false,
    //item successfully added
    itemAdded: false,
    //item attributes
    itemName: "",
    itemQuantity: 1,
    itemMeasurementNumber: "",
    itemMeasurementLabel: "Measurement (optional)",
    itemPrice: ""
  };

  //loading in the fonts
  async componentDidMount() {
    await Font.loadAsync({
      "Raleway-Medium": require("../assets/fonts/Raleway-Medium.ttf"),
      "Raleway-Light": require("../assets/fonts/Raleway-Light.ttf")
    });
  }

  //method to add item to the list
  addItemToList = (
    name,
    quantity,
    measurementLabel,
    measurementNumber,
    price
  ) => {
    if (this.state.itemPrice.length === 0) {
      this.props.dispatch({
        type: "ADD_LIST_ITEM",
        itemName: name,
        itemQuantity: quantity,
        listId: this.props.listId,
        measurementLabel,
        measurementNumber,
        price: 0
      });
    } else {
      this.props.dispatch({
        type: "ADD_LIST_ITEM",
        itemName: name,
        itemQuantity: quantity,
        listId: this.props.listId,
        measurementLabel,
        measurementNumber,
        price: parseFloat(price).toFixed(2)
      });
    }
    this.setState({
      //errors
      itemLabelMissing: false,
      itemMeasurementMissing: false,
      isEmpty: false,
      tooLong: false,
      tooManyDecimals: false,
      //item successfully added
      itemAdded: true,
      //item attributes
      itemName: "",
      itemQuantity: 1,
      itemMeasurementNumber: "",
      itemMeasurementLabel: "Measurement (optional)",
      itemPrice: ""
    });

    setTimeout(() => {
      this.setState({ itemAdded: false });
    }, 2500);
  };

  //item quantity increaser
  increaseQuantity = () => {
    this.setState({ itemQuantity: this.state.itemQuantity + 1 });
  };

  //item quantity decreaser
  decreaseQuantity = () => {
    if (this.state.itemQuantity === 1) {
      null;
    } else {
      this.setState({ itemQuantity: this.state.itemQuantity - 1 });
    }
  };

  //prevent text from being placed into this text field
  onChangePrice = price => {
    this.setState({ itemPrice: price.replace(/[^,.0-9]/g, "") });
  };

  //prevent text from being placed into this text field
  onChangeMeasurement = measurement => {
    this.setState({
      itemMeasurementNumber: measurement.replace(/[^,.0-9]/g, "")
    });
  };

  render() {
    //the info for the popup menu for the measurements
    const checkDecimal = /[.]/gi;
    let index = 0;
    const data = [
      { key: index++, label: "Teaspoon(s)" },
      { key: index++, label: "Tablespoon(s)" },
      { key: index++, label: "Ounce(s)" },
      { key: index++, label: "Pound(s)" },
      { key: index++, label: "Gallon(s)" },
      { key: index++, label: "Cup(s)" }
    ];

    return (
      <SafeAreaView style={styles.nlContainer}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, this.props.normalColorText]}>
            {this.props.listName}
          </Text>
        </View>
        <View style={styles.errorsWrapper}>
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
          {/**ERRORS*/}
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
          {this.state.tooLong === true && this.state.itemName.length > 18 ? (
            <Animatable.View
              animation={"fadeIn"}
              duration={450}
              easing={"ease-in-out"}
              style={styles.warningText}
            >
              <Text style={{ color: "#fff", fontFamily: "Raleway-Medium" }}>
                Item name can only be 18 characters!
              </Text>
            </Animatable.View>
          ) : null}
          {this.state.itemLabelMissing &&
          this.state.itemName.length < 19 &&
          this.state.itemName.length !== 0 &&
          this.state.itemMeasurementLabel === "Measurement (optional)" &&
          this.state.itemMeasurementNumber.length !== 0 ? (
            <Animatable.View
              animation={"fadeIn"}
              duration={450}
              easing={"ease-in-out"}
              style={styles.warningText}
            >
              <Text style={{ color: "#fff", fontFamily: "Raleway-Medium" }}>
                Must select a measurement!
              </Text>
            </Animatable.View>
          ) : null}
          {this.state.itemMeasurementMissing &&
          this.state.itemName.length < 19 &&
          this.state.itemName.length !== 0 &&
          this.state.itemMeasurementNumber.length === 0 &&
          this.state.itemMeasurementLabel !== "Measurement (optional)" ? (
            <Animatable.View
              animation={"fadeIn"}
              duration={450}
              easing={"ease-in-out"}
              style={styles.warningText}
            >
              <Text style={{ color: "#fff", fontFamily: "Raleway-Medium" }}>
                Type in a measurement amount!
              </Text>
            </Animatable.View>
          ) : null}
          {this.state.itemMeasurementNumber.length === 0 &&
          this.state.itemMeasurementLabel === "Measurement (optional)" ? (
            this.state.itemPrice.length > 0 &&
            this.state.tooManyDecimals &&
            this.state.itemPrice.match(checkDecimal) !== null &&
            this.state.itemPrice.match(checkDecimal).length > 1 &&
            this.state.itemName.length !== 0 &&
            this.state.itemName.length < 19 ? (
              <Animatable.View
                animation={"fadeIn"}
                duration={450}
                easing={"ease-in-out"}
                style={styles.warningText}
              >
                <Text style={{ color: "#fff", fontFamily: "Raleway-Medium" }}>
                  Price should be in USD format!
                </Text>
              </Animatable.View>
            ) : null
          ) : null}
          {this.state.itemMeasurementNumber.length > 0 ||
          this.state.itemMeasurementLabel !== "Measurement (optional)" ? (
            this.state.itemPrice.length > 0 &&
            this.state.tooManyDecimals &&
            this.state.itemPrice.match(checkDecimal) !== null &&
            this.state.itemPrice.match(checkDecimal).length > 1 &&
            this.state.itemName.length !== 0 &&
            this.state.itemName.length < 19 &&
            this.state.itemMeasurementNumber > 0 &&
            this.state.itemMeasurementLabel !== "Measurement (optional)" ? (
              <Animatable.View
                animation={"fadeIn"}
                duration={450}
                easing={"ease-in-out"}
                style={styles.warningText}
              >
                <Text style={{ color: "#fff", fontFamily: "Raleway-Medium" }}>
                  Price should be in USD format!
                </Text>
              </Animatable.View>
            ) : null
          ) : null}
        </View>
        <View style={styles.inputWrapperAll}>
          {/**ITEM NAME*/}
          <View style={[styles.inputWrapper, this.props.borderColor]}>
            <TextInput
              style={[styles.listNameInput, this.props.borderColor]}
              returnKeyType="done"
              placeholder="Name of item"
              value={this.state.itemName}
              onChangeText={text => this.setState({ itemName: text })}
            />
            {/**ITEM QUANTITY*/}
            <View style={styles.quantityInput}>
              <TouchableOpacity
                style={[styles.quantityBtns, this.props.normalColor]}
                onPress={() => {
                  this.decreaseQuantity();
                }}
              >
                <Entypo
                  name="minus"
                  style={this.props.lightColorText}
                  size={29}
                />
              </TouchableOpacity>
              <View>
                <Text style={[styles.quantity, this.props.normalColorText]}>
                  {this.state.itemQuantity}
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.quantityBtns, this.props.normalColor]}
                onPress={() => {
                  this.increaseQuantity();
                }}
              >
                <Ionicons
                  name="md-add"
                  style={this.props.lightColorText}
                  size={29}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/**ITEM MEASUREMENT STUFF*/}
          <View style={styles.mSelectorContainer}>
            <TextInput
              style={[styles.mInput, this.props.borderColor]}
              returnKeyType="done"
              keyboardType="numeric"
              maxLength={5}
              placeholder="0"
              value={this.state.itemMeasurementNumber}
              onChangeText={measurement => {
                this.onChangeMeasurement(measurement);
              }}
            />
            <ModalSelector
              selectTextStyle={styles.sTextColor}
              initValueTextStyle={styles.sTextColor}
              selectStyle={[styles.mSelector, this.props.normalColor]}
              cancelText="Remove measurement"
              onModalClose={() => {
                this.setState({
                  itemMeasurementLabel: "Measurement (optional)"
                });
              }}
              data={data}
              initValue={this.state.itemMeasurementLabel}
              onChange={option => {
                this.setState({ itemMeasurementLabel: option.label });
              }}
            />
          </View>
          {/**ITEM PRICE*/}
          <View style={styles.priceContainer}>
            <TextInput
              style={[styles.priceInput, this.props.borderColor]}
              returnKeyType="done"
              keyboardType="numeric"
              placeholder="$0.00 (optional)"
              value={this.state.itemPrice}
              onChangeText={price => {
                this.onChangePrice(price);
              }}
            />
          </View>
          {/**add item to specific list button*/}
          <TouchableOpacity
            style={[styles.button, this.props.normalColor]}
            onPress={() => {
              if (this.state.itemName.length === 0) {
                this.setState({ isEmpty: true, itemQuantity: 1 });
              } else if (this.state.itemName.length > 18) {
                this.setState({ tooLong: true, itemQuantity: 1 });
              } else if (
                this.state.itemMeasurementNumber.length > 0 &&
                this.state.itemMeasurementLabel === "Measurement (optional)"
              ) {
                this.setState({
                  itemLabelMissing: true
                });
              } else if (
                this.state.itemMeasurementNumber.length === 0 &&
                this.state.itemMeasurementLabel !== "Measurement (optional)"
              ) {
                this.setState({
                  itemMeasurementMissing: true
                });
              } else if (
                this.state.itemPrice.length > 0 &&
                this.state.itemPrice.match(checkDecimal) !== null &&
                this.state.itemPrice.match(checkDecimal).length > 1
              ) {
                this.setState({ tooManyDecimals: true });
              } else {
                this.addItemToList(
                  this.state.itemName,
                  this.state.itemQuantity,
                  this.state.itemMeasurementLabel,
                  this.state.itemMeasurementNumber,
                  this.state.itemPrice
                );
              }
            }}
          >
            <View style={[styles.plusContainer, this.props.lightColor]}>
              <Text style={styles.plusSign}>+</Text>
            </View>
            <Text style={styles.text}>Add item to list</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomBtnsContainer}>
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
        </View>
      </SafeAreaView>
    );
  }
}

export default connect()(NewListItemInput);

const styles = StyleSheet.create({
  nlContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#fff"
  },

  inputWrapperAll: {
    justifyContent: "center",
    alignItems: "center",
    height: 350
  },

  priceInput: {
    fontSize: 20,
    borderBottomWidth: 2,
    width: 335,
    paddingBottom: 5
  },

  priceContainer: {
    marginTop: 30
  },

  mInput: {
    fontSize: 20,
    width: 75,
    height: 40,
    borderWidth: 2,
    textAlign: "center"
  },

  mSelectorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 335,
    marginTop: 35
  },

  mSelector: {
    borderWidth: 0,
    borderRadius: 0,
    width: 230,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },

  sTextColor: {
    color: "white"
  },

  bottomBtnsContainer: {
    justifyContent: "space-between",
    alignItems: "center"
  },

  button: {
    width: 200,
    height: 40,
    borderRadius: 100,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 50
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
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 100,
    backgroundColor: "#4fc951",
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },

  inputWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    width: 335
  },

  quantityInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  quantityBtns: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center"
  },

  quantity: {
    fontSize: 18,
    marginRight: 15,
    marginLeft: 15
  },

  listNameInput: {
    fontSize: 18,
    textAlign: "left",
    fontFamily: "Raleway-Medium",
    marginLeft: 10,
    width: 180
  },

  titleContainer: {
    justifyContent: "center",
    alignItems: "center"
  },

  title: {
    fontSize: 27,
    fontFamily: "Raleway-Medium"
  }
});
