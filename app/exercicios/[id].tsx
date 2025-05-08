import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import ImageExercicio from "../../components/ImageExercicio";
import NextButton from "../../components/NextButton";
import {
  buscarAlternativas,
  buscarExercicioPalavras,
  buscarExercicioPorId,
  buscarMidia,
} from "../../services/supabase-query";

type ExerciseType = "single" | "multiple";

const Exercicios = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [correctWords, setCorrectWords] = useState<string[]>([]);
  const [alternatives, setAlternatives] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [exerciseType, setExerciseType] = useState<ExerciseType>("single");
  const [phrase, setPhrase] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const exercicio = await buscarExercicioPorId(id!);
        setPhrase(exercicio.frase || "____");

        const midia = await buscarMidia(id!);
        if (midia.length > 0) {
          setImageUrl(midia[0].url);
        } else {
          setImageUrl(null);
        }

        const palavras = await buscarExercicioPalavras(id!);
        if (!palavras || palavras.length === 0) {
          alert("Exercício sem palavras corretas configuradas.");
          setCorrectWords([]);
          setLoading(false);
          return;
        }

        const words = palavras
          .sort((a: any, b: any) => (a.ordem ?? 0) - (b.ordem ?? 0))
          .map((p: any) => p.palavra);
        setCorrectWords(words);
        setExerciseType(words.length > 1 ? "multiple" : "single");

        const alternativasData = await buscarAlternativas(id!);
        const options = alternativasData.map(
          (item: any) => item.alternativa.opcao
        );
        setAlternatives(options);

        setSelectedWords([]);
      } catch (error) {
        console.error("Erro ao carregar exercício:", error);
        alert("Erro ao carregar o exercício");
      } finally {
        setLoading(false);
      }
    };

    if (id) loadData();
  }, [id]);

  const handleWordPress = (word: string) => {
    if (exerciseType === "single") {
      setSelectedWords([word]);
    } else {
      const nextPosition = selectedWords.length;
      if (nextPosition < correctWords.length) {
        setSelectedWords([...selectedWords, word]);
      }
    }
  };

  const removeWord = (index: number) => {
    const newSelection = [...selectedWords];
    newSelection.splice(index, 1);
    setSelectedWords(newSelection);
  };

  const handleCheck = () => {
    if (correctWords.length === 0) {
      alert("Exercício não configurado corretamente.");
      return;
    }

    if (selectedWords.length !== correctWords.length) {
      Vibration.vibrate(100);
      alert(`Selecione ${correctWords.length} palavra(s)!`);
      return;
    }

    const isCorrect = selectedWords.every(
      (word, index) => word === correctWords[index]
    );

    if (isCorrect) {
      Vibration.vibrate([0, 200, 100, 200]);
      alert("Correto!");
    } else {
      Vibration.vibrate(100);
      alert("Tente novamente!");
      setSelectedWords([]);
    }
  };

  const renderPhrase = () => {
    const parts = phrase.split("____");
    return (
      <Text style={styles.phrase}>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <TouchableOpacity
                onPress={() => removeWord(index - 1)}
                style={styles.blankContainer}
                disabled={selectedWords.length < index}
              >
                <Text style={styles.blank}>
                  {selectedWords[index - 1] || "____"}
                </Text>
              </TouchableOpacity>
            )}
            <Text>{part}</Text>
          </React.Fragment>
        ))}
      </Text>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: "#013974", fontSize: 20, marginTop: 40 }}>
          Carregando exercício...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {imageUrl && (
        <ImageExercicio image={{ uri: imageUrl }} style={styles.image} />
      )}

      <View style={styles.phraseContainer}>{renderPhrase()}</View>

      <View style={styles.optionsContainer}>
        {alternatives
          .filter((word) => !selectedWords.includes(word))
          .map((word) => (
            <TouchableOpacity
              key={word}
              style={styles.wordButton}
              onPress={() => handleWordPress(word)}
              disabled={selectedWords.includes(word)}
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
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  phraseContainer: {
    marginVertical: 30,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  phrase: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#013974",
    textAlign: "center",
  },
  blankContainer: {
    marginHorizontal: 3,
  },
  blank: {
    borderBottomWidth: 2,
    borderColor: "#FFD600",
    color: "#013974",
    paddingHorizontal: 8,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginBottom: 40,
  },
  wordButton: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E3E8EE",
    paddingVertical: 12,
    paddingHorizontal: 24,
    minWidth: 90,
    alignItems: "center",
    margin: 5,
  },
  wordText: {
    fontSize: 18,
    color: "#013974",
    fontWeight: "500",
  },
});

export default Exercicios;