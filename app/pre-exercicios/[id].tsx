import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from 'expo-video';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Image, Dimensions, Button } from "react-native";
import NextButton from "../../components/NextButton";
import { buscarMidia } from "../../services/supabase-query"

const { width, height } = Dimensions.get("window");

const PreExercicio = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [media, setMedia] = useState<any[]>([]);
  const [videoSource, setVideoSource] = useState<string | null>(null);
  const router = useRouter();

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
      params: { id }
    });
  };

  const player = useVideoPlayer(videoSource, player => {
    player.loop = false;
    player.play();
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  const handleRestart = () => {
    player.currentTime = 0;
    player.play();
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Pré Exercício {id}</Text>
        {media.length > 0 && (
          <View style={{ height: 200, marginBottom: 20 }}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              style={{ flex: 1 }}
            >
              {media.map((item: any, idx: number) => (
                <View key={idx} style={{ width: 300, height: 200, justifyContent: "center", alignItems: "center" }}>
                  {item.tipo === "video_libras" ? (
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
                  ) : (
                    <Image
                      source={{ uri: item.url }}
                      style={{ width: 280, height: 180, borderRadius: 10 }}
                      resizeMode="cover"
                    />
                  )}
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
      <NextButton direction="right" onPress={handleNavigateToExercicios} />
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
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#013974",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
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
  }
});

export default PreExercicio;