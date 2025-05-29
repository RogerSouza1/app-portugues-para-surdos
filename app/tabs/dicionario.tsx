import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  DeviceEventEmitter,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { buscarAlternativas } from "../../services/supabase-query";
import { recuperarExerciciosConcluidos } from "../../utils/storage";

export default function Dicionario() {
  const router = useRouter();
  const [alternativasCorretas, setAlternativasCorretas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const carregarAlternativasCorretas = async () => {
    try {
      const concluidos = await recuperarExerciciosConcluidos();
      const exerciciosConcluidos = Object.keys(concluidos).filter(
        (key) => concluidos[key]
      );

      let todasAlternativas: any[] = [];

      for (const exercicioId of exerciciosConcluidos) {
        try {
          const alternativas = await buscarAlternativas(exercicioId);
          const alternativaCorreta = alternativas.find((alt: any) => alt.is_correta);

          if (alternativaCorreta) {
            todasAlternativas.push({
              exercicioId,
              opcao: alternativaCorreta.alternativa.opcao.trim(),
              ...alternativaCorreta
            });
          }
        } catch (err) {
          console.warn(`Erro ao buscar alternativas para exercício ${exercicioId}:`, err);
        }
      }

      // Remove duplicatas baseado na opção
      const alternativasUnicas = todasAlternativas.filter((alternativa, index, self) =>
        index === self.findIndex((t) => t.opcao === alternativa.opcao)
      );

      // Ordena alfabeticamente
      alternativasUnicas.sort((a, b) => a.opcao.localeCompare(b.opcao));

      setAlternativasCorretas(alternativasUnicas);
    } catch (error) {
      console.error("Erro ao carregar alternativas corretas:", error);
    }
  };

  useEffect(() => {
    async function init() {
      setLoading(true);
      await carregarAlternativasCorretas();
      setLoading(false);
    }
    init();

    // Listener para exercícios concluídos
    const listener = DeviceEventEmitter.addListener('exercicioConcluido', (data) => {
      console.log('Novo exercício concluído:', data);
      // Atualiza o dicionário automaticamente
      carregarAlternativasCorretas();
    });

    return () => {
      listener.remove();
    };
  }, []);

  // Atualiza quando a tela entra em foco (volta de outras telas)
  useFocusEffect(
    useCallback(() => {
      carregarAlternativasCorretas();
    }, [])
  );

  // Função para refresh manual
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await carregarAlternativasCorretas();
    setRefreshing(false);
  }, []);

  const handlePalavraPress = (exercicioId: string) => {
    router.push({
      pathname: "/dicionario/[id]" as never,
      params: { id: exercicioId },
    });
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#013974" />
        <View style={styles.headerBackground} />
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Dicionário</Text>
        </View>
        <View style={styles.background}>
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Carregando palavras aprendidas...</Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#013974" />

      {/* Header */}
      <View style={styles.headerBackground} />
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Dicionário</Text>
        <Text style={styles.headerSubtitle}>
          {alternativasCorretas.length} palavras aprendidas
        </Text>
      </View>

      <View style={styles.background}>
        {alternativasCorretas.length === 0 ? (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={styles.emptyContainer}
          >
            <Text style={styles.emptyTitle}>Nenhuma palavra aprendida ainda</Text>
            <Text style={styles.emptyText}>
              Complete alguns exercícios para adicionar palavras ao seu dicionário!
            </Text>
          </ScrollView>
        ) : (
          <ScrollView
            style={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.palavrasContainer}>
              {alternativasCorretas.map((alternativa, index) => (
                <TouchableOpacity
                  key={`${alternativa.exercicioId}-${index}`}
                  style={styles.palavraCard}
                  onPress={() => handlePalavraPress(alternativa.exercicioId)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.palavraTexto}>{alternativa.opcao}</Text>
                  <Text style={styles.palavraSubtexto}>Toque para ver o vídeo</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
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
    height: 140,
    backgroundColor: "#013974",
    zIndex: 1,
  },
  headerContainer: {
    marginTop: 60,
    marginBottom: 20,
    paddingHorizontal: 20,
    zIndex: 2,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#B3D9FF",
  },
  background: {
    flex: 1,
    backgroundColor: "#F7F9FA",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    zIndex: 3,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    fontSize: 18,
    color: "#013974",
    textAlign: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#013974",
    marginBottom: 15,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
  },
  scrollView: {
    flex: 1,
  },
  palavrasContainer: {
    padding: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  palavraCard: {
    width: "48%",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: "#013974",
  },
  palavraTexto: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#013974",
    marginBottom: 5,
  },
  palavraSubtexto: {
    fontSize: 12,
    color: "#666",
  },
});