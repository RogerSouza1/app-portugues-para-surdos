import { Ionicons } from "@expo/vector-icons";
import { useEvent } from "expo";
import { useLocalSearchParams, useRouter } from "expo-router";
import { VideoView } from "expo-video";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Bullets from "../../components/Bullets";
import NextButton from "../../components/NextButton";
import { useSafeVideoPlayer } from "../../hooks/useSafeVideoPlayer";
import { buscarMidia } from "../../services/supabase-query";

const { width, height } = Dimensions.get("window");

const PreExercicio = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [media, setMedia] = useState<any[]>([]);
  const [videoSource, setVideoSource] = useState<string | null>(null);
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number | null>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    async function carregarMidia() {
      try {
        setLoading(true);
        const midia = await buscarMidia(id);

        let videoIndex = null;
        for (let i = 0; i < midia.length; i++) {
          if (midia[i].tipo === "video_libras") {
            setVideoSource(midia[i].url);
            videoIndex = i;
            break;
          }
        }

        setCurrentVideoIndex(videoIndex);
        midia.sort((a, b) => a.ordem - b.ordem);
        setMedia(midia);
      } catch (error) {
        console.error("Erro ao carregar mídia:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      carregarMidia();
    }
  }, [id]);

  const { player, safePause, safePlay, safeRelease } = useSafeVideoPlayer(videoSource || "", (player) => {
    player.loop = false;
    player.muted = false;
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  const handleNavigateToExercicios = () => {
    safePause();

    router.replace({
      pathname: "/exercicios/[id]",
      params: { id },
    });
  };

  const handleRestart = () => {
    try {
      if (player) {
        player.currentTime = 0;
        safePlay();
      }
    } catch (error) {
      console.warn("Erro ao reiniciar vídeo:", error);
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

  const handleNext = () => {
    if (currentIndex < media.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: width * (currentIndex + 1),
        animated: true
      });
    } else {
      handleNavigateToExercicios();
    }
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
        <View style={styles.card}>
          <View style={styles.contentContainer}>
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
        <View style={styles.card}>
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

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando exercício...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {media.length > 0 && (
          <View style={styles.carouselContainer}>
            <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              style={{ flex: 1 }}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                {
                  useNativeDriver: false,
                  listener: (event: import("react-native").NativeSyntheticEvent<import("react-native").NativeScrollEvent>) => {
                    const index = Math.round(
                      event.nativeEvent.contentOffset.x / width
                    );
                    setCurrentIndex(index);
                  },
                }
              )}
              scrollEventThrottle={16}
              decelerationRate="fast"
            >
              {media.map((item, idx) => (
                <View key={idx} style={styles.slideContainer}>
                  {renderMediaItem(item, idx)}
                </View>
              ))}
            </ScrollView>

            <View style={styles.bulletsContainer}>
              <Bullets
                total={media.length}
                currentIndex={currentIndex}
                scrollX={scrollX}
              />
            </View>

            <Text style={styles.exerciseName}>
              {(media[currentIndex]?.nome || "").replace(/_/g, " ")}
            </Text>
          </View>
        )}
      </View>
      <NextButton direction="right" onPress={handleNext} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FA",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    width: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#013974",
    fontWeight: "500",
  },
  carouselContainer: {
    width: width,
    height: height * 0.73,
    alignItems: "center",
    justifyContent: "center",
  },
  slideContainer: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  card: {
    width: width * 0.9,
    backgroundColor: "#013974",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    overflow: "hidden",
  },
  contentContainer: {
    width: "100%",
    height: height * 0.5,
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
    width: "100%",
    height: height * 0.5,
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
    width: "100%",
  },
  controlButton: {
    padding: 12,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    minWidth: 52,
    alignItems: "center",
  },
  bulletsContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  exerciseName: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "#013974",
    textAlign: "center",
    maxWidth: width * 0.8,
  },
});

export default PreExercicio;
