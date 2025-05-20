import { recuperarPreferencias, salvarPreferencias } from "@/utils/storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { } from '../utils/storage';

export const options = {
  headerShown: false,
};



const Index = () => {
  const router = useRouter();

  const [primeiroAcesso, setPrimeiroAcesso] = useState(false); 

  const handleStart = async () => {
    const preferencias = await recuperarPreferencias();

    if (!preferencias || preferencias.primeiro_acesso === false || preferencias.primeiro_acesso == null) {
      await salvarPreferencias({ primeiro_acesso: true });
      router.replace('/onboarding');
    } else if (preferencias.primeiro_acesso === true) {
      router.replace({ pathname: "/tabs/modulos" });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.topSection}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.logo}
            />
          </View>
          <Text style={styles.title}>Entre Linguas</Text>
        </View>
        <View style={styles.bottomSection}>
          <TouchableOpacity style={styles.button} onPress={handleStart}>
            <Text style={styles.buttonText}>Começar</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ textAlign: 'center', marginHorizontal: 25, marginBottom: 25 }}>
          Ao continuar, estou de acordo com os{' '}
          <Text
            style={{ color: '#013974', textDecorationLine: 'underline' }}
            onPress={() => router.push('/termosDeUso')}
          >
            Termos de Uso e Política de Privacidade
          </Text>{' '}
          do Entre Linguas.
        </Text>
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

export default Index;
