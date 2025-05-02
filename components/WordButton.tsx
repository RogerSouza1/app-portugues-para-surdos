import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface WordButtonProps {
  word: string;
  onPress: () => void;
}

const WordButton: React.FC<WordButtonProps> = ({ word, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{word}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#013974",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 5,
  },
  text: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default WordButton;