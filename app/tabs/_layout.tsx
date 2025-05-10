import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#013974",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          height: 70,
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
          borderTopWidth: 0,
          paddingTop: 10,
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#ccc",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="modulos"
        options={{
          title: "Módulos",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "book" : "book-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="dicionario"
        options={{
          title: "Dicionário",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "bookmarks" : "bookmarks-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="perfilConquistas"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
