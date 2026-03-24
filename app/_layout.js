import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ThemeProvider } from "../context/ThemeProvider";

export const unstable_settings = {
  initialRouteName: "login",
};

const Layout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Chargement des polices
  const [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });

  useEffect(() => {
    const checkLoginState = async () => {
      try {
        const user = await AsyncStorage.getItem("userDetails");
        if (user) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error checking login state:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginState();
  }, []);


  if (isLoading || !fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <Stack
        initialRouteName={isLoggedIn ? "home" : "login"}
        screenOptions={{ 
          headerShown: false,
          animation: "fade" // Optionnel : transition plus douce pour le changement de thème
        }}
      >
        
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="home" />
        <Stack.Screen name="settings/Favourites" />
        <Stack.Screen name="settings/ThemeChange" />
      </Stack>
    </ThemeProvider>
  );
};

export default Layout;