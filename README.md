<img alt="React Native Single Select" src="assets/logo.png" width="1050"/>

[![Battle Tested ✅](https://img.shields.io/badge/-Battle--Tested%20%E2%9C%85-03666e?style=for-the-badge)](https://github.com/WrathChaos/react-native-single-select)

[![Customizable & Easy to Use Single Select Library for React Native](https://img.shields.io/badge/-Customizable%20%26%20Easy%20to%20Use%20Single%20Select%20Library%20for%20React%20Native-orange?style=for-the-badge)](https://github.com/WrathChaos/react-native-single-select)

[![npm version](https://img.shields.io/npm/v/@freakycoder/react-native-single-select.svg?style=for-the-badge)](https://www.npmjs.com/package/@freakycoder/react-native-single-select)
[![npm](https://img.shields.io/npm/dt/@freakycoder/react-native-single-select.svg?style=for-the-badge)](https://www.npmjs.com/package/@freakycoder/react-native-single-select)
![Platform - Android and iOS](https://img.shields.io/badge/platform-Android%20%7C%20iOS-blue.svg?style=for-the-badge)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=for-the-badge)](https://github.com/prettier/prettier)

<table>
  <tr>
    <td>
      <b>Dark Theme</b>
    </td>
    <td>
      <b>Light Theme</b>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img alt="React Native Internet Connection Alert"
        src="assets/Screenshots/React-Native-Single-Select-Dark-Theme.gif"  />
    </td>
    <td align="center">
    <img alt="React Native Internet Connection Alert"
        src="assets/Screenshots/React-Native-Single-Select-Light-Theme.gif" />
    </td>
  </tr>
</table>

# Installation

Add the dependency:

```bash
npm i @freakycoder/react-native-single-select
npx pod-install // After Install the `react-native-spinkit`
```

## Peer Dependency

You need to install this dependency

```bash
"react-native-spinkit": "^1.5.1"
```

# Features

- Light Mode ☀️
- Dark Mode 🌙
- TextInput 💬
- Fully Animated Functionality 😍
- Built-in Search Filter 🎊
- Image Feature 💪
- Custom Image Component Support 😋
- Custom Text Component Support 😋
- Many More...

# Usage

## Import

```jsx
import RNSingleSelect, {
  ISingleSelectDataType,
} from "@freakycoder/react-native-single-select";
```

## Fundamental Usage

```jsx
<RNSingleSelect
  data={staticData}
  darkMode
  onSelect={(selectedItem: ISingleSelectDataType) =>
    console.log("SelectedItem: ", selectedItem)
  }
/>
```

## Menu Item Format

You must use this format for generating menu bar item.

```js
const staticData: Array<ISingleSelectDataType> = [
  { id: 0, value: "Euismod Justo" },
  { id: 1, value: "Risus Venenatis" },
  { id: 2, value: "Vestibulum Ullamcorper" },
  { id: 3, value: "Lorem Nibh" },
  { id: 4, value: "Ligula Amet" },
];
```

**OR** with `ImageSource`

```js
const staticData: Array<ISingleSelectDataType> = [
  { id: 0, value: "Euismod Justo", imageSource: require("./assets/..") },
  { id: 1, value: "Risus Venenatis", imageSource: { uri: "...url" } },
  { id: 1, value: "Risus Venenatis", imageSource: null },
];
```

Also, here is the interface of ISingleSelectDataType:

```js
export interface ISingleSelectDataType {
  id: number;
  value: string;
  imageSource?: any;
  data?: any;
}
```

# Configuration - Props

| Property               |             Type             |    Default    | Description                                                                                                     |
| ---------------------- | :--------------------------: | :-----------: | --------------------------------------------------------------------------------------------------------------- |
| onSelect               |           function           |   undefined   | set the selection function when a menu item is selected                                                         |
| data                   | Array<ISingleSelectDataType> |   undefined   | set the menu item data array for generating menu bar items                                                      |
| width                  |            number            |      250      | change the width of the component                                                                               |
| height                 |            number            |      50       | change the height of the main single select button                                                              |
| darkMode               |           boolean            |     false     | change the theme of the component to `dark theme`                                                               |
| placeholder            |            string            |   "Select"    | change the placeholder of the single select component                                                           |
| imageHeight            |            number            |      25       | change the image source's menu item's image height                                                              |
| imageWidth             |            number            |      25       | change the image source's menu item's image width                                                               |
| ImageComponent         |          component           |     Image     | set your own custom Image component instead of default `Image` one                                              |
| TextComponent          |          component           |     Text      | set your own custom Text component instead of default `Text` one                                                |
| buttonContainerStyle   |          ViewStyle           |    default    | change/override the top of the single select button (the main one)                                              |
| menuBarContainerStyle  |          ViewStyle           |    default    | change/override the top of the single select bottom menu bar                                                    |
| arrowImageStyle        |          ImageStyle          |    default    | change/override the top of the arrow image's style                                                              |
| menuItemTextStyle      |          TextStyle           |    default    | change/override the top of the each menu bar's item text style                                                  |
| disableAbsolute        |           boolean            |     false     | if you do not want to use the library without absolute to fix bottom menubar's `overlaps` simply make it `true` |
| menuBarContainerWidth  |            number            |      250      | change the bottom menu bar's width                                                                              |
| menuBarContainerHeight |            number            |      150      | change the bottom menu bar's height                                                                             |
| disableFilterAnimation |           boolean            |     false     | disable the filter animation for huge lists (especially on Android)                                             |
| onTextChange           |           function           |   undefined   | handle the onTextChange function                                                                                |
| placeholderTextStyle   |            style             |    default    | extends or override the default placeholder's text style                                                        |
| placeholderTextColor   |            color             |    default    | change the placeholder's text color                                                                             |
| spinnerType            |            string            | "ThreeBounce" | change the spinner type                                                                                         |
| spinnerSize            |            number            |      30       | change the spinner size                                                                                         |
| spinnerColor           |            color             |    default    | change the spinner color                                                                                        |
| initialValue           |    ISingleSelectDataType     |     null      | change the initial selected item                                                                                |
| searchEnabled          |           boolean            |     true      | change search inputs readonly state                                                                             |
| value                  |            string            |   undefined   | set the text input value                                                                                        |

## List of available types for Spinner

- CircleFlip
- Bounce
- Wave
- WanderingCubes
- Pulse
- ChasingDots
- ThreeBounce
- Circle
- 9CubeGrid
- WordPress (IOS only)
- FadingCircle
- FadingCircleAlt
- Arc (IOS only)
- ArcAlt (IOS only)

## Future Plans

- [x] ~~LICENSE~~
- [x] ~~Search Feature~~
- [x] ~~Image Feature~~
- [x] ~~Customizable Image Component~~
- [x] ~~Customizable Text Component~~
- [x] ~~Dark Theme / Light Theme Options~~
- [x] ~~More Customization for Colors~~
- [x] ~~Built-in Spinner~~
- [ ] Remove the `react-native-spinkit` and use `react-native-animated-spinkit` instead
- [ ] Customizable Animations
- [ ] Write an article about the lib on Medium

## Credits

Heavily Inspired by [Manuel Rovira Dribbble](https://dribbble.com/shots/11248542/attachments/2856460?mode=media)

## Author

FreakyCoder, kurayogun@gmail.com

## License

React Native Single Select is available under the MIT license. See the LICENSE file for more info.
