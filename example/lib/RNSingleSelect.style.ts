import { ViewStyle, ImageStyle, TextStyle, StyleSheet } from "react-native";
import { ISingleSelectDataType } from "./RNSingleSelect";

interface Style {
  arrowImageStyle: ImageStyle;
  menuItemTextStyle: TextStyle;
  buttonContainerGlue: ViewStyle;
  menuBarItemContainerGlue: ViewStyle;
}

export const _placeholderTextStyle = (
  selectedItem?: ISingleSelectDataType | null,
): TextStyle => ({
  width: "90%",
  fontSize: 16,
  fontWeight: "bold",
  color: selectedItem ? "#fff" : "#fdfdfd",
});

export const _menuItemContainer = (
  index: number,
  data?: Array<ISingleSelectDataType>,
) => ({
  padding: 16,
  borderBottomEndRadius: index === (data && data.length - 1) ? 16 : 0,
  borderBottomStartRadius: index === (data && data.length - 1) ? 16 : 0,
});

export const _menuBarContainer = (menuBarContainerHeight: number) => ({
  backgroundColor: "#171920",
  borderBottomEndRadius: 16,
  borderBottomStartRadius: 16,
  height: menuBarContainerHeight,
});

export const _menuButtonContainer = (
  height: number = 50,
  width: number = 250,
): ViewStyle => ({
  width,
  height,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  justifyContent: "center",
  backgroundColor: "#2b2c32",
});

export const _imageStyle = (height: number = 25, width: number = 25) => ({
  width,
  height,
  marginRight: 16,
});

export default StyleSheet.create<Style>({
  buttonContainerGlue: {
    marginLeft: 16,
    marginRight: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  arrowImageStyle: {
    width: 20,
    height: 20,
  },
  menuItemTextStyle: {
    color: "#52555b",
  },
  menuBarItemContainerGlue: {
    flexDirection: "row",
    alignItems: "center",
  },
});
