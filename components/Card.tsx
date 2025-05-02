import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

interface CardProps {
  image: any;
}

const Card: React.FC<CardProps> = ({ image }) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.8,
    height: height * 0.45,
    backgroundColor: "#013974",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: width * 0.1,
  },
  image: {
    width: "90%",
    height: "90%",
    resizeMode: "cover",
    borderRadius: 16,
  },
});

export default Card;