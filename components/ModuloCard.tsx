import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";

interface Modulo {
  id: string;
  tema: string;
  qtd_aulas?: number;
  icone_url: string;
  cor: string;
}

interface ModuloCardProps {
  modulo: Modulo;
}

const ModuloCard: React.FC<ModuloCardProps> = ({ modulo }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/niveis/[id]" as never,
      params: { id: modulo.id, tema: modulo.tema}
    });
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.9}
      style={styles.cardContainer}
    >
      <View style={[styles.card, { backgroundColor: modulo.cor }]}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: modulo.icone_url }}
            style={styles.illustration}
          />
          <View style={styles.lessonsBoxOverlay}>
            <Text style={styles.lessonsText}>{modulo.qtd_aulas} Aulas</Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {modulo.tema}
          </Text>

          <View style={styles.bottomRow}>
            <View style={styles.playButton}>
              <Image
                source={require("../assets/images/play.png")}
                style={styles.playIcon}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    maxWidth: "100%",
  },
  card: {
    borderRadius: 16,
    margin: 3,
    overflow: "hidden",
    flexDirection: "column",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    height: 280,
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    position: "relative",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  illustration: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  lessonsBoxOverlay: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#013974",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  lessonsText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 12,
  },
  contentContainer: {
    padding: 12,
    flex: 1,
  },
  title: {
    color: "#013974",
    fontSize: 20,
    fontWeight: "bold",
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20, 
  },
  playButton: {
    width: "100%",
    height: 40,
    borderRadius: 10,
    backgroundColor: "#013974",
    justifyContent: "center",
    alignItems: "center",
  },
  playIcon: {
    width: 35,
    height: 35,
    tintColor: "#FFF",
  },
});

export default ModuloCard;