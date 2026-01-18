import MapView, { Region, Marker } from "react-native-maps";
import { StyleSheet, View, Image, Platform, Text } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import type { LatLng } from "react-native-maps";
import Map from "./Map";
import { LOCATIONS, NPC_GAME_LOCATIONS } from "../../data/locations";
import NPCGame from "./FindNugget";

import Button from "./Button";
import SearchBar from "./SearchBar";
import InventoryPage from "./InventoryPage";
import ShopPage from "./ShopPage";
import MarkerPopup from "./summaryPopup";
import ClosePopup from "./closePopup";

const expandImg = require("../../assets/images/expand.png");
const inventoryImg = require("../../assets/images/inventory.png");
const shopImg = require("../../assets/images/shop.png");
const profileImg = require("../../assets/images/profile.png");

export default function Home() {
  const [popupType, setPopUp] = useState<"nearby" | "far" | null>(null);

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
      <View style={styles.menus}>
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
      </View>
      <Map markers={LOCATIONS} gameLocations={NPC_GAME_LOCATIONS} />

      <View style={styles.pagesContainer}>
        {openPage === "inventory" && (
          <InventoryPage setInventoryPage={() => setOpenPage(null)} />
        )}

        {openPage === "shop" && (
          <ShopPage setShopPage={() => setOpenPage(null)} />
        )}
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
  map: { flex: 1 },
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
    zIndex: 10,
  },
});
