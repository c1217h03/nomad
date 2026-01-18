import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import Button from "./Button";
import ItemHolder from "./ItemHolder";

const closeBtnImg = require("../../assets/images/close.png");
const shareImg = require("../../assets/images/icon.png");
const profilePicImg = require("../../assets/images/icon.png");

const shopImg = require("../../assets/images/shop.png");

const leafHatImg = require("../../assets/images/leafHat.png");
const ribbyImg = require("../../assets/images/ribby.png");
const blouseImg = require("../../assets/images/blouse.png");
const nuggetImg = require("../../assets/images/nugget.png");

export default function ShopPage({
  setShopPage,
}: {
  setShopPage: (val: any) => void;
}) {
  const clickCloseBtn = () => {
    console.log("Close button clicked");
    setShopPage(null);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          width: "90%",
        }}
      >
        <Button btnImage={closeBtnImg} onClick={clickCloseBtn} />
        {/* <Button btnImage={shareImg} onClick={() => {}} /> */}
      </View>

      <View style={styles.shopPicContainer}>
        <Image
          source={shopImg}
          style={styles.profilePic}
          resizeMode="contain"
        />
      </View>
      <Text style={{ fontWeight: "bold", fontSize: 22 }}>Shop</Text>

      <ScrollView>
        <View style={styles.itemsContainer}>
          <ItemHolder
            itemImg={leafHatImg}
            itemName="Leaf Hat"
            itemDesc="Accessory"
          />
          <ItemHolder itemImg={ribbyImg} itemName="Ribby" itemDesc="Pet" />
          <ItemHolder
            itemImg={blouseImg}
            itemName="Yellow-bow Blouse"
            itemDesc="Clothes"
          />
          <ItemHolder itemImg={nuggetImg} itemName="Nugget" itemDesc="Pet" />
        </View>
      </ScrollView>
    </View>
  );
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    height: screenHeight,
    position: "absolute",
    backgroundColor: "#f3f3f3",
    flex: 1,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 30,
  },
  shopPicContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
    height: 150,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  profilePic: {
    width: "60%",
    height: "60%",
  },
  itemsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    flexGrow: 1,
    justifyContent: "center",
  },
});
