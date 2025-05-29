import LoadingError from "@/components/LoadingError";
import {
  salvarExercicioConcluido
} from "@/utils/storage";
import { Ionicons } from "@expo/vector-icons";
import { useEvent } from "expo";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useVideoPlayer, VideoView } from 'expo-video';
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View
} from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import {
  buscarAlternativas,
  buscarExercicioPorId,
  buscarVideoExercicioPorId
} from "../../services/supabase-query";

const { width, height } = Dimensions.get("window");

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

        const mediaData = await buscarVideoExercicioPorId(id);
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

  const player = useVideoPlayer(mediaUrl, player => {
    player.loop = false;
    player.muted = false;
    player.play();
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  const handleRestart = () => {
    try {
      if (player) {
        player.currentTime = 0;
        player.play();
      }
    } catch (error) {
      console.warn("Erro ao reiniciar vídeo:", error);
    }
  };

  const handlePlayPause = () => {
    try {
      if (player) {
        if (isPlaying) {
          player.pause();
        } else {
          if (player.currentTime >= player.duration) {
            player.currentTime = 0;
            player.play();
          } else {
            player.play();
          }
        }
      }
    } catch (error) {
      console.warn("Erro ao controlar reprodução:", error);
    }
  };

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
        router.back();
      }, 600);
    }
  };

  // Cleanup do player
  useEffect(() => {
    return () => {
      if (player) {
        try {
          player.pause();
          player.release();
        } catch (error) {
          console.warn("Erro ao limpar player:", error);
        }
      }
    };
  }, [player]);

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
          <View style={styles.contentContainer}>
            <View style={styles.videoFrame}>
              <VideoView
                style={styles.video}
                player={player}
                allowsFullscreen={false}
                allowsPictureInPicture={false}
                nativeControls={false}
                pointerEvents="none"
                contentFit="contain"
              />
               <View style={styles.controlsContainer}>
              <TouchableOpacity onPress={handleRestart} style={styles.controlButton}>
                <Ionicons name="refresh" size={28} color="#FFF" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePlayPause} style={styles.controlButton}>
                <Ionicons name={isPlaying ? "pause" : "play"} size={28} color="#FFF" />
              </TouchableOpacity>
            </View>
            </View>
           
          </View>
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
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#013974",
    marginVertical: 15,
    textAlign: "center",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 30,
    rowGap: 20,
    columnGap: 20,
    paddingHorizontal: 10,
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
    textAlign: "center",
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
  contentContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  videoFrame: {
    width: width * 0.85,
    height: height * 0.45,
    backgroundColor: "#013974",
    borderRadius: 20,
    padding: 15,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  video: {
    width: "100%",
    height: "80%",
    borderRadius: 15,
    backgroundColor: "#013974",
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: "100%",
    marginTop: 8,
  },
  controlButton: {
    padding: 14,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    minWidth: 56,
    minHeight: 56,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default Exercicios;
