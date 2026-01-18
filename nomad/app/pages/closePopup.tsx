import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MapLocation } from "../../data/locations";

type Props = {
  location: MapLocation;
  onClose: () => void;
};

export default function ClosePopup({ location, onClose }: Props) {
  return (
    <View style={styles.bottomPopup}>
      <Text style={styles.popupTitle}>
        You are very close to {location.title}!
      </Text>
      <Text style={styles.popupSummary}>
        Special nearby info or action can go here.
      </Text>
      <Text style={styles.closeButton} onPress={onClose}>
        Close
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomPopup: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 5,
    elevation: 5,
  },
  popupTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  popupSummary: { fontSize: 14, color: "#333" },
  closeButton: {
    marginTop: 12,
    textAlign: "center",
    color: "blue",
    fontWeight: "bold",
  },
});
