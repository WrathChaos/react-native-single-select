import { ViewStyle, ImageStyle, TextStyle, StyleSheet } from "react-native";
import { ISingleSelectDataType } from "./RNSingleSelect";

interface Style {
  buttonContainer: ViewStyle;
  arrowImageStyle: ImageStyle;
  menuBarContainer: ViewStyle;
  menuItemTextStyle: TextStyle;
  buttonContainerGlue: ViewStyle;
}

export const _placeholderTextStyle = (
  selectedItem?: ISingleSelectDataType | null,
): TextStyle => ({
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

export default StyleSheet.create<Style>({
  buttonContainer: {
    height: 50,
    width: 250,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    justifyContent: "center",
    backgroundColor: "#2b2c32",
  },
  menuBarContainer: {
    height: 150,
    backgroundColor: "#171920",
    borderBottomEndRadius: 16,
    borderBottomStartRadius: 16,
  },
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
});
