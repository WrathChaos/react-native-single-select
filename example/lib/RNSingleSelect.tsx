import React, { Component } from "react";
import { Text, View, FlatList, TouchableOpacity, Image } from "react-native";
/**
 * ? Local Imports
 */
import Icon from "./components/Icon";
import styles from "./RNSingleSelect.style.ts";

interface IProps {}

interface IState {}

export default class RNSingleSelect extends Component<IProps, IState> {
  renderButton = () => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          this.iconRef.spin();
        }}
      >
        <View>
          <Text></Text>
          <Icon
            ref={(ref) => (this.iconRef = ref)}
            style={{ height: 50, width: 50 }}
            reverseAnimation
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
