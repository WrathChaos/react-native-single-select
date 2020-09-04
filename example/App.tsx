import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from "react-native";
import RNSingleSelect, { ISingleSelectDataType } from "./lib/RNSingleSelect";

const staticData: Array<ISingleSelectDataType> = [
  { id: 0, value: "Euismod Justo" },
  { id: 1, value: "Risus Venenatis" },
  { id: 2, value: "Vestibulum Ullamcorper" },
  { id: 3, value: "Lorem Nibh" },
  { id: 4, value: "Ligula Amet" },
];

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
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
          onSelect={(selectedItem: ISingleSelectDataType) =>
            console.log("SelectedItem: ", selectedItem)
          }
        />
      </SafeAreaView>
    </>
  );
};

export default App;
