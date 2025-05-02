import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "..";

const Home = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleStart = () => {
    navigation.navigate("OnBoarding");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.topSection}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.logo}
            />
          </View>
          <Text style={styles.title}>Cobalto</Text>
        </View>
        <View style={styles.bottomSection}>
          <TouchableOpacity style={styles.button} onPress={handleStart}>
            <Text style={styles.buttonText}>Começar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FA",
  },
  topSection: {
    backgroundColor: "#013974",
    borderBottomLeftRadius: 120,
    borderBottomRightRadius: 120,
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 40,
  },
  logoContainer: {
    backgroundColor: "#013974",
    borderRadius: 100,
    padding: 24,
    marginBottom: 16,
  },
  logo: {
    marginTop: 150,
    width: 200,
    height: 200,
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 8,
  },
  bottomSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#013974",
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 18,
    marginTop: 24,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
});

export default Home;
