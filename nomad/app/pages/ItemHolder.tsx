import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  ImageSourcePropType,
} from "react-native";
import Button from "./Button";
const closeBtnImg = require("../../assets/images/icon.png");
const shareImg = require("../../assets/images/icon.png");
const profilePicImg = require("../../assets/images/icon.png");

type itemProps = {
  itemImg: ImageSourcePropType;
  itemName: string;
  itemDesc: string;
};

export default function ItemHolder({ itemImg, itemName, itemDesc }: itemProps) {
  return (
    <View style={styles.container}>
      <Image source={itemImg} style={styles.image} resizeMode="contain" />
      <View style={styles.textContainer}>
        <Text style={styles.itemName}>{itemName}</Text>
        <Text style={styles.itemDesc}>{itemDesc}</Text>
      </View>
    </View>
  );
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: "45%",
    aspectRatio: 0.7,
    borderRadius: 20,
    backgroundColor: "#8beedb",
    alignItems: "center",
    margin: 5,
  },
  image: {
    margin: 10,
    marginTop: 15,
    height: "65%",
    aspectRatio: 1,
  },
  textContainer: {
    width: "100%",
    paddingLeft: 15,
    paddingTop: 12,
    paddingBottom: 12,
    flexDirection: "column",
    backgroundColor: "white",
    marginTop: "auto",
    borderBottomRightRadius: 20,
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  itemDesc: {
    fontSize: 12,
    color: "gray",
  },
});
