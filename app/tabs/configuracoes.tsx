import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import * as Updates from "expo-updates";
import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const Configuracoes = () => {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [fotoUri, setFotoUri] = useState<string | null>(null);

  // Função para selecionar imagem usando ImagePicker do Expo
  const selecionarImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão Negada", "Você precisa conceder permissão para acessar a galeria!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      quality: 0.7,
    });
    if (!result.canceled) {
      setFotoUri(result.assets[0].uri);
    }
  };


  const salvarPreferenciasUsuario = async () => {
    try {
      const usuario = { nome, fotoUri };
      await AsyncStorage.setItem("@profile", JSON.stringify(usuario));
      await carregarPreferenciasUsuario();
      Alert.alert("Sucesso", "Preferências salvas com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar as preferências.");
    }
  };

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

  const resetarProgresso = async () => {
    Alert.alert(
      "Resetar Progresso",
      "Tem certeza que deseja apagar todo o armazenamento local?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sim", onPress: async () => {
            try {
              await AsyncStorage.clear();
              setNome("");
              setFotoUri(null);
              Alert.alert("Sucesso", "Progresso resetado! A aplicação será reiniciada.");
              await Updates.reloadAsync();
            } catch (error) {
              Alert.alert("Erro", "Não foi possível resetar o progresso.");
            }
          } 
        }
      ]
    );
  };

  const abrirPoliticas = () => {
    router.push("/termosDeUso");
  };

  useEffect(() => {
    carregarPreferenciasUsuario();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Configurações</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          value={nome}
          onChangeText={setNome}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Foto de Perfil:</Text>
        {fotoUri ? (
          <Image source={{ uri: fotoUri }} style={styles.foto} />
        ) : (
          <View style={[styles.foto, styles.fotoPlaceholder]}>
            <Text style={styles.fotoPlaceholderText}>Sem foto</Text>
          </View>
        )}
        <TouchableOpacity style={styles.botao} onPress={selecionarImagem}>
          <Text style={styles.botaoText}>Selecionar Imagem</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.botaoSalvar} onPress={salvarPreferenciasUsuario}>
        <Text style={styles.botaoSalvarText}>Salvar Preferências</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.botaoResetar}
        onPress={async () => {
          try {
            await AsyncStorage.clear();
            setNome("");
            setFotoUri(null);
            Alert.alert("Sucesso", "Progresso resetado! A aplicação será reiniciada.");
            await Updates.reloadAsync();
          } catch (error) {
            Alert.alert("Erro", "Não foi possível resetar o progresso.");
          }
        }}
      >
        <Text style={styles.botaoResetarText}>Resetar Progresso e Reiniciar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.linkContainer} onPress={abrirPoliticas}>
        <Text style={styles.linkText}>Políticas de Privacidade</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FA",
    padding: 20,
    justifyContent: "center"
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#013974",
    alignSelf: "center",
    marginBottom: 30,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#013974",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
  },
  foto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  fotoPlaceholder: {
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  fotoPlaceholderText: {
    color: "#888",
  },
  botao: {
    backgroundColor: "#013974",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  botaoText: {
    color: "#FFF",
    fontSize: 16,
  },
  botaoSalvar: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  botaoSalvarText: {
    color: "#FFF",
    fontSize: 16,
  },
  botaoResetar: {
    backgroundColor: "#F44336",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  botaoResetarText: {
    color: "#FFF",
    fontSize: 16,
  },
  linkContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  linkText: {
    color: "#013974",
    textDecorationLine: "underline",
    fontSize: 16,
  },
});

export default Configuracoes;