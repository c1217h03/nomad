import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  Image,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";

import { MapLocation } from "../../data/locations";
import Button from "./Button";
import { Tabs } from "expo-router";
import { green } from "react-native-reanimated/lib/typescript/Colors";
import Challenge from "./Challenge";
import Posts from "./Posts";

const closeBtnImg = require("../../assets/images/close.png");
const geminiImg = require("../../assets/images/gemini.png");
const coinImg = require("../../assets/images/Coin.png");

type Props = {
  location: MapLocation;
  onClose: () => any;
  startChallenge: () => any;
};

export default function ClosePopup({
  location,
  onClose,
  startChallenge,
}: Props) {
  const [selectedTab, selectTab] = useState<"guide" | "challenges" | "posts">(
    "guide",
  );

  const closeWindowAndStart = () => {
    onClose();

    startChallenge();
  };

  return (
    <View style={styles.bottomPopup}>
      <View style={styles.tabsContainer}>
        <Pressable
          style={[styles.tab, selectedTab === "guide" && styles.tabActive]}
          onPress={() => selectTab("guide")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "guide" && styles.tabTextActive,
            ]}
          >
            Guide
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, selectedTab === "challenges" && styles.tabActive]}
          onPress={() => selectTab("challenges")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "challenges" && styles.tabTextActive,
            ]}
          >
            Challenges
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, selectedTab === "posts" && styles.tabActive]}
          onPress={() => selectTab("posts")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "posts" && styles.tabTextActive,
            ]}
          >
            Posts
          </Text>
        </Pressable>
        <Button btnImage={closeBtnImg} onClick={onClose} />
      </View>

      <View style={styles.contentContainer}>
        {selectedTab === "guide" && (
          <View>
            <Text style={{ fontSize: 32, fontWeight: "bold" }}>Guide</Text>
            <View style={styles.guideTextContainer}>
              <View
                style={{
                  backgroundColor: "#005f4b",
                  borderRadius: 50,
                  padding: 5,
                  width: 110,
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Image source={geminiImg} style={{ width: 20, height: 20 }} />
                <Text
                  style={{
                    color: "white",
                    fontSize: 12,
                    padding: 2,
                    paddingLeft: 5,
                  }}
                >
                  AI Summary
                </Text>
              </View>

              <Text style={styles.guideText}>{location.guide}</Text>
            </View>
          </View>
        )}

        {selectedTab === "challenges" && (
          <Challenge
            challenges={location.challenges}
            startChallenge={() => closeWindowAndStart()}
          />
        )}

        {selectedTab === "posts" && <Posts posts={location.posts}></Posts>}
      </View>
    </View>
  );
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  bottomPopup: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: screenHeight * 0.85,
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 5,
  },
  tabsContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tab: {
    height: 35,
    width: 100,
    borderRadius: 15,
  },
  tabText: {
    color: "#19B777",
    top: 9,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
  tabActive: {
    backgroundColor: "#19b777",
  },
  tabTextActive: {
    color: "white",
  },
  popupTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  popupSummary: { fontSize: 14, color: "#333" },
  closeButton: {
    marginTop: 12,
    textAlign: "center",
    color: "blue",
    fontWeight: "bold",
  },
  contentContainer: {},
  guideText: {
    padding: 5,
    paddingTop: 0,
  },
  guideTextContainer: {
    marginTop: 10,
    backgroundColor: "#efe7da",
    borderRadius: 20,
    padding: 15,
  },
  challengeContainer: {
    color: "#019b77",
    backgroundColor: "#dbfaf2",
    borderRadius: 15,
    marginTop: 10,
    padding: 15,
  },
});
