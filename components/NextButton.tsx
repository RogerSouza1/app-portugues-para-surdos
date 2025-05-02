import React from "react";
import { StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

interface NextButtonProps {
  onPress: () => void;
  direction?: "left" | "right";
}

const NextButton: React.FC<NextButtonProps> = ({ onPress, direction = "right" }) => {
  return (
    <IconButton
      icon={direction === "right" ? "arrow-right" : "arrow-left"} 
      size={30}
      onPress={onPress}
      style={[styles.iconButton, direction === "left" && styles.leftButton]}
      iconColor="#FFF"
    />
  );
};

const styles = StyleSheet.create({
  iconButton: {
    backgroundColor: "#013974", 
    borderRadius: 10, 
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  leftButton: {
    right: "auto", 
    left: 20, 
  },
});

export default NextButton;