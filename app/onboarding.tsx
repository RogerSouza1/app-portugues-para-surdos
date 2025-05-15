import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from "react-native";
import Bullets from "../components/Bullets";
import Card from "../components/Card";
import NextButton from "../components/NextButton";

const { width, height } = Dimensions.get("window");

const images = [
  require("../assets/images/image1.jpg"),
  require("../assets/images/image1.jpg"),
];

const OnBoarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex === images.length - 1) {
      router.replace({ pathname: "/tabs/modulos" });
    } else {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentWrapper}>
        <Animated.FlatList
          ref={flatListRef}
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <Card image={item} />}
          contentContainerStyle={styles.flatListContent}
        />

        <Bullets total={images.length} currentIndex={currentIndex} scrollX={scrollX} />
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 120,
  },
  flatListContent: {
    alignItems: "center",
  },
});

export default OnBoarding;