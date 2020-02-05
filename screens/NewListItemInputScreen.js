import React, { Component } from "react";
import { StatusBar, SafeAreaView, StyleSheet } from "react-native";
import NewListItemInput from "../components/NewListItemInput";
import { connect } from "react-redux";

class NewListItemInputScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.newListItemInputContainer}>
        <StatusBar barStyle="dark-content" />
        <NewListItemInput
          //pass the navigate method to the child component using a prop
          goBackToMyLists={() => this.props.navigation.navigate("Home")}
          listId={this.props.navigation.getParam("listId")}
          listName={this.props.navigation.getParam("name")}
          lists={this.props.lists}
          darkColor={this.props.navigation.getParam("darkColor")}
          lightColor={this.props.navigation.getParam("lightColor")}
          normalColor={this.props.navigation.getParam("normalColor")}
          lightColorText={this.props.navigation.getParam("lightColorText")}
          normalColorText={this.props.navigation.getParam("normalColorText")}
          borderColor={this.props.navigation.getParam("borderColor")}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return { lists: state.lists };
};

export default connect(mapStateToProps)(NewListItemInputScreen);

const styles = StyleSheet.create({
  newListItemInputContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  }
});
