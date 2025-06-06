import LoadingError from "@/components/LoadingError";
import { useFocusEffect } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ModuloCard from "../../components/ModuloCard";
import { buscarExercicios, buscarModulo, contarExercicios } from "../../services/supabase-query";
import { verificarModuloCompleto } from "../../utils/statusHelpers";
import { recuperarExerciciosConcluidos } from "../../utils/storage";

const Modulos = () => {
  const [modulos, setModulos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setErro] = useState(false);

  const numColumns = 2;

  const loadModulos = async () => {
    try {
      setErro(false);
      const data = await buscarModulo();
      const mappedData = await Promise.all(
        data.map(async (modulo: any) => {
          const qtd_aulas = await contarExercicios(modulo.id);
          const concluido = await verificarModuloCompleto(modulo.id);

          const exercicios = await buscarExercicios(modulo.id);
          const concluidosObj = await recuperarExerciciosConcluidos();
          const completedCount = exercicios.filter((ex: any) => concluidosObj[ex.id]).length;
          let status = "";
          if (completedCount > 0 && completedCount < exercicios.length) {
            status = "Em andamento";
          } else if (completedCount === exercicios.length) {
            status = "Concluído";
          }
          

          return {
            id: modulo.id,
            tema: modulo.tema,
            qtd_aulas,
            icone_url: modulo.icone_url,

            cor: "#FFF",
            concluido,
            status,
            ordem: modulo.ordem,
            locked: false, 
          };
        })
      );


      mappedData.sort((a, b) => a.ordem - b.ordem);


      for (let i = 0; i < mappedData.length; i++) {
        if (i > 0 && mappedData[i - 1].status !== "Concluído") {
          mappedData[i].locked = true;
          mappedData[i].status = "";
          mappedData[i].cor = "#ffffff";
        }
      }

      setModulos(mappedData);
    } catch (error: any) {
      console.error("Erro ao buscar módulos:", error);
      setErro(true);
      setModulos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadModulos();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadModulos();
    }, [])
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#013974" />
      <View style={styles.headerBackground} />
      <Text style={styles.headerTitle}>MÓDULOS</Text>
      <View style={styles.background}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#003f83"
            style={{ marginTop: 150 }}
          />
        ) : error ? (
          <LoadingError />
        ) : (
          <FlatList
            data={modulos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ModuloCard modulo={item} />}
            numColumns={numColumns}
            key={`grid-${numColumns}`}
            contentContainerStyle={styles.listContainer}
            columnWrapperStyle={styles.columnWrapper}
            showsVerticalScrollIndicator={false}
          />
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
  listContainer: {
    paddingTop: 20,
    paddingBottom: 90,
    paddingHorizontal: 10,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginVertical: 5,
  },
  background: {
    flex: 1,
    backgroundColor: "#F7F9FA",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    zIndex: 3,
  },
});

export default Modulos;