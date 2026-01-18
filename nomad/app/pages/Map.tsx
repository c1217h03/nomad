import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Platform, Text } from "react-native";
import * as Location from "expo-location";
import type { LatLng } from "react-native-maps";

export default function Map() {
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [MapsModule, setMapsModule] = useState<any | null>(null);
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(
    null,
  );

  useEffect(() => {
    (async () => {
      try {
        // 1️⃣ Request location permissions
        const { status } = await Location.requestForegroundPermissionsAsync();
        setPermissionGranted(status === "granted");
        if (status !== "granted") return;

        // 2️⃣ Get initial location immediately
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        // 3️⃣ Start watching location for continuous updates
        await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.Highest,
            distanceInterval: 1, // Update every 1 meter
            timeInterval: 1000, // Or every 1 second
          },
          (loc) => {
            setUserLocation({
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
            });
          },
        );
      } catch (e) {
        console.warn("Location error:", e);
        setPermissionGranted(false);
      }

      // 4️⃣ Dynamically import react-native-maps on native platforms
      if (Platform.OS !== "web") {
        try {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const maps = require("react-native-maps");
          setMapsModule(maps);
        } catch (e) {
          console.warn("react-native-maps not available / not linked:", e);
          setMapsModule(null);
        }
      }
    })();
  }, []);

  // Web fallback
  if (Platform.OS === "web") {
    return (
      <View style={styles.container}>
        <Text>Map unavailable on web in this build.</Text>
      </View>
    );
  }

  // Permission denied fallback
  if (permissionGranted === false) {
    return (
      <View style={styles.container}>
        <Text>Location permission denied.</Text>
      </View>
    );
  }

  const MapView = MapsModule?.default ?? MapsModule ?? null;
  const Marker =
    MapsModule?.Marker ??
    (MapsModule?.default && MapsModule.default.Marker) ??
    null;

  // Loading fallback
  if (!MapView) {
    return (
      <View style={styles.container}>
        <Text>Loading map or native module missing...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        showsUserLocation={false}
        followsUserLocation
        showsMyLocationButton
      >
        {userLocation && Marker && (
          <Marker coordinate={userLocation} anchor={{ x: 0.5, y: 0.5 }}>
            <Image
              source={require("../../assets/images/avatar.png")}
              style={styles.userMarker}
            />
          </Marker>
        )}
      </MapView>
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
