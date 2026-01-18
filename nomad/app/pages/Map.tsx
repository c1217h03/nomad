import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Platform,
  Text,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import { Circle, type LatLng } from "react-native-maps";
import { MapLocation } from "../../data/locations";
import MarkerPopup from "./summaryPopup";
import ClosePopup from "./closePopup";
import NuggetFoundPopup from "./NuggetFound";

// Dynamically import map components for native
let MapView: any = null;
let Marker: any = null;
let Polygon: any = null;

type Props = {
  markers?: MapLocation[];
  gameLocations?: MapLocation[];
};

export default function Map({ markers = [], gameLocations = [] }: Props) {
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [heading, setHeading] = useState<number>(0);
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(
    null,
  );
  const [selectedMarker, setSelectedMarker] = useState<
    (MapLocation & { isNear?: boolean }) | null
  >(null);

  /** 🔹 Find Nugget game state */
  const [gameActive, setGameActive] = useState(false);
  const [nuggetStep, setNuggetStep] = useState<"found" | "reward" | null>(null);
  const [nugget, setNugget] = useState<MapLocation | null>(null);
  const [foundNugget, setFoundNugget] = useState(false);

  const mapRef = useRef<any>(null);

  // Distance function (meters)
  const getDistanceInMeters = (from: LatLng, to: LatLng) => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371000;
    const dLat = toRad(to.latitude - from.latitude);
    const dLon = toRad(to.longitude - from.longitude);
    const lat1 = toRad(from.latitude);
    const lat2 = toRad(to.latitude);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  /** 🔹 Start Find Nugget game */
  const startGame = () => {
    const nuggetLocation = gameLocations.find(
      (g) => g.title.toLowerCase() === "nugget",
    );

    if (!nuggetLocation) {
      console.warn("Nugget location not found");
      return;
    }

    setNugget(nuggetLocation);
    setFoundNugget(false);
    setGameActive(true);
  };

  useEffect(() => {
    let headingSubscription: Location.LocationSubscription | null = null;

    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        setPermissionGranted(status === "granted");
        if (status !== "granted") return;

        if (Platform.OS !== "web") {
          const maps = require("react-native-maps");
          MapView = maps.default ?? maps;
          Marker = maps.Marker ?? (maps.default && maps.default.Marker);
          Polygon = maps.Polygon ?? (maps.default && maps.default.Polygon);
        }

        const initial = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });

        const loc: LatLng = {
          latitude: initial.coords.latitude,
          longitude: initial.coords.longitude,
        };
        setUserLocation(loc);

        // Watch GPS location
        await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.Highest,
            distanceInterval: 2,
            timeInterval: 1000,
          },
          (locUpdate) => {
            const newLoc: LatLng = {
              latitude: locUpdate.coords.latitude,
              longitude: locUpdate.coords.longitude,
            };
            setUserLocation(newLoc);

            /** 🔹 Check distance to Nugget */
            if (gameActive && nugget && !foundNugget) {
              const dist = getDistanceInMeters(newLoc, {
                latitude: nugget.latitude,
                longitude: nugget.longitude,
              });

              //   console.log(`[NUGGET DISTANCE] ${dist.toFixed(2)} meters`);

              if (dist <= 20) {
                setFoundNugget(true);
                setNuggetStep("found");
              }
            }

            // Update camera with latest location AND heading
            if (mapRef.current) {
              mapRef.current.animateCamera(
                {
                  center: newLoc,
                  heading: heading,
                  pitch: 0,
                  zoom: 18,
                },
                { duration: 300 },
              );
            }
          },
        );

        // Watch device heading
        headingSubscription = await Location.watchHeadingAsync((event) => {
          const deviceHeading = event.trueHeading ?? event.magHeading ?? 0;
          setHeading(deviceHeading);

          // Update camera with latest heading AND location
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
  }, [gameActive, nugget, foundNugget]);

  if (!MapView || !userLocation) {
    return (
      <View style={styles.container}>
        <Text>Loading map or location...</Text>
      </View>
    );
  }

  // Radar cone coordinates
  const coneLength = 0.0003; // ~30m
  const coneWidth = 0.00015; // ~15m
  const headingRad = (heading * Math.PI) / 180;
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
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.001, // vertical zoom span
          longitudeDelta: 0.001, // horizontal zoom span
        }}
      >
        {/* User */}
        <Marker coordinate={userLocation}>
          <Image
            source={require("../../assets/images/avatar.png")}
            style={styles.userMarker}
          />
        </Marker>

        {/* Regular markers */}
        {markers.map((m) => (
          <Marker
            key={m.title}
            coordinate={{ latitude: m.latitude, longitude: m.longitude }}
            onPress={() => {
              const distance = getDistanceInMeters(userLocation, {
                latitude: m.latitude,
                longitude: m.longitude,
              });
              setSelectedMarker({ ...m, isNear: distance <= 100 });
            }}
          >
            <Image source={{ uri: m.npc }} style={styles.npcMarker} />
          </Marker>
        ))}

        {/* 🔹 Nugget marker */}
        {gameActive && nugget && !foundNugget && (
          <Marker
            coordinate={{
              latitude: nugget.latitude,
              longitude: nugget.longitude,
            }}
          >
            <Image source={{ uri: nugget.npc }} style={styles.nuggetMarker} />
          </Marker>
        )}

        {/* Radar cone */}
        {userLocation && Polygon && (
          <Polygon
            coordinates={radarPoints}
            fillColor="rgba(0, 149, 255, 0.14)"
            strokeColor="rgba(0, 149, 255, 0.3)"
            strokeWidth={1}
          />
        )}
      </MapView>

      {/* Start button */}
      {!gameActive && (
        <TouchableOpacity style={styles.startButton} onPress={startGame}>
          <Text style={styles.startButtonText}>Start</Text>
        </TouchableOpacity>
      )}

      {/* Nugget found popup */}
      {foundNugget && gameActive && (
        <NuggetFoundPopup
          step={nuggetStep}
          onContinue={() => setNuggetStep("reward")} // Continue button shows reward
          onOk={() => {
            setFoundNugget(false); // Close popup
            setNuggetStep(null); // Reset step
            setGameActive(false); // Stop game
            setNugget(null);
          }}
        />
      )}

      {/* Optional Circle for debugging proximity */}
      {gameActive && nugget && !foundNugget && (
        <Circle
          center={{ latitude: nugget.latitude, longitude: nugget.longitude }}
          radius={8}
          fillColor="rgba(255, 215, 0, 0.3)"
          strokeColor="rgba(255, 215, 0, 0.8)"
          strokeWidth={1}
        />
      )}

      {/* Bottom popups */}
      {selectedMarker &&
        (selectedMarker.isNear ? (
          <ClosePopup
            location={selectedMarker}
            onClose={() => setSelectedMarker(null)}
          />
        ) : (
          <MarkerPopup
            location={selectedMarker}
            onClose={() => setSelectedMarker(null)}
          />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  userMarker: { width: 150, height: 150, resizeMode: "contain" },
  npcMarker: { width: 110, height: 110, resizeMode: "contain" },
  nuggetMarker: { width: 40, height: 40, resizeMode: "contain" },

  startButton: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 28,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
