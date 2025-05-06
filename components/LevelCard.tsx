import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";

interface LevelCardProps {
  level: any;
}

const LevelCard: React.FC<LevelCardProps> = ({ level }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "../pre-exercicios/[id]",
      params: { id: level.id.toString() }
    });
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <Text style={styles.title}>{level.titulo}</Text>
        <Image
          source={require("../assets/images/play.png")}
          style={styles.playIcon}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
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
    tintColor: "#013974"
  }
});

export default LevelCard;