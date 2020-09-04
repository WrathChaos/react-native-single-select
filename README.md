<img alt="React Native Single Select" src="assets/logo.png" width="1050"/>
<!-- 
[![Battle Tested ✅](https://img.shields.io/badge/-Battle--Tested%20%E2%9C%85-03666e?style=for-the-badge)](https://github.com/WrathChaos/react-native-single-select) 
-->

[![Customizable & Easy to Use Single Select Library for React Native](https://img.shields.io/badge/-Customizable%20%26%20Easy%20to%20Use%20Single%20Select%20Library%20for%20React%20Native-orange?style=for-the-badge)](https://github.com/WrathChaos/react-native-single-select)

[![npm version](https://img.shields.io/npm/v/@freakycoder/react-native-single-select.svg?style=for-the-badge)](https://www.npmjs.com/package/@freakycoder/react-native-single-select)
[![npm](https://img.shields.io/npm/dt/@freakycoder/react-native-single-select.svg?style=for-the-badge)](https://www.npmjs.com/package/@freakycoder/react-native-single-select)
![Platform - Android and iOS](https://img.shields.io/badge/platform-Android%20%7C%20iOS-blue.svg?style=for-the-badge)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=for-the-badge)](https://github.com/prettier/prettier)

<p align="center">
  <img alt="React Native Single Select"
        src="assets/Screenshots/React-Native-Single-Select.gif" />
</p>

# Installation

Add the dependency:

```bash
npm i @freakycoder/react-native-single-select
```

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

Also, here is the interface of ISingleSelectDataType:

```js
export interface ISingleSelectDataType {
  id: number;
  value: string;
}
```

# Configuration - Props

menuItemTextStyle: TextStyle;

| Property              |             Type             |  Default  | Description                                                        |
| --------------------- | :--------------------------: | :-------: | ------------------------------------------------------------------ |
| onSelect              |           function           | undefined | set the selection function when a menu item is selected            |
| data                  | Array<ISingleSelectDataType> | undefined | set the menu item data array for generating menu bar items         |
| placeholder           |            string            | "Select"  | Change the placeholder of the single select component              |
| buttonContainerStyle  |          ViewStyle           |  default  | change/override the top of the single select button (the main one) |
| menuBarContainerStyle |          ViewStyle           |  default  | change/override the top of the single select bottom menu bar       |
| arrowImageStyle       |          ImageStyle          |  default  | change/override the top of the arrow image's style                 |
| menuItemTextStyle     |          TextStyle           |  default  | change/override the top of the each menu bar's item text style     |

## Future Plans

- [x] ~~LICENSE~~
- [ ] Customizable Animations
- [ ] Dark Theme / Light Theme Options
- [ ] Customizable Image Component
- [ ] Customizable Text Component
- [ ] Write an article about the lib on Medium

## Author

FreakyCoder, kurayogun@gmail.com

## License

React Native Single Select is available under the MIT license. See the LICENSE file for more info.
