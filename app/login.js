import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet // 🚩 OPTIMIZATION 1: Move styles to StyleSheet for performance
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, SHADOWS } from "../constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    // 🚩 OPTIMIZATION 2: Basic validation with trimming to avoid empty spaces
    if (!email.trim() || !password.trim()) {
      Alert.alert("Validation Error", "Please fill in all fields.");
      return;
    }

    try {
      // 🚩 OPTIMIZATION 3: Check for user data once, then compare
      const detailsDatafromSignup = await AsyncStorage.getItem("userDetails");

      if (detailsDatafromSignup) {
        const parsedDetails = JSON.parse(detailsDatafromSignup);

        if (
          email.toLowerCase() === parsedDetails.email.toLowerCase() && // 🚩 OPTIMIZATION 4: Case-insensitive email check
          password === parsedDetails.password
        ) {
          router.push("/home");
        } else {
          Alert.alert("Error", "Incorrect email or password.");
        }
      } else {
        Alert.alert("Error", "No user found. Please sign up first.");
      }
    } catch (error) {
      console.error("Error accessing AsyncStorage", error);
      Alert.alert("Error", "An error occurred while logging in.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => null, // 🚩 OPTIMIZATION 5: null is cleaner for hiding headers
          headerTitle: "",
        }}
      />

      <View style={styles.content}>
        <View style={styles.iconWrapper}>
          <Image source={icons.menu} style={styles.logo} />
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address" // 🚩 OPTIMIZATION 6: Better UX with specific keyboard
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            value={password}
            secureTextEntry
            onChangeText={setPassword}
            placeholder="Password"
            autoCapitalize="none"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/signup")}>
            <Text style={styles.linkText}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

// 🚩 OPTIMIZATION 1: External styles are pre-compiled and more efficient
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  content: {
    padding: 20,
  },
  iconWrapper: {
    padding: 20,
    marginHorizontal: "auto",
    backgroundColor: "#f0f0f0",
    borderRadius: 50,
    height: 90,
    width: 90,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  },
  logo: {
    width: 50,
    height: 50,
  },
  form: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: COLORS.white,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    color: "#666",
  },
  linkText: {
    color: "blue",
    fontWeight: "bold",
  },
});

export default Login;