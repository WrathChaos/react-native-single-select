import React from "react";
import { StatusBar, SafeAreaView } from "react-native";
import RNSingleSelect, {
  ISingleSelectDataType,
} from "@freakycoder/react-native-single-select";

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
          onSelect={(selectedItem: ISingleSelectDataType) =>
            console.log("SelectedItem: ", selectedItem)
          }
        />
      </SafeAreaView>
    </>
  );
};

export default App;
