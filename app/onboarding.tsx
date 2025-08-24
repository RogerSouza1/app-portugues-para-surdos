import { Ionicons } from "@expo/vector-icons";
import { useEvent } from "expo";
import { useRouter } from "expo-router";
import { VideoView, useVideoPlayer } from "expo-video";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import NextButton from "../components/NextButton";
import { buscarOnboarding } from "../services/supabase-query";

const { width, height } = Dimensions.get("window");

const OnBoarding = () => {
  const router = useRouter(); 

  const [videoSource, setVideoSource] = useState<string>("");

  const carregarOnboarding = async () => {
    try {
      const onboarding = await buscarOnboarding();
      if (onboarding.length > 0) {
        setVideoSource(onboarding[0].url);
      }
    } catch (error) {
      console.error("Erro ao carregar vídeo de onboarding:", error);
    }
  };

  const player = useVideoPlayer (videoSource, player => {
        player.loop = false;
        player.muted = false;
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  const handleNext = () => {
    router.replace({ pathname: "/tabs/modulos" });
  };

  const handleRestart = () => {
    if (player) {
      try {
        player.currentTime = 0;
        player.play();
      } catch (error) {
        console.warn("Erro ao reiniciar vídeo:", error);
      }
    }
  };

  useEffect(() => {
    carregarOnboarding();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.contentContainer}>
          <View style={styles.videoFrame}>
            <VideoView
              style={styles.video}
              player={player}
              allowsFullscreen={false}
              allowsPictureInPicture={false}
              nativeControls={Platform.OS === 'android' ? true : false}
              contentFit="contain"
            />
          </View>
          <View style={styles.controlsContainer}>
            <TouchableOpacity onPress={handleRestart} style={styles.iconButton}>
              <Ionicons name="refresh" size={32} color="#013974" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => (isPlaying ? player.pause() : player.play())}
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
  contentWrapper: {
    height: height * 0.8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
  },
  contentContainer: {
    width: width * 0.8,
    height: height * 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  videoFrame: {
    width: "100%",
    height: "80%",
    backgroundColor: "#013974",
    borderRadius: 35,
    padding: 20,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "95%",
    height: "97%",
    borderRadius: 20,
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

export default OnBoarding;
