import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import type { MapLocation } from "../../data/locations";

type Props = {
  npc: MapLocation;
  onClaim: (npc: MapLocation) => void;
};

export default function NPCGame({ npc, onClaim }: Props) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: npc.npc }} style={styles.image} />
      <Text style={styles.title}>You found {npc.title}!</Text>
      <TouchableOpacity style={styles.button} onPress={() => onClaim(npc)}>
        <Text style={styles.buttonText}>Claim</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 24,
    resizeMode: "contain",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
