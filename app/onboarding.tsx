import { useEvent } from "expo";
import { useRouter } from "expo-router";
import { useVideoPlayer, VideoView } from 'expo-video';
import React from "react";
import {
    Button,
    Dimensions,
    SafeAreaView,
    StyleSheet,
    View
} from "react-native";
import NextButton from "../components/NextButton";

const { width, height } = Dimensions.get("window");

const OnBoarding = () => {
  const router = useRouter();

  const videoSource = "https://voxbpjzqmefmnnbjqqgm.supabase.co/storage/v1/object/sign/media/Introducao/completo_comprimido.mp4?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzcxZDIzMGViLWQ1NTUtNDA3MC1hZTc4LTI3NTA0ZjRjN2U4NSJ9.eyJ1cmwiOiJtZWRpYS9JbnRyb2R1Y2FvL2NvbXBsZXRvX2NvbXByaW1pZG8ubXA0IiwiaWF0IjoxNzQ4NDkxMTY5LCJleHAiOjE3ODAwMjcxNjl9.c5T6Tbz_OOUhLk4vD_NlMBde5BFWmbi7DxXvSjFyRyo";
  
  const player = useVideoPlayer(videoSource, player => {
    player.loop = false;
    player.play();
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

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
          <VideoView 
            style={styles.video} 
            player={player} 
            allowsFullscreen
          />
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
    height: height * 0.55,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 120,
  },
  contentContainer: {
    width: width * 0.9,
    height: height * 0.45,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: "80%",
    backgroundColor: "#000",
    borderRadius: 16,
  },
  controlsContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "60%",
  },
});

export default OnBoarding;