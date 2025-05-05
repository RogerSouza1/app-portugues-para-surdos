import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ModuloCard from "../components/ModuloCard";
import { buscarModulo } from "../services/supabase-query";

const Modulos = () => {
  const [modulos, setModulos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadModulos() {
      try {
        const data = await buscarModulo();
        setModulos(data);
      } catch (error: any) {
        console.error("Erro ao buscar modulos:", error);
      } finally {
        setLoading(false);
      }
    }
    loadModulos();
  }, []);

  const handleNavigateToLevels = () => {
    router.push("/niveis"); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Tela de Mapa</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={modulos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ModuloCard modulo={item} />}
            contentContainerStyle={styles.listContainer}
          />
        )}

        <TouchableOpacity style={styles.rectangle} onPress={handleNavigateToLevels}>
          <Text style={styles.rectangleText}>Ir para Níveis</Text>
        </TouchableOpacity>
      </View>
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
  rectangle: {
    width: 200,
    height: 60,
    backgroundColor: "#013974",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  rectangleText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  listContainer: {
    marginTop: 20,
    alignItems: "center",
    width: "100%",
  },
  userItem: {
    fontSize: 16,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
    textAlign: "center",
  },
});

export default Modulos;