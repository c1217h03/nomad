// import React, { useEffect, useRef, useState } from "react";
// import {
//   StyleSheet,
//   View,
//   Image,
//   Platform,
//   Text,
//   TouchableOpacity,
// } from "react-native";
// import * as Location from "expo-location";
// import type { LatLng } from "react-native-maps";
// import { MapLocation } from "../../data/locations";
// import MarkerPopup from "./summaryPopup";
// import ClosePopup from "./closePopup";

// // Dynamically import map components for native
// let MapView: any = null;
// let Marker: any = null;
// let Polygon: any = null;

// type Props = {
//   markers?: MapLocation[];
// };

// export default function Map({ markers = [] }: Props) {
//   const [userLocation, setUserLocation] = useState<LatLng | null>(null);
//   const [heading, setHeading] = useState<number>(0);
//   const [permissionGranted, setPermissionGranted] = useState<boolean | null>(
//     null,
//   );
//   const [selectedMarker, setSelectedMarker] = useState<
//     (MapLocation & { isNear?: boolean }) | null
//   >(null);

//   const mapRef = useRef<any>(null);

//   // Distance function (meters)
//   const getDistanceInMeters = (from: LatLng, to: LatLng) => {
//     const toRad = (value: number) => (value * Math.PI) / 180;
//     const R = 6371000; // Earth radius
//     const dLat = toRad(to.latitude - from.latitude);
//     const dLon = toRad(to.longitude - from.longitude);
//     const lat1 = toRad(from.latitude);
//     const lat2 = toRad(to.latitude);
//     const a =
//       Math.sin(dLat / 2) ** 2 +
//       Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c;
//   };

//   useEffect(() => {
//     let headingSubscription: Location.LocationSubscription | null = null;

//     (async () => {
//       try {
//         const { status } = await Location.requestForegroundPermissionsAsync();
//         setPermissionGranted(status === "granted");
//         if (status !== "granted") return;

//         if (Platform.OS !== "web") {
//           const maps = require("react-native-maps");
//           MapView = maps.default ?? maps;
//           Marker = maps.Marker ?? (maps.default && maps.default.Marker);
//           Polygon = maps.Polygon ?? (maps.default && maps.default.Polygon);
//         }

//         // Initial location
//         const initial = await Location.getCurrentPositionAsync({
//           accuracy: Location.Accuracy.Highest,
//         });
//         const loc: LatLng = {
//           latitude: initial.coords.latitude,
//           longitude: initial.coords.longitude,
//         };
//         setUserLocation(loc);

//         // Watch GPS location
//         await Location.watchPositionAsync(
//           {
//             accuracy: Location.Accuracy.Highest,
//             distanceInterval: 1,
//             timeInterval: 1000,
//           },
//           (locUpdate) => {
//             const newLoc: LatLng = {
//               latitude: locUpdate.coords.latitude,
//               longitude: locUpdate.coords.longitude,
//             };
//             setUserLocation(newLoc);

//             // Move camera smoothly
//             if (mapRef.current) {
//               mapRef.current.setCamera(
//                 { center: newLoc, heading, pitch: 0, zoom: 18 },
//                 { duration: 100 },
//               );
//             }
//           },
//         );

//         // Watch device heading
//         headingSubscription = await Location.watchHeadingAsync((event) => {
//           const deviceHeading = event.trueHeading ?? event.magHeading ?? 0;
//           setHeading(deviceHeading);

//           if (mapRef.current && userLocation) {
//             mapRef.current.setCamera(
//               {
//                 center: userLocation,
//                 heading: deviceHeading,
//                 pitch: 0,
//                 zoom: 18,
//               },
//               { duration: 100 },
//             );
//           }
//         });
//       } catch (e) {
//         console.warn("Location / Maps error:", e);
//         setPermissionGranted(false);
//       }
//     })();

//     return () => headingSubscription?.remove();
//   }, []);

//   if (Platform.OS === "web") {
//     return (
//       <View style={styles.container}>
//         <Text>Map unavailable on web.</Text>
//       </View>
//     );
//   }

//   if (permissionGranted === false) {
//     return (
//       <View style={styles.container}>
//         <Text>Location permission denied.</Text>
//       </View>
//     );
//   }

//   if (!MapView || !userLocation) {
//     return (
//       <View style={styles.container}>
//         <Text>Loading map or location...</Text>
//       </View>
//     );
//   }

//   // Radar cone coordinates
//   const coneLength = 0.0003; // ~30m
//   const coneWidth = 0.00015; // ~15m
//   const headingRad = (heading * Math.PI) / 180;
//   const x = Math.sin(headingRad);
//   const y = Math.cos(headingRad);
//   const perpX = Math.cos(headingRad) * coneWidth;
//   const perpY = -Math.sin(headingRad) * coneWidth;

//   const radarPoints = [
//     {
//       latitude: userLocation.latitude + y * coneLength + perpY,
//       longitude: userLocation.longitude + x * coneLength + perpX,
//     },
//     {
//       latitude: userLocation.latitude + y * coneLength - perpY,
//       longitude: userLocation.longitude + x * coneLength - perpX,
//     },
//     { latitude: userLocation.latitude, longitude: userLocation.longitude },
//   ];

//   return (
//     <View style={styles.container}>
//       <MapView
//         ref={mapRef}
//         style={StyleSheet.absoluteFill}
//         showsUserLocation={false}
//         followsUserLocation={false}
//         showsMyLocationButton
//       >
//         {/* User marker */}
//         <Marker coordinate={userLocation} anchor={{ x: 0.5, y: 0.5 }}>
//           <Image
//             source={require("../../assets/images/avatar.png")}
//             style={styles.userMarker}
//           />
//         </Marker>

//         {/* Location markers */}
//         {markers.map((m) => (
//           <Marker
//             key={m.title}
//             coordinate={{ latitude: m.latitude, longitude: m.longitude }}
//             anchor={{ x: 0.5, y: 0.5 }}
//             onPress={() => {
//               const distance = getDistanceInMeters(userLocation, {
//                 latitude: m.latitude,
//                 longitude: m.longitude,
//               });
//               setSelectedMarker({ ...m, isNear: distance <= 100 });
//             }}
//           >
//             <Image source={{ uri: m.npc }} style={styles.npcMarker} />
//           </Marker>
//         ))}

//         {/* Radar cone */}
//         {userLocation && Polygon && (
//           <Polygon
//             coordinates={radarPoints}
//             fillColor="rgba(0, 149, 255, 0.14)"
//             strokeColor="rgba(0, 149, 255, 0.3)"
//             strokeWidth={1}
//           />
//         )}
//       </MapView>

//       {/* //TODO: DELETE LATER ONLY FOR TESTING. */}
//       {/* START BUTTON */}
//       <View style={styles.startButtonContainer}>
//         <TouchableOpacity
//           style={styles.startButton}
//           onPress={() => console.log("Start button pressed")}
//         >
//           <Text style={styles.startButtonText}>Start</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Bottom popups */}
//       {selectedMarker &&
//         (selectedMarker.isNear ? (
//           <ClosePopup
//             location={selectedMarker}
//             onClose={() => setSelectedMarker(null)}
//           />
//         ) : (
//           <MarkerPopup
//             location={selectedMarker}
//             onClose={() => setSelectedMarker(null)}
//           />
//         ))}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   userMarker: { width: 100, height: 100, resizeMode: "contain" },
//   npcMarker: { width: 90, height: 90, resizeMode: "contain" },
//   startButtonContainer: {
//     position: "absolute",
//     bottom: 40,
//     alignSelf: "center",
//     zIndex: 20,
//   },
//   startButton: {
//     backgroundColor: "#007AFF",
//     paddingVertical: 14,
//     paddingHorizontal: 36,
//     borderRadius: 28,
//   },
//   startButtonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });

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

        await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.Highest,
            distanceInterval: 1,
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

              console.log(`[NUGGET DISTANCE] ${dist.toFixed(2)} meters`);

              if (dist <= 11) {
                setFoundNugget(true);
              }
            }

            if (mapRef.current) {
              mapRef.current.setCamera(
                { center: newLoc, heading: heading, pitch: 0, zoom: 18 },
                { duration: 100 },
              );
            }
          },
        );

        headingSubscription = await Location.watchHeadingAsync((event) => {
          const deviceHeading = event.trueHeading ?? event.magHeading ?? 0;
          setHeading(deviceHeading);
          if (mapRef.current && userLocation) {
            mapRef.current.setCamera(
              {
                center: userLocation,
                heading: deviceHeading,
                pitch: 0,
                zoom: 18,
              },
              { duration: 100 },
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
      <MapView ref={mapRef} style={StyleSheet.absoluteFill}>
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

        {/* 🔹 Nugget marker (only during game) */}
        {gameActive && nugget && (
          <Marker
            coordinate={{
              latitude: nugget.latitude,
              longitude: nugget.longitude,
            }}
          >
            <Image source={{ uri: nugget.npc }} style={styles.npcMarker} />
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

      {/* Start Button */}
      {!gameActive && (
        <TouchableOpacity style={styles.startButton} onPress={startGame}>
          <Text style={styles.startButtonText}>Start</Text>
        </TouchableOpacity>
      )}

      {foundNugget && gameActive && (
        <NuggetFoundPopup
          onClose={() => {
            setFoundNugget(false);
            setGameActive(false); // end the game
            setNugget(null);
          }}
        />
      )}

      {gameActive && nugget && !foundNugget && (
        <Circle
          center={{
            latitude: nugget.latitude,
            longitude: nugget.longitude,
          }}
          radius={11}
          fillColor="rgba(255, 215, 0, 0.3)"
          strokeColor="rgba(255, 215, 0, 0.8)"
          strokeWidth={1}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  userMarker: { width: 100, height: 100, resizeMode: "contain" },
  npcMarker: { width: 90, height: 90, resizeMode: "contain" },

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

  foundOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  foundText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
});
