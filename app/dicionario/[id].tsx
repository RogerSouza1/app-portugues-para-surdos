import LoadingError from "@/components/LoadingError";
import { Ionicons } from "@expo/vector-icons";
import { useEvent } from "expo";
import { useLocalSearchParams, useRouter } from "expo-router";
import { VideoView } from "expo-video";
import { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Animated,
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Bullets from "../../components/Bullets";
import { useSafeVideoPlayer } from "../../hooks/useSafeVideoPlayer";
import {
    buscarAlternativas,
    buscarExercicioPorId,
    buscarMidia,
    buscarVideoExercicioPorId,
} from "../../services/supabase-query";

const { width, height } = Dimensions.get("window");

const DicionarioDetalhes = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [exercicio, setExercicio] = useState<any>({});
  const [alternativas, setAlternativas] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [mediaUrl, setMediaUrl] = useState<string>("");
  const [palavraCorreta, setPalavraCorreta] = useState<string>("");
  const [media, setMedia] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    async function carregarDetalhes() {
      try {
        setLoading(true);
        setError(false);

        // Buscar dados do exercício
        const data = await buscarExercicioPorId(id);
        setExercicio(data);

        // Buscar vídeo do exercício (método original)
        const mediaData = await buscarVideoExercicioPorId(id);
        setMediaUrl(
          mediaData.length > 0
            ? mediaData[0].url
            : "https://cdn-icons-png.flaticon.com/512/3273/3273587.png"
        );

        // Buscar todas as mídias (imagens e vídeos)
        const midiaData = await buscarMidia(id);

        // Ordena por ordem e prepara array de mídia
        midiaData.sort((a, b) => a.ordem - b.ordem);
        setMedia(midiaData);

        // Se há vídeo na mídia, usa ele como fonte principal
        const videoLibras = midiaData.find((item) => item.tipo === "video_libras");
        if (videoLibras) {
          setMediaUrl(videoLibras.url);
        }

        // Buscar alternativas
        const dataAlternativas = await buscarAlternativas(id);
        setAlternativas(dataAlternativas);

        // Encontrar a resposta correta
        const correta = dataAlternativas.find((item: any) => item.is_correta);
        setPalavraCorreta(correta?.alternativa?.opcao?.trim() ?? "");
      } catch (e) {
        console.error("Erro:", e);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (id) carregarDetalhes();
  }, [id]);

  const { player, safePause, safePlay, safeRelease } = useSafeVideoPlayer(mediaUrl || "", (player) => {
    player.loop = false;
    player.muted = false;
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  const handleRestart = () => {
    if (player) {
      try {
        player.currentTime = 0;
        safePlay();
      } catch (error) {
        console.warn("Erro ao reiniciar vídeo:", error);
      }
    }
  };

  const handlePlayPause = () => {
    if (player) {
      try {
        if (isPlaying) {
          safePause();
        } else {
          if (player.currentTime >= player.duration) {
            player.currentTime = 0;
          }
          safePlay();
        }
      } catch (error) {
        console.warn("Erro ao controlar reprodução:", error);
      }
    }
  };

  const goBack = () => {
    router.back();
  };

  // Cleanup do player
  useEffect(() => {
    return () => {
      safeRelease();
    };
  }, [safeRelease]);

  const renderMediaItem = (item: any, index: number) => {
    if (item.tipo === "video_libras") {
      return (
        <View key={index} style={styles.mediaCard}>
          <View style={styles.videoContainer}>
            <VideoView
              style={styles.video}
              player={player}
              allowsFullscreen={false}
              allowsPictureInPicture={false}
              nativeControls={false}
              pointerEvents="none"
              contentFit="contain"
            />
          </View>
          <View style={styles.controlsContainer}>
            <TouchableOpacity onPress={handleRestart} style={styles.controlButton}>
              <Ionicons name="refresh" size={28} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePlayPause} style={styles.controlButton}>
              <Ionicons name={isPlaying ? "pause" : "play"} size={28} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View key={index} style={styles.mediaCard}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item.url }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#013974" />
            <Text style={styles.loadingText}>Carregando palavra...</Text>
          </View>
        ) : error ? (
          <LoadingError />
        ) : (
          <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.wordContainer}>
              <Text style={styles.wordTitle}>Palavra:</Text>
              <Text style={styles.wordText}>{palavraCorreta}</Text>
            </View>

            {/* Slider de mídia */}
            {media.length > 0 && (
              <View style={styles.carouselContainer}>
                <ScrollView
                  ref={scrollViewRef}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  style={styles.mediaScrollView}
                  contentContainerStyle={styles.scrollContentContainer}
                  onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    {
                      useNativeDriver: false,
                      listener: (event: any) => {
                        const nativeEvent = (event as import("react-native").NativeSyntheticEvent<import("react-native").NativeScrollEvent>).nativeEvent;
                        const index = Math.round(
                          nativeEvent.contentOffset.x / width
                        );
                        setCurrentIndex(index);
                      },
                    }
                  )}
                  scrollEventThrottle={16}
                  decelerationRate="fast"
                  snapToInterval={width}
                  snapToAlignment="start"
                >
                  {media.map((item, index) => (
                    <View key={index} style={styles.slideContainer}>
                      {renderMediaItem(item, index)}
                    </View>
                  ))}
                </ScrollView>

                {/* Bullets para navegação */}
                {media.length > 1 && (
                  <View style={styles.bulletsContainer}>
                    <Bullets
                      total={media.length}
                      currentIndex={currentIndex}
                      scrollX={scrollX}
                    />
                  </View>
                )}
              </View>
            )}

            {/* Todas as alternativas para referência */}
            {alternativas.length > 0 && (
              <View style={styles.alternativesContainer}>
                <Text style={styles.infoTitle}>Todas as opções:</Text>
                {alternativas.map((alt, index) => (
                  <View key={index} style={styles.alternativeItem}>
                    <Text
                      style={[
                        styles.alternativeText,
                        alt.is_correta && styles.correctAlternative,
                      ]}
                    >
                      {alt.alternativa.opcao.trim()}
                      {alt.is_correta && " ✓"}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </ScrollView>
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
  scrollContainer: {
    flex: 1,
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
  wordContainer: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 20,
    margin: 20,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  wordTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
  },
  wordText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#013974",
  },
  carouselContainer: {
    marginBottom: 20,
  },
  mediaScrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    alignItems: "center",
  },
  slideContainer: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  mediaCard: {
    width: width * 0.9,
    backgroundColor: "#013974",
    borderRadius: 20,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  videoContainer: {
    height: height * 0.35,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  video: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  imageContainer: {
    height: height * 0.35,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
    backgroundColor: "#000",
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  controlButton: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  imageNameContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  imageName: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  bulletsContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  currentMediaName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#013974",
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  infoContainer: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#013974",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
  },
  alternativesContainer: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 30,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  alternativeItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 4,
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
  },
  alternativeText: {
    fontSize: 16,
    color: "#333",
  },
  correctAlternative: {
    color: "#2E7D32",
    fontWeight: "600",
  },
});

export default DicionarioDetalhes;
