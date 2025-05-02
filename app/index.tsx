import { Session } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { Image, StatusBar, StyleSheet } from "react-native";
import { supabase } from "../lib/supabase";
import Exercicios from "./(tabs)/exercicios";
import Home from "./(tabs)/home";
import Niveis from "./(tabs)/niveis";
import PreExercicio from "./(tabs)/pre-exercicio";
import OnBoarding from "./(tabs)/tutorial";

import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import Map from "./(tabs)/modulos";

export type RootStackParamList = {
  Home: undefined;
  OnBoarding: undefined;
  Auth: undefined;
  Account: undefined;
  Map: undefined;
  Niveis: undefined;
  Exercicios: undefined;
  PreExercicio: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <PaperProvider>
      <NavigationIndependentTree>
      <NavigationContainer>
        <StatusBar backgroundColor="#013974" barStyle="light-content" />
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="OnBoarding"
            component={OnBoarding}
            options={{
              headerStyle: {
                backgroundColor: "#013974",
              },
              headerTintColor: "#fff",
              headerTitleAlign: "center",
              headerRight: () => (
                <Image
                  source={require("../assets/images/logo.png")}
                  style={{
                    width: 40,
                    height: 40,
                    resizeMode: "contain",
                    marginRight: 10,
                    marginTop: 5,
                  }}
                />
              ),
              headerTitle: "Boas Vindas",
              headerBackTitle: "",
            }}
          />
          <Stack.Screen
            name="Map"
            component={Map}
            options={{
              headerStyle: {
                backgroundColor: "#013974",
              },
              headerTintColor: "#fff",
              headerTitleAlign: "center",
              headerRight: () => (
                <Image
                  source={require("../assets/images/logo.png")}
                  style={{
                    width: 40,
                    height: 40,
                    resizeMode: "contain",
                    marginRight: 10,
                    marginTop: 5,
                  }}
                />
              ),
              headerTitle: "Módulos",
              headerBackTitle: "",
            }}
          />
          <Stack.Screen
            name="Niveis"
            component={Niveis}
            options={{
              headerStyle: {
                backgroundColor: "#013974",
              },
              headerTintColor: "#fff",
              headerTitleAlign: "center",
              headerRight: () => (
                <Image
                  source={require("../assets/images/logo.png")}
                  style={{
                    width: 40,
                    height: 40,
                    resizeMode: "contain",
                    marginRight: 10,
                    marginTop: 5,
                  }}
                />
              ),
              headerTitle: "Níveis",
              headerBackTitle: "",
            }}
          />
          <Stack.Screen
            name="Exercicios"
            component={Exercicios}
            options={{
              headerStyle: {
                backgroundColor: "#013974",
              },
              headerTintColor: "#fff",
              headerTitleAlign: "center",
              headerRight: () => (
                <Image
                  source={require("../assets/images/logo.png")}
                  style={{
                    width: 40,
                    height: 40,
                    resizeMode: "contain",
                    marginRight: 10,
                    marginTop: 5,
                  }}
                />
              ),
              headerTitle: "Exercícios",
              headerBackTitle: "",
            }}
          />
          <Stack.Screen
            name="PreExercicio"
            component={PreExercicio}
            options={{
              headerStyle: {
                backgroundColor: "#013974",
              },
              headerTintColor: "#fff",
              headerTitleAlign: "center",
              headerRight: () => (
                <Image
                  source={require("../assets/images/logo.png")}
                  style={{
                    width: 40,
                    height: 40,
                    resizeMode: "contain",
                    marginRight: 10,
                    marginTop: 5,
                  }}
                />
              ),
              headerTitle: "Explicação",
              headerBackTitle: "",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </NavigationIndependentTree>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  text: {
    fontSize: 20,
    color: "#FFF",
  },
});
