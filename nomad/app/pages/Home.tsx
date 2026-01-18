import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Platform, Text } from "react-native";
import * as Location from "expo-location";
import type { LatLng } from "react-native-maps";
import Map from "./Map";
import { LOCATIONS } from "../../data/locations";

export default function Home() {
  return (
    <View style={styles.container}>
      <Map markers={LOCATIONS} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  userMarker: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
});
