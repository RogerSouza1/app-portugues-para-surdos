import LoadingError from "@/components/LoadingError";
import { MaterialIcons } from "@expo/vector-icons";
import { useEvent } from "expo";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useVideoPlayer, VideoView } from 'expo-video';
import React, { useEffect, useState } from "react";
import { buscarVideoModuloPorId } from "../../services/supabase-query";
import {
    ActivityIndicator,
    Button,
    Dimensions,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

const { width, height } = Dimensions.get("window");

const PreModulo = () => {
  const { id, tema } = useLocalSearchParams<{ id: string; tema: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [mediaUrl, setMediaUrl] = useState<string>("");

  
  const buscarVideoModulo = async (moduloId: string) => {
    try {
      const url = await buscarVideoModuloPorId(moduloId);
      return url;
    } catch (error) {
      console.error("Erro ao buscar vídeo do módulo:", error);
      throw error;
    }
  };

  useEffect(() => {
    async function carregarVideoModulo() {
      try {
        setLoading(true);
        setError(false);

        const mediaUrl = await buscarVideoModulo(id);
        setMediaUrl(mediaUrl);
      } catch (e) {
        console.error("Erro:", e);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (id) carregarVideoModulo();
  }, [id]);

  const player = useVideoPlayer(mediaUrl, player => {
    player.loop = false;
    player.muted = false;
    player.play();
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  const handleRestart = () => {
    player.currentTime = 0;
    player.play();
  };

  const goToNiveis = () => {
    router.push({
      pathname: "/niveis/[id]" as never,
      params: { id, tema },
    });
  };

  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    return () => {
      if (player) {
        try {
          player.release();
        } catch (error) {
          console.warn("Erro ao limpar player:", error);
        }
      }
    };
  }, [player]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#013974" />
      
      {/* Header */}
      <View style={styles.headerBackground} />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode="tail">
          {tema}
        </Text>
      </View>

      <View style={styles.background}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#013974" />
            <Text style={styles.loadingText}>Carregando vídeo do módulo...</Text>
          </View>
        ) : error ? (
          <LoadingError />
        ) : (
          <View style={styles.contentContainer}>
            <Text style={styles.introText}>
              Assista ao vídeo de apresentação do módulo
            </Text>

            {/* Container do vídeo */}
            <View style={styles.videoContainer}>
              <VideoView 
                style={styles.video} 
                player={player} 
                allowsFullscreen={false}
                allowsPictureInPicture={false}
                contentFit="contain"
              />
            </View>

            {/* Controles do vídeo */}
            <View style={styles.controlsContainer}>
              <Button
                title="🔄 Reiniciar"
                onPress={handleRestart}
              />
              <Button
                title={isPlaying ? '⏸️ Pausar' : '▶️ Reproduzir'}
                onPress={() => {
                  if (isPlaying) {
                    player.pause();
                  } else {
                    player.play();
                  }
                }}
              />
            </View>

            {/* Botões de ação */}
            <View style={styles.actionContainer}>
              <TouchableOpacity style={styles.skipButton} onPress={goToNiveis}>
                <MaterialIcons name="skip-next" size={24} color="#013974" />
                <Text style={styles.skipButtonText}>Pular Vídeo</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.continueButton} onPress={goToNiveis}>
                <Text style={styles.continueButtonText}>Iniciar Exercícios</Text>
                <MaterialIcons name="arrow-forward" size={24} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
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
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
    paddingHorizontal: 20,
    zIndex: 2,
  },
  backButton: {
    marginRight: 15,
    padding: 5,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: "#F7F9FA",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    zIndex: 3,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    color: "#013974",
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  introText: {
    fontSize: 18,
    color: "#013974",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "500",
  },
  videoContainer: {
    width: width * 0.9,
    height: height * 0.35,
    backgroundColor: "#000",
    borderRadius: 16,
    overflow: "hidden",
    alignSelf: "center",
    marginBottom: 20,
  },
  video: {
    width: "100%",
    height: "100%",
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "60%",
    alignSelf: "center",
    marginBottom: 30,
  },
  actionContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 20,
    gap: 15,
  },
  skipButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#013974",
    backgroundColor: "transparent",
  },
  skipButtonText: {
    color: "#013974",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  continueButton: {
    backgroundColor: "#013974",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  continueButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
});

export default PreModulo;