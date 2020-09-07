import * as React from "react";
import {
  Text,
  View,
  Image,
  Easing,
  Animated,
  ViewStyle,
  TextStyle,
  TextInput,
  ImageStyle,
  ScrollView,
  LayoutAnimation,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
/**
 * ? Local Imports
 */
import Icon from "./components/Icon";
import styles, {
  _imageStyle,
  _menuBarContainer,
  _menuItemContainer,
  _menuButtonContainer,
  _placeholderTextStyle,
} from "./RNSingleSelect.style";

export interface ISingleSelectDataType {
  id: number;
  value: string;
  imageSource?: any;
}

interface IProps {
  width: number;
  height: number;
  imageWidth?: number;
  imageHeight?: number;
  placeholder?: string;
  ImageComponent: any;
  arrowImageStyle?: ImageStyle;
  menuItemTextStyle?: TextStyle;
  menuBarContainerHeight?: number;
  buttonContainerStyle?: ViewStyle;
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

let iconRef: any = undefined;
const RNSingleSelect = (props: IProps) => {
  const [query, setQuery] = React.useState("");
  const [
    selectedItem,
    setSelectedItem,
  ] = React.useState<ISingleSelectDataType | null>(null);
  const [menuToggled, setMenuToggled] = React.useState<boolean | null>(false);
  const [dataBackup, setDataBackup] = React.useState<
    Array<ISingleSelectDataType> | undefined
  >(props.data);
  const [dataSource, setDataSource] = React.useState<
    Array<ISingleSelectDataType> | undefined
  >(props.data);
  const [borderRadiusAnimation, setBorderRadiusAnimation] = React.useState<
    Animated.Value
  >(new Animated.Value(16));
  const [
    menuBarYTranslateAnimation,
    setMenuBarYTranslateAnimation,
  ] = React.useState<Animated.Value>(new Animated.Value(0));

  const { buttonContainerStyle } = props;

  const animateBorderRadius = () => {
    Animated.timing(borderRadiusAnimation, {
      toValue: menuToggled ? 16 : 0,
      duration: 1250,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  };

  const animateSelectionBar = () => {
    Animated.timing(menuBarYTranslateAnimation, {
      toValue: menuToggled ? 0 : 100,
      duration: 250,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const handleOnToggleMenuBar = (isMenuToggled?: boolean) => {
    iconRef?.onPressAnimation();
    animateBorderRadius();
    animateSelectionBar();
    setMenuToggled(isMenuToggled ? isMenuToggled : !menuToggled);
  };

  const handleOnSelectItem = (item: ISingleSelectDataType) => {
    handleOnFilter("");
    setSelectedItem(item);
    handleOnToggleMenuBar();
    props.onSelect && props.onSelect(item);
  };

  const triggerFilterAnimation = () => {
    LayoutAnimation.configureNext({
      duration: 1000,
      create: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.opacity,
        springDamping: 1,
      },
      delete: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.opacity,
        springDamping: 1,
      },
    });
  };

  const handleOnFilter = (text: string) => {
    let newData = dataBackup;
    newData = dataBackup?.filter((item) => {
      const itemData = item.value.toLowerCase();
      const textData = text.toLowerCase();
      return itemData.indexOf(textData) > -1;
    });
    triggerFilterAnimation();
    setQuery(text);
    setSelectedItem({ value: text });
    setDataSource(newData);
  };

  /* -------------------------------------------------------------------------- */
  /*                               Render Methods                               */
  /* -------------------------------------------------------------------------- */

  const renderSingleSelectButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          handleOnToggleMenuBar();
        }}
        {...props}
      >
        <Animated.View
          style={[
            _menuButtonContainer(props.height, props.width),
            {
              borderRadius: borderRadiusAnimation,
            },
            props.buttonContainerStyle,
          ]}
        >
          <View style={styles.buttonContainerGlue}>
            <TextInput
              placeholderTextColor={selectedItem ? "#fff" : "#ccc"}
              style={_placeholderTextStyle(selectedItem)}
              placeholder={props.placeholder || "Select"}
              onFocus={() => handleOnToggleMenuBar(false)}
              onChangeText={(text: string) => {
                if (text.length === 0) handleOnFilter("");
                else handleOnFilter(text);
              }}
            >
              <Text>{selectedItem?.value}</Text>
            </TextInput>
            <Icon
              ref={(ref: Icon) => (iconRef = ref)}
              style={[styles.arrowImageStyle, props.arrowImageStyle]}
              {...props}
            />
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const renderMenuItem = (item: ISingleSelectDataType, index: number) => {
    const { id, value, imageSource } = item;
    const {
      data,
      imageWidth,
      imageHeight,
      menuItemTextStyle,
      ImageComponent = Image,
    } = props;
    return (
      <TouchableHighlight
        key={id}
        style={_menuItemContainer(index, data)}
        onPress={() => {
          handleOnSelectItem(item);
        }}
      >
        <View style={styles.menuBarItemContainerGlue}>
          <ImageComponent
            resizeMode="contain"
            source={imageSource}
            style={_imageStyle(imageHeight, imageWidth)}
            {...props}
          />
          <Text style={[styles.menuItemTextStyle, menuItemTextStyle]}>
            {value}
          </Text>
        </View>
      </TouchableHighlight>
    );
  };

  const renderMenuBar = () => {
    const rotate = menuBarYTranslateAnimation.interpolate({
      inputRange: [0, 25, 50, 75, 100],
      outputRange: [0, 0.5, 0.75, 0.9, 1],
    });
    return (
      <Animated.View
        style={[
          _menuBarContainer(props.menuBarContainerHeight || 150),
          {
            transform: [{ scaleY: rotate }],
          },
          props.menuBarContainerStyle,
        ]}
      >
        <ScrollView>
          {dataSource &&
            dataSource.length > 0 &&
            dataSource.map((item: ISingleSelectDataType, index: number) =>
              renderMenuItem(item, index),
            )}
        </ScrollView>
      </Animated.View>
    );
  };

  return (
    <View>
      {renderSingleSelectButton()}
      {renderMenuBar()}
    </View>
  );
};

export default RNSingleSelect;
