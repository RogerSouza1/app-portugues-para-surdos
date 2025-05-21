import LoadingError from "@/components/LoadingError";
import {
  salvarExercicioConcluido,
  recuperarExerciciosConcluidos,
} from "@/utils/storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import {
  buscarAlternativas,
  buscarExercicioPorId,
  buscarExercicios,
  buscarImagemPorExercicioId,
} from "../../services/supabase-query";

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
  const [mediaUrl, setMediaUrl] = useState<string>("");

  const confettiRef = useRef<ConfettiCannon | null>(null);

  useEffect(() => {
    async function carregarExercicio() {
      try {
        setLoading(true);
        setError(false);

        const data = await buscarExercicioPorId(id);
        setExercicio(data);

        const mediaData = await buscarImagemPorExercicioId(id);
        setMediaUrl(
          mediaData.length > 0
            ? mediaData[0].url
            : "https://cdn-icons-png.flaticon.com/512/3273/3273587.png"
        );

        const dataAlternativas = await buscarAlternativas(id);
        const alternativasMapeadas = dataAlternativas.map((item: any) => ({
          opcao: item.alternativa.opcao.trim(),
          isCorreta: item.is_correta,
        }));

        const alternativasEmbaralhadas = alternativasMapeadas.sort(() => Math.random() - 0.5);

        setAlternativas(alternativasEmbaralhadas);
        
        const correta = dataAlternativas.find((item: any) => item.is_correta);
        setRespostaCorreta(correta?.alternativa?.opcao?.trim() ?? null);
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

    setRespondido(true);
    setRespostaUsuario(opcao);

    const correta = opcao === respostaCorreta;
    setAcertou(correta);

    if (correta) {
      Vibration.vibrate([0, 100, 50, 100]);
      salvarExercicioConcluido(exercicio.id, true);
      confettiRef.current?.start();
      setTimeout(() => {
        router.back();
      }, 3500);
    } else {
      Vibration.vibrate([0, 50, 20, 50]);
      setTimeout(() => {
        setRespondido(false);
        setRespostaUsuario(null);
        setAcertou(null);
      }, 800);
    }
  };

  const handleNavigateToExercicios = () => {
    router.push("/tabs/modulos");
  };

  const corBotao = (opcao: string) => {
    if (!respondido) {
      return styles.wordButton;
    }

    if (acertou && opcao === respostaCorreta) {
      return [styles.wordButton, styles.correta];
    }

    if (!acertou && opcao === respostaUsuario) {
      return [styles.wordButton, styles.errada];
    }

    return styles.wordButton;
  };

  const corTexto = (opcao: string) => {
    if (!respondido) {
      return styles.wordText;
    }

    if (acertou && opcao === respostaCorreta) {
      return [styles.wordText, styles.textoCorreto];
    }

    if (!acertou && opcao === respostaUsuario) {
      return [styles.wordText, styles.textoErrado];
    }

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

      {acertou && (
        <ConfettiCannon
          count={100}
          origin={{ x: -10, y: 0 }}
          ref={confettiRef}
          fadeOut={true}
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
  topSection: {
    width: "85%",
    height: 400,
    backgroundColor: "#013974",
    borderRadius: 20,
    marginBottom: 40,
    alignSelf: "center",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
    rowGap: 20,
    columnGap: 20,
  },
  wordButton: {
    width: 160,
    height: 64,
    borderRadius: 12,
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
});

export default Exercicios;
