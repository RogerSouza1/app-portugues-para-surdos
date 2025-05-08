import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import NextButton from "../../components/NextButton";

const PreExercicio = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const handleNavigateToExercicios = () => {
    router.push({
      pathname: "/exercicios/[id]",
      params: { id }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Pré Exercício {id}</Text>
      </View>
      <NextButton direction="right" onPress={handleNavigateToExercicios} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FA",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#013974",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
});

export default PreExercicio;