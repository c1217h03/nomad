import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Vibration,
} from "react-native";
import { Audio } from "expo-av";

type Props = {
  step: "found" | "reward" | null;
  onContinue: () => void;
  onOk: () => void;
};

export default function NuggetFoundPopup({ step, onContinue, onOk }: Props) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });
  }, []);
  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/images/beaverCry.mp3"),
    );
    setSound(sound);
    console.log("Playing sound");
    await sound.playAsync();
  };

  useEffect(() => {
    if (step === "found") {
      playSound();
      Vibration.vibrate();
    }
    console.log("NuggetFoundPopup step:", step);
  }, [step]);
  return (
    <View style={styles.overlay}>
      <View style={styles.popup}>
        {step == "found" && (
          <>
            <Image source={require("../../assets/images/nugget.png")} />
            <Text style={styles.title}>You found me!</Text>
            <TouchableOpacity style={styles.button} onPress={onContinue}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </>
        )}
        {step == "reward" && (
          <>
            <Image
              source={require("../../assets/images/Coin.png")}
              style={styles.coinImage}
            />
            <Text style={styles.title}>You received 100 gold!</Text>
            <TouchableOpacity style={styles.button} onPress={onOk}>
              <Text style={styles.buttonText}>Ok</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  popup: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    width: "80%",
    height: "60%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  coinImage: { width: 150, height: 120, marginBottom: 20 },
});
