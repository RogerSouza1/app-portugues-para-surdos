import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";

export default function Dicionario() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#013974" />
      <View style={styles.headerBackground} />
      <Text style={styles.headerTitle}>Dicionário</Text>
      <View style={styles.background}>
        <Text>Tela de Dicionário</Text>
      </View>
    </View>
  );
};

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
    height: 140,
    backgroundColor: "#013974", 
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 25,
    zIndex: 2,
  },
  listContainer: {
    paddingTop: 20,
    paddingBottom: 85,
    paddingHorizontal: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginVertical: 5, 
  },
  background: {
    flex: 1,
    backgroundColor: "#F7F9FA",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    zIndex: 3
  }
});