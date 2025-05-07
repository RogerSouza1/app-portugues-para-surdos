import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import LoadingError from "@/components/LoadingError";
import ModuloCard from "../components/ModuloCard";
import { buscarModulo, contarExercicios } from "../services/supabase-query";

const Modulos = () => {
  const [modulos, setModulos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setErro] = useState(false);

  useEffect(() => {
    async function loadModulos() {
      try {
        setErro(false);
        const data = await buscarModulo();
        const mappedData = await Promise.all(
          data.map(async (modulo: any) => {
            const qtd_aulas = await contarExercicios(modulo.id);
            return {
              id: modulo.id,
              tema: modulo.tema,
              qtd_aulas: qtd_aulas,
              icone_url: modulo.icone_url,
              cor: "#003f83",
            };
          })
        );
        setModulos(mappedData);
      } catch (error: any) {
        console.error("Erro ao buscar módulos:", error);
        setErro(true);
        setModulos([]);
      } finally {
        setLoading(false);
      }
    }
    loadModulos();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#013974" />
      <View style={styles.headerBackground} />
      <Text style={styles.headerTitle}>Módulos</Text>
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
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
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
    height: 140,
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
    paddingBottom: 120,
  },
  background: {
    flex: 1,
    backgroundColor: "#F7F9FA",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: 3
  }
});

export default Modulos;