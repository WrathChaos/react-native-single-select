import React, { Component } from "react";
import {
  Animated,
  Text,
  View,
  Image,
  Easing,
  FlatList,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
} from "react-native";
/**
 * ? Local Imports
 */
import Icon from "./components/Icon";
import styles from "./RNSingleSelect.style";

export interface ISingleSelectDataType {
  id: number;
  value: string;
}

interface IProps {
  data: Array<ISingleSelectDataType>;
  onSelect: (selectedItem: ISingleSelectDataType) => void;
}

interface IState {
  menuToggled: boolean;
  borderRadius: Animated.Value;
  menuBarYTranslate: Animated.Value;
  selectedItem?: ISingleSelectDataType | null;
}

export default class RNSingleSelect extends Component<IProps, IState> {
  iconRef?: Icon = undefined;

  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedItem: null,
      menuToggled: false,
      borderRadius: new Animated.Value(16),
      menuBarYTranslate: new Animated.Value(0),
    };
  }

  animateBorderRadius = () => {
    Animated.timing(this.state.borderRadius, {
      toValue: this.state.menuToggled ? 16 : 0,
      duration: 1250,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  };

  animateSelectionBar = () => {
    Animated.timing(this.state.menuBarYTranslate, {
      toValue: this.state.menuToggled ? 0 : 100,
      duration: 550,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  handleOnToggleMenuBar = () => {
    this.iconRef?.onPressAnimation();
    this.animateBorderRadius();
    this.animateSelectionBar();
    this.setState({ menuToggled: !this.state.menuToggled });
  };

  handleOnSelectItem = (item: ISingleSelectDataType) => {
    this.setState({ selectedItem: item }, () => {
      this.handleOnToggleMenuBar();
    });
  };

  /* -------------------------------------------------------------------------- */
  /*                               Render Methods                               */
  /* -------------------------------------------------------------------------- */

  renderButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.handleOnToggleMenuBar();
        }}
        {...this.props}
      >
        <Animated.View
          style={{
            height: 50,
            width: 250,
            borderRadius: this.state.borderRadius,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            justifyContent: "center",
            backgroundColor: "#2b2c32",
          }}
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
            <Text
              style={{
                fontSize: 16,
                color: this.state.selectedItem ? "#fff" : "#fdfdfd",
                fontWeight: "bold",
              }}
            >
              {this.state.selectedItem
                ? this.state.selectedItem.value
                : "Select"}
            </Text>
            <Icon
              ref={(ref: Icon) => (this.iconRef = ref)}
              style={{ height: 20, width: 20 }}
            />
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  renderMenuItem = (item: ISingleSelectDataType, index: number) => {
    const { id, value } = item;
    return (
      <TouchableHighlight
        style={{
          padding: 16,
          borderBottomEndRadius: index === this.props.data.length - 1 ? 16 : 0,
          borderBottomStartRadius:
            index === this.props.data.length - 1 ? 16 : 0,
        }}
        onPress={() => {
          this.handleOnSelectItem(item);
          this.props.onSelect && this.props.onSelect(item);
        }}
      >
        <Text style={{ color: "#52555b" }}>{value}</Text>
      </TouchableHighlight>
    );
  };

  render() {
    const rotate = this.state.menuBarYTranslate.interpolate({
      inputRange: [0, 25, 50, 75, 100],
      outputRange: [0, 0.5, 0.75, 0.9, 1], 
    });
    return (
      <View>
        {this.renderButton()}
        <Animated.View
          style={[
            {
              height: 150,
              backgroundColor: "#171920",
              borderBottomEndRadius: 16,
              borderBottomStartRadius: 16,
            },
            {
              transform: [{ scaleY: rotate }],
            },
          ]}
        >
          <ScrollView>
            {this.props.data &&
              this.props.data.length > 0 &&
              this.props.data.map(
                (item: ISingleSelectDataType, index: number) =>
                  this.renderMenuItem(item, index),
              )}
          </ScrollView>
        </Animated.View>
      </View>
    );
  }
}
