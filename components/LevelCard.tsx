import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface LevelCardProps {
  nivel: any;
}

const LevelCard: React.FC<LevelCardProps> = ({ nivel }) => {
  const router = useRouter();

  const handlePress = () => {
    if (!nivel.locked) {
      router.push({
        pathname: "../pre-exercicios/[id]",
        params: { id: nivel.id.toString() },
      });
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        nivel.concluido
          ? { backgroundColor: "#4CAF50" }
          : nivel.locked
          ? styles.lockedCard
          : { backgroundColor: "#FFF" },
      ]}
      onPress={handlePress}
      activeOpacity={0.8}
      disabled={nivel.locked}
    >
      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            nivel.locked && { color: "#888" },
            nivel.concluido && { color: "#FFF" },
          ]}
        >
          {nivel.nome}
        </Text>
        {nivel.concluido ? (
          <Image
            source={require("../assets/images/check.png")}
            style={[styles.playIcon, { tintColor: nivel.concluido ? "#FFF" : "#013974" }]}
          />
        ) : (
          <Image
            source={require("../assets/images/play.png")}
            style={[styles.playIcon, { tintColor: "#013974" }]}
          />
        )}
      </View>
      {nivel.locked && (
        <View style={styles.lockOverlay}>
          <MaterialCommunityIcons name="lock" size={24} color="#FFF" />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    position: "relative",
  },
  lockedCard: {
    backgroundColor: "#CCC",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#013974",
  },
  playIcon: {
    width: 24,
    height: 24,
    tintColor: "#013974",
  },
  lockOverlay: {
    position: "absolute",
    top: 5,
    right: 5,
  },
});

export default LevelCard;