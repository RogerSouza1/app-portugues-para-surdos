import React from "react";
import { View, StyleSheet, Animated } from "react-native";

interface BulletsProps {
  total: number; 
  currentIndex: number; 
  scrollX: Animated.Value; 
}

const Bullets: React.FC<BulletsProps> = ({ total, currentIndex, scrollX }) => {
  return (
    <View style={styles.indicatorContainer}>
      {Array.from({ length: total }).map((_, index) => {
        const scale = scrollX.interpolate({
          inputRange: [
            (index - 1) * 1,
            index * 1,
            (index + 1) * 1,
          ],
          outputRange: [1, 1.5, 1],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.indicator,
              currentIndex === index && styles.activeIndicator,
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    width: 30,
    height: 7,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: "#013974",
  },
});

export default Bullets;