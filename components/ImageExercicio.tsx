import React from "react";
import { Dimensions, Image, StyleSheet, View, StyleProp, ImageStyle } from "react-native";

const { width, height } = Dimensions.get("window");

interface ImageExercicioProps {
  image: any; 
  style?: StyleProp<ImageStyle>;
}

const ImageExercicio: React.FC<ImageExercicioProps> = ({ image }) => {
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Image source={image} style={styles.image} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.8,
    height: height * 0.45,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: width * 0.1,
  },
  background: {
    width: "100%",
    height: "100%",
    backgroundColor: "#013974", 
    borderRadius: 16, 
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "90%",
    height: "90%",
    resizeMode: "cover",
    borderRadius: 16,
  },
});

export default ImageExercicio;