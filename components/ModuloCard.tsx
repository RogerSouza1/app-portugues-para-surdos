import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";

interface Modulo {
  id: number;
  tema: string;
  qtd_aulas: number;
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
      params: { id: modulo.id.toString() }
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
      <View style={[styles.card, { backgroundColor: modulo.cor }]}>
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              {modulo.tema}
            </Text>

            <View style={styles.bottomRow}>
              <View style={styles.playButton}>
                <Image
                  source={require("../assets/images/play.png")}
                  style={{ width: 30, height: 30, tintColor: "#013974" }}
                />
              </View>
              <View style={styles.lessonsBox}>
                <Text style={styles.lessonsText}>{modulo.qtd_aulas} Aulas</Text>
              </View>
            </View>
          </View>
          <View style={styles.illustrationCircle}>
            <Image
              source={{ uri: modulo.icone_url }}
              style={styles.illustration}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
    height: 120,
    marginVertical: 10,
    marginHorizontal: 16,
    padding: 20,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    height: 80,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "bold",
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  lessonsBox: {
    backgroundColor: "rgba(0,0,0,0.10)",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  lessonsText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  illustrationCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 14,
  },
  illustration: {
    width: 72,
    height: 72,
    borderRadius: 34,
    resizeMode: "cover",
  },
});

export default ModuloCard;
