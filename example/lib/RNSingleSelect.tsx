import React, { Component } from "react";
import { Text, View, FlatList, TouchableOpacity, Image } from "react-native";
/**
 * ? Local Imports
 */
import Icon from "./components/Icon";
import styles from "./RNSingleSelect.style";

interface IProps {}

interface IState {}

export default class RNSingleSelect extends Component<IProps, IState> {
  iconRef?: Icon = undefined;
  renderButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.iconRef?.onPressAnimation();
        }}
        style={{
          height: 50,
          width: 250,
          borderRadius: 16,
          justifyContent: "center",
          backgroundColor: "#191a1e",
        }}
        {...this.props}
      >
        <View
          style={{
            marginLeft: 16,
            marginRight: 16,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 16, color: "#fdfdfd", fontWeight: "bold" }}>
            Select
          </Text>
          <Icon
            ref={(ref: Icon) => (this.iconRef = ref)}
            style={{ height: 20, width: 20 }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View>
        {this.renderButton()}
        <Text> textInComponent </Text>
      </View>
    );
  }
}
