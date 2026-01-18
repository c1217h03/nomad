import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  Image,
} from "react-native";

import { MapLocation } from "../../data/locations";
import Button from "./Button";
import { Tabs } from "expo-router";
import { green } from "react-native-reanimated/lib/typescript/Colors";

const closeBtnImg = require("../../assets/images/close.png");
const geminiImg = require("../../assets/images/gemini.png");
const coinImg = require("../../assets/images/Coin.png");

type Props = {
  challenges: MapLocation["challenges"];
  startChallenge: () => void;
};

export default function Challenges({ challenges, startChallenge }: Props) {
  const [challengeIndex, setIndex] = useState<number | null>(null);

  const openChallenge = (index: number | null) => {
    setIndex(index);
  };

  return (
    <View>
      {challengeIndex == null && (
        <View>
          <Text style={{ fontSize: 32, fontWeight: "bold" }}>Challenges</Text>
          <Text style={{ fontSize: 16 }}>
            Complete challenges and collect points! 🎉
          </Text>

          {challenges.map((challenge, index) => (
            <Pressable
              key={index}
              style={styles.challengeContainer}
              onPress={() => openChallenge(index)}
            >
              <View style={styles.ChallengeTextContainer}>
                <Text style={styles.ChallengeText}>{challenge.title}</Text>
              </View>
              <View style={styles.rewardContainer}>
                <Image source={coinImg} style={{ width: 50, height: 50 }} />
                <Text style={styles.rewardText}>{challenge.reward}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      )}

      {challengeIndex !== null && (
        <View>
          <Text style={{ fontSize: 32, fontWeight: "bold" }}>Challenge:</Text>

          <View style={styles.ChallengeInfoContainer}>
            <Text
              style={{ fontSize: 28, fontWeight: "bold", color: "#019b77" }}
            >
              {challenges[challengeIndex].title}
            </Text>
            <Text style={{ fontSize: 13 }}>
              {challenges[challengeIndex].description}
            </Text>
          </View>

          <View style={styles.ChallengeRewardContainer}>
            <Text
              style={{ fontSize: 28, fontWeight: "bold", color: "#019b77" }}
            >
              Reward:
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                right: 20,
              }}
            >
              <Image
                source={coinImg}
                style={{ right: -6, width: 50, height: 50 }}
              />
              <Text style={{ fontWeight: "bold" }}>
                {challenges[challengeIndex].reward}
              </Text>
            </View>
          </View>

          <Pressable style={styles.startButton}>
            <Text
              style={{ color: "white", fontWeight: "bold" }}
              onPress={() => startChallenge()}
            >
              START CHALLENGE
            </Text>
          </Pressable>
          <Pressable
            style={styles.notReadyButton}
            onPress={() => openChallenge(null)}
          >
            <Text
              style={{ color: "#DB581D", fontWeight: "bold" }}
            >{`I'M NOT READY`}</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  challengeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
  },
  ChallengeTextContainer: {
    backgroundColor: "#dbfaf2",
    borderRadius: 15,
    padding: 0,
    display: "flex",
    justifyContent: "center",
    width: "80%",
    alignItems: "center",
  },
  ChallengeText: {
    padding: 10,
    fontSize: 15,
    fontWeight: "700",
    color: "#019b77",
  },
  rewardContainer: {
    backgroundColor: "#19b777",
    borderRadius: 15,
    width: 70,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  rewardText: {
    top: -8,
    fontSize: 14,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  ChallengeInfoContainer: {
    marginTop: 20,
    backgroundColor: "#dbfaf2",
    borderRadius: 15,
    padding: 15,
  },
  ChallengeRewardContainer: {
    backgroundColor: "#dbfaf2",
    marginTop: 10,
    padding: 8,
    paddingLeft: 15,
    borderRadius: 25,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  startButton: {
    marginTop: 30,
    backgroundColor: "#19b777",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  notReadyButton: {
    marginTop: 10,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    borderColor: "#DB581D",
    borderWidth: 2,
  },
});
