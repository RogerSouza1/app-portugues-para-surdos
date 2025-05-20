import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Platform,
} from "react-native";
import { contarTotalExercicios } from "../../services/supabase-query";
import { recuperarExerciciosConcluidos } from "../../utils/storage";

export default function PerfilConquistas() {
  const badgeIcons = [
    "star-outline",
    "star-half-full",
    "star",
    "trophy-outline",
    "trophy",
    "crown-outline",
    "crown",
    "rocket-outline",
    "rocket-launch",
    "diamond-outline",
    "diamond",
    "trophy-award",
  ];

  const screenWidth = Dimensions.get("window").width;
  const badgeMargin = 8;
  const badgeSize = (screenWidth - badgeMargin * 5 - 40) / 4;

  const router = useRouter();

  const [totalExercicios, setTotalExercicios] = useState<number>(0);
  const [exerciciosConcluidosCount, setExerciciosConcluidosCount] = useState(0);
  const [nome, setNome] = useState<string>("");
  const [fotoUri, setFotoUri] = useState<string | null>(null);

  const carregarPreferenciasUsuario = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@profile");
      if (jsonValue != null) {
        const usuario = JSON.parse(jsonValue);
        setNome(usuario.nome);
        setFotoUri(usuario.fotoUri);
      }
    } catch (error) {
      console.error("Erro ao carregar preferências:", error);
    }
  };

  const carregarLicoesConcluidas = async () => {
    try {
      const concluidosObj = await recuperarExerciciosConcluidos();
      const count = Object.values(concluidosObj).filter(
        (status) => status === true
      ).length;
      setExerciciosConcluidosCount(count);
    } catch (error) {
      console.error("Erro ao carregar lições concluídas:", error);
    }
  };

  const carregarTotalExercicios = async () => {
    try {
      const total = await contarTotalExercicios();
      setTotalExercicios(total ?? 0);
    } catch (error) {
      console.error("Erro ao carregar total de exercícios:", error);
    }
  };

  useEffect(() => {
    carregarPreferenciasUsuario();
    carregarLicoesConcluidas();
    carregarTotalExercicios();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      carregarPreferenciasUsuario();
      carregarLicoesConcluidas();
      carregarTotalExercicios();
    }, [])
  );

  const percentual =
    totalExercicios > 0
      ? Math.round((exerciciosConcluidosCount / totalExercicios) * 100)
      : 0;
  const unlockedBadges = Math.floor(exerciciosConcluidosCount / 5);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#013974" />
      <View style={styles.headerBackground} />
      <View style={styles.headerTopButtons}>
        <MaterialCommunityIcons
          name="information-outline"
          size={28}
          color="#FFF"
          onPress={() => router.push("/termosDeUso")}
        />
        <MaterialCommunityIcons
          name="cog-outline"
          size={28}
          color="#FFF"
          onPress={() => router.push("/configuracoes")}
        />
      </View>
      <View style={styles.headerIconContainer}>
        {fotoUri ? (
          <Image
            source={{ uri: `${fotoUri}?v=${Date.now()}` }}
            style={styles.headerImage}
          />
        ) : (
          <MaterialCommunityIcons
            name="account-circle"
            size={200}
            color="#FFF"
            style={{ backgroundColor: "#013974", borderRadius: 100 }}
          />
        )}
        <Text style={styles.headerName}>{nome || "Usuário"}</Text>
      </View>
      <View style={styles.background}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Lições Concluídas{" "}
              <Text style={styles.subtitleText}>
                {exerciciosConcluidosCount} / {totalExercicios}
              </Text>
            </Text>
            <View style={styles.progressBarBackground}>
              <View
                style={[styles.progressBarFill, { width: `${percentual}%` }]}
              />
            </View>
            <Text style={styles.percentualText}>{percentual}% concluído</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Conquistas</Text>
            <View style={styles.badgesContainer}>
              {badgeIcons.map((iconName, index) => (
                <View
                  key={index}
                  style={[
                    styles.badge,
                    {
                      width: badgeSize,
                      height: badgeSize,
                      marginRight: (index + 1) % 4 === 0 ? 0 : badgeMargin,
                      backgroundColor:
                        index < unlockedBadges ? "#013974" : "#E0E0E0",
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={iconName as any}
                    size={36}
                    color={index < unlockedBadges ? "#FFF" : "#888"}
                  />
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
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
    height: 800,
    backgroundColor: "#013974",
    zIndex: 1,
  },
  headerTopButtons: {
    position: "absolute",
    top: Platform.OS === "android" ? StatusBar.currentHeight! + 10 : 40,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerIconContainer: {
    marginTop: 100,
    marginBottom: 60,
    alignItems: "center",
    zIndex: 2,
  },
  headerImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#FFF",
  },
  headerName: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 25,
  },
  background: {
    flex: 1,
    backgroundColor: "#F7F9FA",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    zIndex: 3,
    padding: 20,
    marginBottom: 35,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitleText: {
    fontWeight: "normal",
    fontSize: 16,
    color: "#013974",
  },
  progressBarBackground: {
    width: "100%",
    height: 20,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#013974",
  },
  percentualText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#013974",
    textAlign: "center",
  },
  badgesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  badge: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
});
