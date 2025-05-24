import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
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

  useEffect(() => {
    async function carregarAlternativasCorretas() {
      try {
        const concluidos = await recuperarExerciciosConcluidos();
        const exerciciosConcluidos = Object.keys(concluidos).filter(
          (key) => concluidos[key]
        );

        let todasAlternativas: any[] = [];
        for (const idExercicio of exerciciosConcluidos) {
          const alternativas = await buscarAlternativas(idExercicio);
          const corretas = alternativas.filter((alt: any) => alt.is_correta);
          const corretasComId = corretas.map((alt: any) => ({
            opcao: alt.alternativa.opcao.trim(),
            exercicioId: idExercicio,
          }));
          todasAlternativas.push(...corretasComId);
        }

        setAlternativasCorretas(todasAlternativas);
      } catch (error) {
        console.error("Erro ao carregar alternativas corretas:", error);
      } finally {
        setLoading(false);
      }
    }
    carregarAlternativasCorretas();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#013974" />
      <View style={styles.headerBackground} />
      <Text style={styles.headerTitle}>DICIONÁRIO</Text>
      <View style={styles.background}>
        {loading ? (
          <Text style={{ textAlign: "center" }}>Carregando...</Text>
        ) : alternativasCorretas.length === 0 ? (
          <Text style={{ textAlign: "center" }}>
            Nenhuma alternativa correta encontrada.
          </Text>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          >
            {alternativasCorretas.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() =>
                  router.push({
                    pathname: "../dicionario/[id]",
                    params: { id: item.exercicioId },
                  })
                }
              >
                <Text style={styles.cardText}>{item.opcao}</Text>
              </TouchableOpacity>
            ))}
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
  card: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  cardText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#013974",
  },
  listContainer: {
    paddingBottom: 30,
  },
});