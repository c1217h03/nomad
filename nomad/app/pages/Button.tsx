import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";

type ButtonProps = {
  btnImage: ImageSourcePropType;
  onClick: () => void;
};

export default function Button({ btnImage, onClick }: ButtonProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onClick}>
        <Image
          source={btnImage}
          style={styles.buttonImg}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 100,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonImg: {
    height: 20,
    width: 20,
  },
});
