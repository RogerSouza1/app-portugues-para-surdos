import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import LoadingError from "@/components/LoadingError";
import {
  buscarAlternativas,
  buscarExercicioPorId,
} from "../../services/supabase-query";
import NextButton from "@/components/NextButton";

const Exercicios = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [exercicio, setExercicio] = useState<any>({});
  const [alternativas, setAlternativas] = useState<any[]>([]);
  const [respostaCorreta, setRespostaCorreta] = useState<string | null>(null);
  const [respostaUsuario, setRespostaUsuario] = useState<string | null>(null);
  const [respondido, setRespondido] = useState<boolean>(false);
  const [acertou, setAcertou] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function carregarExercicio() {
      try {
        setLoading(true);
        setError(false);

        const data = await buscarExercicioPorId(id);
        setExercicio(data);

        const nome = data.nome || "";

          const dataAlternativas = await buscarAlternativas(id);
          setAlternativas(
              dataAlternativas.map((item: any) => ({
                opcao: item.alternativa.opcao.trim(),
                isCorreta: item.is_correta,
              }))
          );

          const resposta = dataAlternativas.find(
              (item: any) => item.is_correta
          );
          setRespostaCorreta(resposta?.alternativa?.opcao?.trim());
        
      } catch (e) {
        console.error("Erro:", e);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (id) carregarExercicio();
  }, [id]);

  const handleResposta = (opcao: string) => {
    if (respondido) return;

    Vibration.vibrate(50);
    setRespostaUsuario(opcao);
    const correta = opcao === respostaCorreta;
    setAcertou(correta);
    setRespondido(true);
  };

  const handleNavigateToExercicios = () => {
    router.push("/tabs/modulos");
  };

  const corBotao = (opcao: string) => {
    if (!respondido) return styles.wordButton;

    if (opcao === respostaCorreta)
      return [styles.wordButton, styles.correta];
    if (opcao === respostaUsuario && opcao !== respostaCorreta)
      return [styles.wordButton, styles.errada];

    return styles.wordButton;
  };

  const corTexto = (opcao: string) => {
    if (!respondido) return styles.wordText;

    if (opcao === respostaCorreta)
      return [styles.wordText, styles.textoCorreto];
    if (opcao === respostaUsuario && opcao !== respostaCorreta)
      return [styles.wordText, styles.textoErrado];

    return styles.wordText;
  };

  return (
      <SafeAreaView style={styles.container}>
        {loading ? (
            <Text style={styles.title}>Carregando exercício...</Text>
        ) : error ? (
            <LoadingError />
        ) : (
            <View style={{ width: "100%", marginTop: 40 }}>
              {/* Fundo azul sem imagem */}
              <View style={styles.topSection} />
                    <View style={styles.optionsContainer}>
                      {alternativas.map((alt, index) => (
                          <TouchableOpacity
                              key={index}
                              style={corBotao(alt.opcao)}
                              onPress={() => handleResposta(alt.opcao)}
                              disabled={respondido}
                          >
                            <Text style={corTexto(alt.opcao)}>{alt.opcao}</Text>
                          </TouchableOpacity>
                      ))}
                    </View>
            </View>
        )}

        {respondido && (
            <NextButton
                direction="right"
                onPress={handleNavigateToExercicios}
            />
        )}
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FA",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#013974",
    marginVertical: 15,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#013974",
    marginVertical: 10,
    textAlign: "center",
  },
  topSection: {
    width: "80%",
    height: 400,
    backgroundColor: "#013974",
    borderRadius: 20,
    marginBottom: 20,
    marginTop: 40,
    alignSelf: "center",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginTop: 20,
  },
  wordButton: {
    width: 128,
    height: 56,
    borderRadius: 10,
    backgroundColor: "#133558",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#0068AD",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 4,
  },
  wordText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  correta: {
    backgroundColor: "#C8E6C9",
  },
  errada: {
    backgroundColor: "#FFCDD2",
  },
  textoCorreto: {
    color: "#2E7D32",
  },
  textoErrado: {
    color: "#C62828",
  },
  NextButton: {
    position: "absolute",
    bottom: 20,
  },
});

export default Exercicios;
