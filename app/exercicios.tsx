import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import ImageExercicio from "../components/ImageExercicio";
import NextButton from "../components/NextButton";

const Exercicios = () => {
  const correctWord = "Andressa";
  const options = ["Luiza", "Andressa", "Jojo", "Paola"];

  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const router = useRouter();

  const handleWordPress = (word: string) => {
    setSelectedWord(word);
  };

  const handleCheck = () => {
    if (selectedWord === correctWord) {
      Vibration.vibrate([0, 200, 100, 200]);
      alert("Correto!");
      //router.push("/proxima-tela"); 
    } else {
      Vibration.vibrate(100);
      alert("Tente novamente!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageExercicio image={require("../assets/images/image1.jpg")} />

      <View style={styles.phraseContainer}>
        <Text style={styles.phrase}>
          <Text style={styles.blank}>{selectedWord || "____"}</Text> Urach!
        </Text>
      </View>

      <View style={styles.optionsContainer}>
        {options.map((word) => (
          <TouchableOpacity
            key={word}
            style={[
              styles.wordButton,
              selectedWord === word && styles.wordButtonSelected,
            ]}
            onPress={() => handleWordPress(word)}
            disabled={selectedWord === word}
          >
            <Text style={styles.wordText}>{word}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <NextButton onPress={handleCheck} direction="right" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FA",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 140,
    height: 140,
    marginBottom: 20,
  },
  phraseContainer: {
    marginBottom: 30,
  },
  phrase: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#013974",
    textAlign: "center",
    marginTop: 30,
  },
  blank: {
    borderBottomWidth: 2,
    borderColor: "#FFD600",
    paddingHorizontal: 12,
    color: "#013974",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 40,
  },
  wordButton: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E3E8EE",
    paddingVertical: 12,
    paddingHorizontal: 24,
    margin: 8,
    minWidth: 90,
    alignItems: "center",
  },
  wordButtonSelected: {
    backgroundColor: "#E3E8EE",
    borderColor: "#58CC02",
  },
  wordText: {
    fontSize: 18,
    color: "#013974",
    fontWeight: "500",
  },
});

export default Exercicios;