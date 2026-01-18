import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Region, Marker } from "react-native-maps";

import Button from "./Button";
import SearchBar from "./SearchBar";
import InventoryPage from "./InventoryPage";
import ShopPage from "./ShopPage";

const expandImg = require("../../assets/images/expand.png");
const inventoryImg = require("../../assets/images/Inventory.png");
const shopImg = require("../../assets/images/shop.png");
const profileImg = require("../../assets/images/profile.png");

export default function Home() {
  const [expanded, setExpanded] = useState(false);
  const [openInventory, setInventoryPage] = useState(false);
  const [openShop, setShopPage] = useState(false);

  const [openProfile, setProfilePage] = useState(false);

  const [openPage, setOpenPage] = useState<
    "inventory" | "shop" | "profile" | null
  >(null);

  const expandButtons = () => {
    console.log("Exand button clicked");
    setExpanded(!expanded);
  };

  const showInventory = () => {
    console.log("Inventory button clicked");
    setOpenPage("inventory");
  };

  const showShop = () => {
    console.log("Shop button clicked");
    setOpenPage("shop");
  };

  const showProfile = () => {
    console.log("Profile button clicked");
    setOpenPage("profile");
  };

  return (
    <View style={styles.container}>
      {/* <MapView
        style={StyleSheet.absoluteFill}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={true}
      /> */}

      <View style={styles.searchBarContainer}>
        <SearchBar />
      </View>
      <View style={styles.buttonscontainer}>
        <Button btnImage={expandImg} onClick={expandButtons} />
        {expanded && (
          <>
            <Button btnImage={inventoryImg} onClick={showInventory} />
            <Button btnImage={shopImg} onClick={showShop} />
            <Button btnImage={profileImg} onClick={showProfile} />
          </>
        )}
      </View>

      {openPage === "inventory" && (
        <InventoryPage setInventoryPage={() => setOpenPage(null)} />
      )}

      {openPage === "shop" && (
        <ShopPage setShopPage={() => setOpenPage(null)} />
      )}

      {openPage === "profile" && (
        <ProfilePage setProfilePage={() => setOpenPage(null)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarContainer: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  buttonscontainer: {
    height: 300,
    width: 50,
    top: 10,
    right: 5,
    position: "absolute",
  },
  map: { flex: 1 },
});
