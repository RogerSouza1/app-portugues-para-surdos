import LoadingError from "@/components/LoadingError";
import { Ionicons } from "@expo/vector-icons";
import { useEvent } from "expo";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useVideoPlayer, VideoView } from 'expo-video';
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import NextButton from "../../components/NextButton";
import { buscarVideoModuloPorId } from "../../services/supabase-query";

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
    router.replace({
      pathname: "/niveis/[id]",
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
          <View style={styles.contentWrapper}>
            <View style={styles.contentContainer}>
              <View style={styles.videoFrame}>
                <VideoView 
                  style={styles.video} 
                  player={player} 
                  allowsFullscreen
                />
              </View>
              <View style={styles.controlsContainer}>
                <TouchableOpacity onPress={handleRestart} style={styles.iconButton}>
                  <Ionicons name="refresh" size={32} color="#013974" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (isPlaying) {
                      player.pause();
                    } else {
                      player.play();
                    }
                  }}
                  style={styles.iconButton}
                >
                  <Ionicons
                    name={isPlaying ? "pause" : "play"}
                    size={32}
                    color="#013974"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        {!loading && !error && (
          <NextButton direction="right" onPress={goToNiveis} />
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
  contentWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
  },
  contentContainer: {
    width: width * 0.8,
    height: height * 0.6,
    justifyContent: "center",
    alignItems: "center",
  },
  videoFrame: {
    width: "100%",
    height: "90%",
    backgroundColor: "#013974",
    borderRadius: 35,
    padding: 20,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "80%",
    height: "97%",
    borderRadius: 20,
    backgroundColor: "#013974",
  },
  controlsContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "60%",
  },
  iconButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#F7F9FA",
    elevation: 2,
    marginHorizontal: 10,
  },
});

export default PreModulo;