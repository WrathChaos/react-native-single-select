import * as React from "react";
import {
  Text,
  View,
  Image,
  Easing,
  FlatList,
  Animated,
  ViewStyle,
  TextStyle,
  TextInput,
  ImageStyle,
  LayoutAnimation,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import Spinner from "react-native-spinkit";
/**
 * ? Local Imports
 */
import Icon from "./components/Icon";
import styles, {
  _imageStyle,
  _menuBarContainer,
  _menuItemContainer,
  _menuItemTextStyle,
  _menuButtonContainer,
  _placeholderTextStyle,
} from "./RNSingleSelect.style";
import { ThemeColors, DARK, LIGHT } from "./theme";

export interface ISingleSelectDataType {
  id: number;
  value: string;
  imageSource?: any;
  data?: any;
}

interface IProps {
  width?: number;
  height?: number;
  darkMode?: boolean;
  imageWidth?: number;
  TextComponent?: any;
  imageHeight?: number;
  placeholder?: string;
  ImageComponent?: any;
  spinnerType?: string;
  spinnerSize?: number;
  spinnerColor?: string;
  disableAbsolute?: boolean;
  placeholderTextStyle?: any;
  animatedBorderRadius?: number;
  placeholderTextColor?: string;
  arrowImageStyle?: ImageStyle;
  menuItemTextStyle?: TextStyle;
  menuBarContainerWidth?: number;
  menuBarContainerHeight?: number;
  disableFilterAnimation?: boolean;
  buttonContainerStyle?: ViewStyle;
  menuBarContainerStyle?: ViewStyle;
  data?: Array<ISingleSelectDataType>;
  onTextChange?: (text: string) => void;
  onSelect: (selectedItem: ISingleSelectDataType) => void;
  editable?: boolean;
}

let iconRef: any = undefined;
const RNSingleSelect = (props: IProps) => {
  const {
      data,
      width,
      height,
      darkMode,
      onSelect,
      placeholder,
      onTextChange,
      arrowImageStyle,
      animatedBorderRadius,
      placeholderTextColor,
      buttonContainerStyle,
      placeholderTextStyle,
      menuBarContainerStyle,
      menuBarContainerHeight = 150,
      menuBarContainerWidth = 250,
      disableAbsolute = false,
      ImageComponent = Image,
      TextComponent = Text,
      disableFilterAnimation = false,
      spinnerType = "ThreeBounce",
      spinnerSize = 30,
      spinnerColor,
      editable = true
  } = props;

  const [
      selectedItem,
      setSelectedItem,
  ] = React.useState<ISingleSelectDataType | null>(null);
  const [menuToggled, setMenuToggled] = React.useState<boolean | null>(false);
  const [dataBackup, setDataBackup] = React.useState<
      Array<ISingleSelectDataType> | undefined
      >(data);
  const [dataSource, setDataSource] = React.useState<
      Array<ISingleSelectDataType> | undefined
      >(data);
  const [borderRadiusAnimation, setBorderRadiusAnimation] = React.useState<
      Animated.Value
      >(new Animated.Value(animatedBorderRadius || 16));
  const [
      menuBarYTranslateAnimation,
      setMenuBarYTranslateAnimation,
  ] = React.useState<Animated.Value>(new Animated.Value(0));
  const [theme, setTheme] = React.useState(DARK);

  React.useEffect(() => {
      if (darkMode) setTheme(DARK);
      else setTheme(LIGHT);
  }, []);

  React.useEffect(() => {
      setDataSource(data);
      setDataBackup(data);
  }, [data]);

  const animateBorderRadius = () => {
      Animated.timing(borderRadiusAnimation, {
          toValue: menuToggled ? animatedBorderRadius || 16 : 0,
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
      onSelect && onSelect(item);
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
      !disableFilterAnimation && triggerFilterAnimation();
      setDataSource(newData);
      setSelectedItem({ value: text });
      setDataSource(newData);
  };

  /* -------------------------------------------------------------------------- */
  /*                               Render Methods                               */
  /* -------------------------------------------------------------------------- */

  const renderSingleSelectButton = () => {
      return (
          <TouchableOpacity
              {...props}
              onPress={() => {
                  handleOnToggleMenuBar();
              }}
          >
              <Animated.View
                  style={[
                      _menuButtonContainer(theme, height, width),
                      {
                          borderRadius: borderRadiusAnimation,
                      },
                      buttonContainerStyle,
                  ]}
              >
                  <View style={styles.buttonContainerGlue}>
                      <TextInput
                          editable={editable}
                          placeholderTextColor={
                              placeholderTextColor
                                  ? placeholderTextColor
                                  : selectedItem
                                  ? ThemeColors[theme].textColor
                                  : ThemeColors[theme].placeholderColor
                          }
                          style={[
                              _placeholderTextStyle(theme, selectedItem),
                              placeholderTextStyle,
                          ]}
                          placeholder={placeholder || "Select"}
                          onFocus={() => handleOnToggleMenuBar(false)}
                          onChangeText={(text: string) => {
                              if (text.length === 0) handleOnFilter("");
                              else handleOnFilter(text);
                              onTextChange && onTextChange(text);
                          }}
                      >
                          <TextComponent>{selectedItem?.value}</TextComponent>
                      </TextInput>
                      <Icon
                          theme={theme}
                          ref={(ref: Icon) => (iconRef = ref)}
                          style={[styles.arrowImageStyle, arrowImageStyle]}
                          {...props}
                      />
                  </View>
              </Animated.View>
          </TouchableOpacity>
      );
  };

  const renderMenuItem = (menuItem: any) => {
      const { index } = menuItem;
      const { id, value, imageSource } = menuItem.item;
      const { data, imageWidth, imageHeight, menuItemTextStyle } = props;
      return (
          <TouchableHighlight
              key={id}
              style={_menuItemContainer(index, data)}
              onPress={() => {
                  handleOnSelectItem(menuItem.item);
              }}
          >
              <View style={styles.menuBarItemContainerGlue}>
                  {imageSource && (
                      <ImageComponent
                          resizeMode="contain"
                          source={imageSource}
                          style={_imageStyle(imageHeight, imageWidth)}
                      />
                  )}
                  <TextComponent style={[_menuItemTextStyle(theme), menuItemTextStyle]}>
                      {value}
                  </TextComponent>
              </View>
          </TouchableHighlight>
      );
  };

  const renderSpinner = () => (
      <View style={styles.spinnerContainer}>
          <Spinner
              size={spinnerSize}
              type={spinnerType}
              color={spinnerColor || ThemeColors[theme].textColor}
              isVisible={!(dataSource && dataSource.length > 0)}
          />
      </View>
  );

  const renderList = () => (
      <FlatList
          data={dataSource}
          style={styles.listStyle}
          renderItem={renderMenuItem}
      />
  );

  const renderMenuBar = () => {
      const rotate = menuBarYTranslateAnimation.interpolate({
          inputRange: [0, 25, 50, 75, 100],
          outputRange: [0, 0.5, 0.75, 0.9, 1],
      });
      return (
          <Animated.View
              style={[
                  _menuBarContainer(
                      theme,
                      menuBarContainerHeight,
                      menuBarContainerWidth,
                  ),
                  {
                      transform: [{ scaleY: rotate }],
                      display: disableAbsolute ? "flex" : menuToggled ? "flex" : "none",
                  },
                  menuBarContainerStyle,
              ]}
          >
              {dataSource && dataSource.length > 0 ? renderList() : renderSpinner()}
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
