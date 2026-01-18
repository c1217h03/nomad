import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Region, Marker } from "react-native-maps";

export default function Home() {
  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});
