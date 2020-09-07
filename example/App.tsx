import React from "react";
import { StatusBar, SafeAreaView } from "react-native";
import RNSingleSelect, { ISingleSelectDataType } from "./lib/RNSingleSelect";

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
  { id: 4, value: "Ligula Amet", imageSource: require("./assets/guitar.png") },
];

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#454851",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <RNSingleSelect
          data={staticData}
          menuBarContainerHeight={300}
          onSelect={(selectedItem: ISingleSelectDataType) =>
            console.log("SelectedItem: ", selectedItem)
          }
        />
      </SafeAreaView>
    </>
  );
};

export default App;
