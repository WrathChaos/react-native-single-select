import React from "react";
import { View, StatusBar, SafeAreaView, Dimensions } from "react-native";
import RNSingleSelect, { ISingleSelectDataType } from "./lib/RNSingleSelect";
const { width: ScreenWidth } = Dimensions.get("window");

const staticData: Array<ISingleSelectDataType> = [
  {
    id: 0,
    value: "Euismod Justo",
    imageSource: require("./assets/money.png"),
  },
  {
    id: 1,
    value: "Risus Venenatis",
    imageSource: require("./assets/beer.png"),
  },
  {
    id: 2,
    value: "Vestibulum Ullamcorper",
    imageSource: require("./assets/party.png"),
  },
  {
    id: 3,
    value: "Lorem Nibh",
    imageSource: require("./assets/food-and-restaurant.png"),
  },
  {
    id: 4,
    value: "Ligula Amet",
    imageSource: require("./assets/guitar.png"),
  },
];

const App = () => {
  const [dynamicData, setDynamicData] = React.useState<
    Array<ISingleSelectDataType>
  >([]);

  React.useEffect(() => {
    setTimeout(() => {
      setDynamicData(staticData);
    }, 2000);
  });

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#454851",
          // backgroundColor: "#eceef3",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            shadowRadius: 12,
            shadowOpacity: 0.1,
            shadowColor: "#757575",
            shadowOffset: {
              width: 0,
              height: 3,
            },
          }}
        >
          <RNSingleSelect
            darkMode
            data={dynamicData}
            width={ScreenWidth * 0.9}
            menuBarContainerWidth={ScreenWidth * 0.9}
            onSelect={(selectedItem: ISingleSelectDataType) =>
              console.log("SelectedItem: ", selectedItem)
            }
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;
