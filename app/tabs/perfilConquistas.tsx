import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function PerfilConquistas() {
  const badgeIcons: Array<
    "star" | "trophy" | "medal" | "crown" | "diamond-stone" | "rocket" | "emoticon-happy" | "fire" | "heart" | "lightbulb-on" | "shield-check" | "account-star"
  > = [
    "star",
    "trophy",
    "medal",
    "crown",
    "diamond-stone",
    "rocket",
    "emoticon-happy",
    "fire",
    "heart",
    "lightbulb-on",
    "shield-check",
    "account-star",
  ];

  const screenWidth = Dimensions.get("window").width;
  const badgeMargin = 8;
  const badgeSize = (screenWidth - badgeMargin * 5 - 40) / 4; 

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#013974" />
      <View style={styles.headerBackground} />
      <View style={styles.headerIconContainer}>
        <Image
          source={require("../../assets/images/image1.jpg")}
          style={styles.headerImage}
        />
        <Text style={styles.headerName}>Andressa Urach</Text>
      </View>
      <View style={styles.background}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Lições Concluídas</Text>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: "70%" }]} />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Conquistas</Text>
            <View style={styles.badgesContainer}>
              {badgeIcons.map((iconName, index) => (
                <View
                  key={index}
                  style={[
                    styles.badge,
                    {
                      width: badgeSize,
                      height: badgeSize,
                      marginRight: (index + 1) % 4 === 0 ? 0 : badgeMargin,
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={iconName}
                    size={36}
                    color="#FFF"
                  />
                </View>
              ))}
            </View>
          </View>
          
        </ScrollView>
      </View>
    </View>
  );
}

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
    height: 800,
    backgroundColor: "#013974",
    zIndex: 1,
  },
  headerIconContainer: {
    marginTop: 100,
    marginBottom: 60,
    alignItems: "center",
    zIndex: 2,
  },
  headerImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#FFF",
  },
  headerName: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 25,
  },
  background: {
    flex: 1,
    backgroundColor: "#F7F9FA",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    zIndex: 3,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  progressBarBackground: {
    width: "100%",
    height: 20,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#013974",
  },
  badgesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  badge: {
    backgroundColor: "#013974",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
});
