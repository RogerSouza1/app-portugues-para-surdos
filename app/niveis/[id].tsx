import LoadingError from "@/components/LoadingError";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import LevelCard from "../../components/LevelCard";
import { buscarExercicios } from "../../services/supabase-query";
import { recuperarExerciciosConcluidos } from "../../utils/storage";

export const unstable_shouldReload = () => true;

const Niveis = () => {
  const { id, tema } = useLocalSearchParams<{ id: string; tema: string }>();
  const router = useRouter();
  const [exercicios, setExercicios] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function carregarExerciciosComStatus(idModulo: string) {
    const exercicios = await buscarExercicios(idModulo);
    const concluidos = await recuperarExerciciosConcluidos();
    return exercicios.map((ex: any) => ({
      ...ex,
      concluido: concluidos[ex.id] || false,
    }));
  }

  useEffect(() => {
    async function loadExercicios() {
      try {
        setError(false);
      const data = await carregarExerciciosComStatus(id);

      const exerciciosFacil = data.filter(
        (exercicio: any) => exercicio.nivel === "FÁCIL"
      );
      const exerciciosMedio = data.filter(
        (exercicio: any) => exercicio.nivel === "MÉDIO"
      );
      const exerciciosDificil = data.filter(
        (exercicio: any) => exercicio.nivel === "DIFÍCIL"
      );
      const todosExerciciosOrdenados = [
        ...exerciciosFacil,
        ...exerciciosMedio,
        ...exerciciosDificil,
      ];

      const todosExerciciosAtualizados = todosExerciciosOrdenados.map((exercicio, idx) => {
        if (idx === 0) {
          return { ...exercicio, locked: false };
        }
        return {
          ...exercicio,
          locked: !todosExerciciosOrdenados[idx - 1].concluido,
        };
      });

      setExercicios(todosExerciciosAtualizados);
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

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        router.replace("/tabs/modulos");
        return true;
      };

      const backHandler = BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => {
        backHandler.remove();
      };
    }, [router])
  );

  useFocusEffect(
    React.useCallback(() => {
      async function reloadExercicios() {
        try {
          const data = await carregarExerciciosComStatus(id);

          const exerciciosFacil = data.filter(
            (exercicio: any) => exercicio.nivel === "FÁCIL"
          );
          const exerciciosMedio = data.filter(
            (exercicio: any) => exercicio.nivel === "MÉDIO"
          );
          const exerciciosDificil = data.filter(
            (exercicio: any) => exercicio.nivel === "DIFÍCIL"
          );
          const todosExerciciosOrdenados = [
            ...exerciciosFacil,
            ...exerciciosMedio,
            ...exerciciosDificil,
          ];

          const todosExerciciosAtualizados = todosExerciciosOrdenados.map((exercicio, idx) => {
            if (idx === 0) {
              return { ...exercicio, locked: false };
            }
            return {
              ...exercicio,
              locked: !todosExerciciosOrdenados[idx - 1].concluido,
            };
          });
          setExercicios(todosExerciciosAtualizados);
        } catch (error) {
          console.error("Erro ao recarregar níveis:", error);
        }
      }
      reloadExercicios();
    }, [id])
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#013974" />

      <View style={styles.headerBackground} />
      <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode="tail">
        {tema}
      </Text>

      <View style={styles.background}>
        {loading ? (
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#003f83" />
          </View>
        ) : error ? (
          <LoadingError />
        ) : (
            <View>
            <SectionList
              sections={[
              { title: "", data: exercicios }
              ]}
              keyExtractor={(item, index) =>
              item.id?.toString() || index.toString()
              }
              renderItem={({ item, index }) => (
              <LevelCard
                key={item.id}
                nivel={item}
                index={index}
              />
              )}
              renderSectionHeader={() => null}
              contentContainerStyle={styles.listContainer}
              ListEmptyComponent={
              <Text style={styles.emptyText}>Nenhum nível disponível</Text>
              }
            />
            </View>
            
        )}
      </View>
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
    fontSize: 34,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 25,
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
  background: {
    flex: 1,
    backgroundColor: "#F7F9FA",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    zIndex: 3,
  },
});

export default Niveis;
