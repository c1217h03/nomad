import { StyleSheet, View, Image, Platform, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Map from "./Map";
import { LOCATIONS, NPC_GAME_LOCATIONS } from "../../data/locations";
import Button from "./Button";
import SearchBar from "./SearchBar";
import InventoryPage from "./InventoryPage";
import ShopPage from "./ShopPage";
import ProfilePostsPage from "./ProfilePage";

const expandImg = require("../../assets/images/expand.png");
const inventoryImg = require("../../assets/images/inventory.png");
const shopImg = require("../../assets/images/shop.png");
const profileImg = require("../../assets/images/profile.png");

export default function Home() {
  const [expanded, setExpanded] = useState(false);

  const [openPage, setOpenPage] = useState<
    "inventory" | "shop" | "profile" | null
  >(null);

  const expandButtons = () => {
    console.log("Exand button clicked");
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <View style={styles.menus}>
        <View style={styles.searchBarContainer}>
          <SearchBar />
        </View>
        <View style={styles.buttonscontainer}>
          <Button btnImage={expandImg} onClick={expandButtons} />
          {expanded && (
            <>
              <Button
                btnImage={inventoryImg}
                onClick={() => setOpenPage("inventory")}
              />
              <Button btnImage={shopImg} onClick={() => setOpenPage("shop")} />
              <Button
                btnImage={profileImg}
                onClick={() => setOpenPage("profile")}
              />
            </>
          )}
        </View>
      </View>

      <View style={styles.pagesContainer}>
        {openPage === "inventory" && (
          <InventoryPage setInventoryPage={() => setOpenPage(null)} />
        )}

        {openPage === "shop" && (
          <ShopPage setShopPage={() => setOpenPage(null)} />
        )}

        {openPage === "profile" && (
          <ProfilePostsPage setProfilePage={() => setOpenPage(null)} />
        )}
      </View>

      <View style={styles.mapPage}>
        <Map markers={LOCATIONS} gameLocations={NPC_GAME_LOCATIONS} />
      </View>
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
  map: { flex: 1, zIndex: -1 },
  userMarker: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  menus: {
    top: 50,
    zIndex: 10,
  },
  mapPage: {
    flex: 1,
  },
  pagesContainer: {
    zIndex: 100,
  },
});
