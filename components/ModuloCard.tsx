import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

const { width } = Dimensions.get("window");

export interface Modulo {
  id: number;
  tema: string;
  nivel: string;
  anterior: string;
  proximo: string;
  is_completo: boolean;
  icone_url: string;
}

interface ModuloCardProps {
  modulo: Modulo;
}

const ModuloCard: React.FC<ModuloCardProps> = ({ modulo }) => {
  return (
    <View style={styles.card}>
      {modulo.icone_url ? (
        <Image source={{ uri: modulo.icone_url }} style={styles.image} />
      ) : null}
      <View style={styles.content}>
        <Text style={styles.title}>{modulo.tema}</Text>
        <Text style={styles.detail}>Nível: {modulo.nivel}</Text>
        {modulo.is_completo ? (
          <Text style={[styles.detail, styles.concluido]}>Concluído</Text>
        ) : (
          <Text style={[styles.detail, styles.naoConcluido]}>Não concluído</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.85,
    backgroundColor: "#FFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 8,
    alignSelf: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: width * 0.5,
    resizeMode: "cover",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  detail: {
    fontSize: 16,
    marginBottom: 4,
  },
  concluido: {
    color: "green",
  },
  naoConcluido: {
    color: "red",
  },
});

export default ModuloCard;