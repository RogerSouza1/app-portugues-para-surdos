import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const LoadingError = () => (
    <View style={styles.container}>
        <MaterialIcons name="error-outline" size={80} color="#d32f2f" />
        <Text style={styles.title}>Erro de Requisição</Text>
        <Text style={styles.subtitle}>
            Ocorreu um erro ao carregar os dados. Por favor, tente novamente e verifique sua conexão com a internet.
            {"\n"}Se o problema persistir, entre em contato com o suporte.
        </Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        color: "black",
        fontWeight: "bold",
        marginTop: 16,
        marginBottom: 8,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: "#444",
        textAlign: "center",
    },
});

export default LoadingError;