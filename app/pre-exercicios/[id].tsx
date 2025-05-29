import { useEvent } from "expo";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Bullets from "../../components/Bullets";
import NextButton from "../../components/NextButton";
import { buscarMidia } from "../../services/supabase-query";

const { width, height } = Dimensions.get("window");

const PreExercicio = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [media, setMedia] = useState<any[]>([]);
  const [videoSource, setVideoSource] = useState<string | null>(null);
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  async function carregarMidia(id: string) {
    const midia = await buscarMidia(id);
    for (const item of midia) {
      if (item.tipo === "video_libras") {
        setVideoSource(item.url);
      }
    }

    midia.sort((a, b) => a.ordem - b.ordem);
    setMedia(midia);
  }

  carregarMidia(id);

  const handleNavigateToExercicios = () => {
    router.replace({
      pathname: "/exercicios/[id]",
      params: { id },
    });
  };

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = false;
    player.play();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  const handleRestart = () => {
    player.currentTime = 0;
    player.play();
  };

  const handleNext = () => {
    if (currentIndex < media.length - 1) {
      scrollViewRef.current?.scrollTo({ x: width * (currentIndex + 1), animated: true });
    } else {
      handleNavigateToExercicios();
    }
  };

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
                  listener: (
                    event: import("react-native").NativeSyntheticEvent<
                      import("react-native").NativeScrollEvent
                    >
                  ) => {
                    const index = Math.round(
                      event.nativeEvent.contentOffset.x / width
                    );
                    setCurrentIndex(index);
                  },
                }
              )}
              scrollEventThrottle={16}
            >
              {media.map((item, idx) => (
                <View key={idx} style={styles.card}>
                  {item.tipo === "video_libras" ? (
                    <View style={styles.contentContainer}>
                      <VideoView
                        style={styles.video}
                        player={player}
                        allowsFullscreen
                      />
                    </View>
                  ) : (
                    <Image
                      source={{ uri: item.url }}
                      style={styles.image}
                      resizeMode="cover"
                    />
                  )}
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
  carouselContainer: {
    width: width,
    height: height * 0.73,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: width * 0.9,
    height: height * 0.6,
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
    padding: 10,
    marginHorizontal: 20,
  },
  contentContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "76%",
    height: "98%",
    backgroundColor: "#013974",
    borderRadius: 20,
  },
  image: {
    width: "95%",
    height: "97%",
    borderRadius: 20,
    backgroundColor: "#000",
  },
  bulletsContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  controlsContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "60%",
  },
  exerciseName: {
    marginTop: 40,
    fontSize: 20,
    fontWeight: "bold",
    color: "#013974",
    textAlign: "center",
    maxWidth: width * 0.8,
  },
});

export default PreExercicio;
