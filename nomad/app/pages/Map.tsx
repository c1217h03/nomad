import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Image, Platform, Text } from "react-native";
import * as Location from "expo-location";
import type { LatLng } from "react-native-maps";

// Dynamically import map components on native
let MapView: any = null;
let Marker: any = null;
let Circle: any = null;
let Polygon: any = null;

export default function Home() {
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(
    null,
  );
  const [heading, setHeading] = useState<number>(0); // device facing
  const mapRef = useRef<any>(null);

  useEffect(() => {
    let headingSubscription: Location.LocationSubscription | null = null;

    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        setPermissionGranted(status === "granted");
        if (status !== "granted") return;

        // Dynamically import maps for native
        if (Platform.OS !== "web") {
          const maps = require("react-native-maps");
          MapView = maps.default ?? maps;
          Marker = maps.Marker ?? (maps.default && maps.default.Marker);
          Circle = maps.Circle ?? (maps.default && maps.default.Circle);
          Polygon = maps.Polygon ?? (maps.default && maps.default.Polygon);
        }

        // Get initial location
        const initial = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });
        setUserLocation({
          latitude: initial.coords.latitude,
          longitude: initial.coords.longitude,
        });

        // Watch GPS location
        await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.Highest,
            distanceInterval: 1,
            timeInterval: 1000,
          },
          (loc) => {
            const newLoc: LatLng = {
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
            };
            setUserLocation(newLoc);

            // Use GPS heading as fallback if moving
            if (
              loc.coords.speed &&
              loc.coords.speed > 0.5 &&
              loc.coords.heading !== null
            ) {
              setHeading(loc.coords.heading);
            }

            // Move camera
            if (mapRef.current) {
              mapRef.current.animateCamera(
                { center: newLoc, heading: heading, pitch: 0, zoom: 18 },
                { duration: 300 },
              );
            }
          },
        );

        // Watch device compass heading
        headingSubscription = await Location.watchHeadingAsync((event) => {
          const deviceHeading = event.trueHeading ?? event.magHeading ?? 0;
          setHeading(deviceHeading);

          // Rotate map smoothly
          if (mapRef.current && userLocation) {
            mapRef.current.animateCamera(
              {
                center: userLocation,
                heading: deviceHeading,
                pitch: 0,
                zoom: 18,
              },
              { duration: 300 },
            );
          }
        });
      } catch (e) {
        console.warn("Location / Maps error:", e);
        setPermissionGranted(false);
      }
    })();

    return () => headingSubscription?.remove();
  }, []);

  if (Platform.OS === "web") {
    return (
      <View style={styles.container}>
        <Text>Map unavailable on web.</Text>
      </View>
    );
  }

  if (permissionGranted === false) {
    return (
      <View style={styles.container}>
        <Text>Location permission denied.</Text>
      </View>
    );
  }

  if (!MapView || !userLocation) {
    return (
      <View style={styles.container}>
        <Text>Loading map or location...</Text>
      </View>
    );
  }

  // Smooth radar cone calculation
  const coneLength = 0.0003; // ~30 meters
  const coneWidth = 0.00015; // ~15 meters
  const headingRad = (heading * Math.PI) / 180; // convert degrees to radians
  const x = Math.sin(headingRad);
  const y = Math.cos(headingRad);
  const perpX = Math.cos(headingRad) * coneWidth;
  const perpY = -Math.sin(headingRad) * coneWidth;

  const radarPoints = [
    {
      latitude: userLocation.latitude + y * coneLength + perpY,
      longitude: userLocation.longitude + x * coneLength + perpX,
    },
    {
      latitude: userLocation.latitude + y * coneLength - perpY,
      longitude: userLocation.longitude + x * coneLength - perpX,
    },
    { latitude: userLocation.latitude, longitude: userLocation.longitude },
  ];

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFill}
        showsUserLocation={false}
        followsUserLocation={false}
        showsMyLocationButton
      >
        {/* Fixed user marker */}
        <Marker coordinate={userLocation} anchor={{ x: 0.5, y: 0.5 }}>
          <Image
            source={require("../../assets/images/avatar.png")}
            style={styles.userMarker}
          />
        </Marker>

        {/* Radar cone */}
        {/* <Polygon
          coordinates={radarPoints}
          fillColor="rgba(0, 149, 255, 0.14)"
          strokeColor="rgba(0, 149, 255, 0.19)"
          strokeWidth={1}
        /> */}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  userMarker: { width: 80, height: 80, resizeMode: "contain" },
});
