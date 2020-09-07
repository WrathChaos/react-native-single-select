import * as React from "react";
import {
  Animated,
  Text,
  View,
  Easing,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
  ViewStyle,
  ImageStyle,
  TextStyle,
  TextInput,
} from "react-native";
/**
 * ? Local Imports
 */
import Icon from "./components/Icon";
import styles, {
  _placeholderTextStyle,
  _menuItemContainer,
} from "./RNSingleSelect.style";

export interface ISingleSelectDataType {
  id: number;
  value: string;
}

interface IProps {
  placeholder?: string;
  buttonContainerStyle?: ViewStyle;
  arrowImageStyle?: ImageStyle;
  menuItemTextStyle?: TextStyle;
  menuBarContainerStyle?: ViewStyle;
  data?: Array<ISingleSelectDataType>;
  onSelect: (selectedItem: ISingleSelectDataType) => void;
}

interface IState {
  query: string;
  dataBackup?: Array<ISingleSelectDataType>;
  dataSource?: Array<ISingleSelectDataType>;
  menuToggled: boolean;
  borderRadius: Animated.Value;
  menuBarYTranslate: Animated.Value;
  selectedItem?: ISingleSelectDataType | null;
}

export default class RNSingleSelect extends React.Component<IProps, IState> {
  iconRef?: Icon = undefined;

  constructor(props: IProps) {
    super(props);
    this.state = {
      query: "",
      selectedItem: null,
      menuToggled: false,
      dataBackup: props.data,
      dataSource: props.data,
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
      duration: 250,
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

  handleOnFilter = (text: string) => {
    console.log("Text: ", text);
    if (text.length === 0) {
      this.handleOnFilter("");
    } else {
      let newData = this.state.dataBackup;
      newData = this.state.dataBackup?.filter((item) => {
        const itemData = item.value.toLowerCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      console.log("DataSource: ", newData);
      // LayoutAnimation.configureNext(CustomLayoutSpring(null, null, "scaleXY"));
      this.setState({
        query: text,
        dataSource: newData,
      });
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                               Render Methods                               */
  /* -------------------------------------------------------------------------- */

  renderSingleSelectButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.handleOnToggleMenuBar();
        }}
        {...this.props}
      >
        <Animated.View
          style={[
            styles.buttonContainer,
            {
              borderRadius: this.state.borderRadius,
            },
            this.props.buttonContainerStyle,
          ]}
        >
          <View style={styles.buttonContainerGlue}>
            <TextInput
              style={_placeholderTextStyle(this.state.selectedItem)}
              placeholder={
                this.state.selectedItem
                  ? this.state.selectedItem.value
                  : this.props.placeholder || "Select"
              }
              onChangeText={(text: string) => this.handleOnFilter(text)}
            />
            <Icon
              ref={(ref: Icon) => (this.iconRef = ref)}
              style={[styles.arrowImageStyle, this.props.arrowImageStyle]}
              {...this.props}
            />
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  renderMenuItem = (item: ISingleSelectDataType, index: number) => {
    const { value } = item;
    return (
      <TouchableHighlight
        style={_menuItemContainer(index, this.props.data)}
        onPress={() => {
          this.handleOnSelectItem(item);
          this.props.onSelect && this.props.onSelect(item);
        }}
      >
        <Text style={[styles.menuItemTextStyle, this.props.menuItemTextStyle]}>
          {value}
        </Text>
      </TouchableHighlight>
    );
  };

  renderMenuBar = () => {
    const rotate = this.state.menuBarYTranslate.interpolate({
      inputRange: [0, 25, 50, 75, 100],
      outputRange: [0, 0.5, 0.75, 0.9, 1],
    });
    return (
      <Animated.View
        style={[
          styles.menuBarContainer,
          {
            transform: [{ scaleY: rotate }],
          },
          this.props.menuBarContainerStyle,
        ]}
      >
        <ScrollView>
          {this.state.dataSource &&
            this.state.dataSource.length > 0 &&
            this.state.dataSource.map(
              (item: ISingleSelectDataType, index: number) =>
                this.renderMenuItem(item, index),
            )}
        </ScrollView>
      </Animated.View>
    );
  };

  render() {
    return (
      <View>
        {this.renderSingleSelectButton()}
        {this.renderMenuBar()}
      </View>
    );
  }
}
