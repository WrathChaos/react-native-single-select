import { ViewStyle, ImageStyle, TextStyle, StyleSheet } from "react-native";
import { ISingleSelectDataType } from "./RNSingleSelect";
import { ThemeColors } from "./theme";

interface Style {
  listStyle: ViewStyle;
  arrowImageStyle: ImageStyle;
  spinnerContainer: ViewStyle;
  buttonContainerGlue: ViewStyle;
  menuBarItemContainerGlue: ViewStyle;
}

export const _placeholderTextStyle = (
  theme: string,
  selectedItem?: ISingleSelectDataType | null,
  placeholderTextColor?: string,
): TextStyle => ({
  width: "90%",
  fontSize: 16,
  fontWeight: "bold",
  color: placeholderTextColor
    ? placeholderTextColor
    : selectedItem
    ? ThemeColors[theme].textColor
    : ThemeColors[theme].placeholderColor,
});

export const _menuItemContainer = (
  index: number,
  data?: Array<ISingleSelectDataType>,
): ViewStyle => ({
  padding: 16,
  borderBottomEndRadius: index === (data && data.length - 1) ? 16 : 0,
  borderBottomStartRadius: index === (data && data.length - 1) ? 16 : 0,
});

export const _menuBarContainer = (
  theme: string,
  menuBarContainerHeight: number,
  menuBarContainerWidth: number,
): ViewStyle => ({
  borderBottomEndRadius: 16,
  borderBottomStartRadius: 16,
  height: menuBarContainerHeight,
  width: menuBarContainerWidth,
  backgroundColor: ThemeColors[theme].menuBarBackgroundColor,
});

export const _menuButtonContainer = (
  theme: string,
  height: number = 50,
  width: number = 250,
): ViewStyle => ({
  width,
  height,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  justifyContent: "center",
  backgroundColor: ThemeColors[theme].menuButtonBackgroundColor,
});

export const _imageStyle = (
  height: number = 25,
  width: number = 25,
): ImageStyle => ({
  width,
  height,
  marginRight: 16,
});

export const _menuItemTextStyle = (theme: string): TextStyle => ({
  color: ThemeColors[theme].menuItemTextColor,
  fontWeight: "700",
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
  menuBarItemContainerGlue: {
    flexDirection: "row",
    alignItems: "center",
  },
  listStyle: {
    marginTop: 3,
    marginBottom: 3,
  },
  spinnerContainer: {
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});
