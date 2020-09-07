type ThemeColorsType = {
  [key: string]: {
    menuBarBackgroundColor: string;
    menuButtonBackgroundColor: string;
    menuItemTextColor: string;
    textColor: string;
    placeholderColor: string;
  };
};

export const ThemeColors: ThemeColorsType = {
  light: {
    menuBarBackgroundColor: "#f4f4f7",
    menuButtonBackgroundColor: "#fff",
    menuItemTextColor: "#70788c",
    textColor: "#3f3f41",
    placeholderColor: "#5e5e63",
  },
  dark: {
    menuBarBackgroundColor: "#171920",
    menuButtonBackgroundColor: "#2b2c32",
    menuItemTextColor: "#52555b",
    textColor: "#fff",
    placeholderColor: "#ccc",
  },
};

export const DARK = "dark";
export const LIGHT = "light";
