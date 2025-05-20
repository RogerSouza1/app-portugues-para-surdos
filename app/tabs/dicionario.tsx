import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, StatusBar, FlatList } from "react-native";
import { buscarExercicioPalavras, buscarDicionario } from "../../services/supabase-query";
import { recuperarExerciciosConcluidos } from "../../utils/storage";

export default function Dicionario() {
  const [palavrasAprendidas, setPalavrasAprendidas] = useState<string[]>([]);
  const [dicionario, setDicionario] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarPalavrasAprendidas() {
      try {
        const concluidos = await recuperarExerciciosConcluidos();
        const exerciciosIdsConcluidos = Object.keys(concluidos).filter((key) => concluidos[key]);

        const todasPalavrasIds: Set<number> = new Set();

        for (const idExercicio of exerciciosIdsConcluidos) {
          const palavras = await buscarExercicioPalavras(idExercicio);
          palavras.forEach((p) => todasPalavrasIds.add(p.id_palavra));
        }

        const palavrasUnicas = Array.from(todasPalavrasIds);
        const dicionarioCompleto = await buscarDicionario();

        const palavrasFiltradas = dicionarioCompleto.filter((p) =>
          palavrasUnicas.includes(p.id)
        );

        setDicionario(palavrasFiltradas);
      } catch (error) {
        console.error("Erro ao carregar palavras aprendidas:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarPalavrasAprendidas();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#013974" />
      <View style={styles.headerBackground} />
      <Text style={styles.headerTitle}>DICIONÁRIO</Text>
      <View style={styles.background}>
        {loading ? (
          <Text style={{ textAlign: "center" }}>Carregando...</Text>
        ) : dicionario.length === 0 ? (
          <Text style={{ textAlign: "center" }}>Nenhuma palavra aprendida ainda.</Text>
        ) : (
          <FlatList
            data={dicionario}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.word}>{item.palavra}</Text>
                <Text style={styles.translation}>{item.significado}</Text>
              </View>
            )}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>
    </View>
  );
}

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
    height: 180,
    backgroundColor: "#013974",
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 80,
    marginBottom: 30,
    marginLeft: 25,
    zIndex: 2,
  },
  background: {
    flex: 1,
    backgroundColor: "#F7F9FA",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
    zIndex: 3,
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
  },
  word: {
    fontSize: 18,
    fontWeight: "600",
    color: "#013974",
  },
  translation: {
    fontSize: 16,
    color: "#666",
  },
  listContainer: {
    paddingBottom: 30,
  },
});