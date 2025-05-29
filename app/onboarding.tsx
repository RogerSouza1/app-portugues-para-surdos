import { useEvent } from "expo";
import { useRouter } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import React from "react";
import {
  Button,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NextButton from "../components/NextButton";

const { width, height } = Dimensions.get("window");

const OnBoarding = () => {
  const router = useRouter();

  const videoSource =
    "https://voxbpjzqmefmnnbjqqgm.supabase.co/storage/v1/object/sign/media/Introducao/completo_comprimido.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzcxZDIzMGViLWQ1NTUtNDA3MC1hZTc4LTI3NTA0ZjRjN2U4NSJ9.eyJ1cmwiOiJtZWRpYS9JbnRyb2R1Y2FvL2NvbXBsZXRvX2NvbXByaW1pZG8ubXA0IiwiaWF0IjoxNzQ4NDkxMTY5LCJleHAiOjE3ODAwMjcxNjl9.c5T6Tbz_OOUhLk4vD_NlMBde5BFWmbi7DxXvSjFyRyo";

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = false;
    player.play();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  const handleNext = () => {
    router.replace({ pathname: "/tabs/modulos" });
  };

  const handleRestart = () => {
    player.currentTime = 0;
    player.play();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.contentContainer}>
          <View style={styles.videoFrame}>
            <VideoView style={styles.video} player={player} allowsFullscreen />
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
