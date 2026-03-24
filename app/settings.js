import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { COLORS, FONT, icons, SHADOWS, SIZES } from "../constants";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScreenHeaderBtn from "../components/ScreenHeaderBtn";

const Settings = () => {
  const [userDetails, setUserDetails] = useState(null);
  const router = useRouter();

  const settings = [
    {
      id: 1,
      title: "Settings",
      icon: "https://cdn-icons-png.flaticon.com/512/126/126472.png",
      target: "Mental Health",
      route: "ThemeChange",
    },
    {
      id: 2,
      title: "My Favourites",
      icon: "https://cdn-icons-png.flaticon.com/512/2932/2932360.png",
      target: "Mental Health",
      route: "Favourites",
    },
    {
      id: 3,
      title: "Daily Reminders",
      icon: "https://cdn-icons-png.flaticon.com/512/109/109613.png",
      target: "Mental Health",
      route: "DailyReminders",
    },
  ];

  const loadUserDetails = async () => {
    try {
      const user = await AsyncStorage.getItem("userDetails");
      if (user) {
        setUserDetails(JSON.parse(user));
      }
    } catch (error) {
      console.error("Error loading user details", error);
    }
  };

  useEffect(() => {
    loadUserDetails();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userDetails");
    router.replace("/login"); // replace est souvent mieux pour le logout
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <ScreenHeaderBtn />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <View style={{ width: "100%" }} testID="userDetails">
            {userDetails && (
              <Text
                style={{
                  fontFamily: FONT.regular,
                  fontSize: SIZES.large,
                  color: COLORS.secondary,
                }}
              >
                Hello {userDetails.userName}!
              </Text>
            )}
            <Text
              style={{
                fontFamily: FONT.bold,
                fontSize: SIZES.xLarge,
                color: COLORS.primary,
                marginTop: 2,
              }}
            >
              Would you like to change any settings?
            </Text>

            {settings.map((setting) => (
              <TouchableOpacity
                key={setting.id}
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  padding: SIZES.medium,
                  borderRadius: SIZES.small,
                  backgroundColor: "#FFF",
                  ...SHADOWS.medium,
                  shadowColor: COLORS.gray2 || "#83829A", // Correction fallback couleur
                  marginVertical: SIZES.small,
                }}
                onPress={() => router.push(`settings/${setting.route}`)}
              >
                <View
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: COLORS.white,
                    borderRadius: SIZES.medium,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{ uri: setting.icon }}
                    resizeMode="contain"
                    style={{ width: "70%", height: "70%" }}
                  />
                </View>
                <View style={{ flex: 1, marginHorizontal: SIZES.medium }}>
                  <Text
                    style={{
                      fontSize: SIZES.medium,
                      fontFamily: "DMBold",
                      color: COLORS.primary,
                    }}
                    numberOfLines={1}
                  >
                    {setting?.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                padding: SIZES.medium,
                borderRadius: SIZES.small,
                backgroundColor: "#FFC0CB",
                ...SHADOWS.medium,
                shadowColor: COLORS.gray2 || "#83829A",
                marginVertical: SIZES.small,
              }}
              onPress={handleLogout}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: COLORS.white,
                  borderRadius: SIZES.medium,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={icons.left}
                  resizeMode="contain"
                  style={{
                    width: "70%",
                    height: "70%",
                  }}
                />
              </View>
              <View style={{ flex: 1, marginHorizontal: SIZES.medium }}>
                <Text
                  style={{
                    fontSize: SIZES.medium,
                    fontFamily: "DMBold",
                    color: COLORS.primary,
                  }}
                  numberOfLines={1}
                >
                  Logout
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;