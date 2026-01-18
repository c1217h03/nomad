import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Search</Text>
    </View>
  );
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: screenWidth - 70,
    height: 40,
    borderRadius: 100,
  },
  text: {
    marginTop: 10,
    marginLeft: 10,
  },
});
