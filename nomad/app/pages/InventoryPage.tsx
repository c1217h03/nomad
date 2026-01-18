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

const inventoryImg = require("../../assets/images/inventoryIcon.png");

const leafHatImg = require("../../assets/images/leafHat.png");
const ribbyImg = require("../../assets/images/ribby.png");
const blouseImg = require("../../assets/images/blouse.png");
const nuggetImg = require("../../assets/images/nugget.png");

export default function InventoryPage({
  setInventoryPage,
}: {
  setInventoryPage: (val: any) => void;
}) {
  const clickCloseBtn = () => {
    console.log("Close button clicked");
    setInventoryPage(null);
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

      <View style={styles.inventoryPicContainer}>
        <Image source={inventoryImg} style={styles.profilePic} />
      </View>
      <Text style={{ fontWeight: "bold", fontSize: 22 }}>Inventory</Text>

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
    backgroundColor: "#f3f3f3",
    flex: 1,
    alignItems: "center",
  },
  inventoryPicContainer: {
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
