import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from "react-native";
import LevelCard from "../../components/LevelCard";
import { buscarExercicios } from "../../services/supabase-query";
import LoadingError from "@/components/LoadingError";

const Niveis = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [exercicios, setExercicios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false)

  useEffect(() => {
    async function loadExercicios() {
      try {
        setError(false)
        const data = await buscarExercicios(id);
        setExercicios(data);
      } catch (error) {
        console.error("Erro ao carregar níveis:", error);
        setError(true);
        setExercicios([]);
      } finally {
        setLoading(false);
      }
    }
    if (id) loadExercicios();
  }, [id]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#013974" />

      <View style={styles.headerBackground} />
      <Text style={styles.headerTitle}>Níveis</Text>

      {loading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#003f83" />
        </View>
      ) : (
        error ? (
          <LoadingError />
        ) : (
          <FlatList
            data={exercicios}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <LevelCard nivel={item} />}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Nenhum nível disponível</Text>
            }
          />
        )
      )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FA",
  },
  headerBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 160,
    backgroundColor: "#013974",
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    margin: 24,
    zIndex: 2,
  },
  listContainer: {
    paddingTop: 30,
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    marginTop: 20,
    fontSize: 16,
  },
});

export default Niveis;