import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Alert,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet // 🚩 OPTIMIZATION 1: Use StyleSheet for better performance
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, SHADOWS } from "../constants";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // 🚩 OPTIMIZATION 2: Logic separation and input trimming
  const handleRegister = async () => {
    const trimmedUser = userName.trim();
    const trimmedEmail = email.trim();

    if (!trimmedUser || !trimmedEmail || !password) {
      Alert.alert("Validation Error", "Please fill in all fields.");
      return;
    }

    try {
      const userDetails = { 
        userName: trimmedUser, 
        email: trimmedEmail, 
        password, 
        token: "sample-token" 
      };
      
      await AsyncStorage.setItem("userDetails", JSON.stringify(userDetails));
      console.log("User registered:", userDetails);
      router.push("/login");
    } catch (error) {
      // 🚩 OPTIMIZATION 3: Error handling for storage failures
      Alert.alert("Storage Error", "Failed to save user data.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => null, // 🚩 OPTIMIZATION 4: null is cleaner than an empty fragment here
          headerTitle: "",
        }}
      />

      <View style={styles.content} testID="signupContainer">
        <View style={styles.iconWrapper} testID="imageIcon">
          <Image source={icons.menu} style={styles.logo} />
        </View>

        <View style={styles.form} testID="formData">
          <TextInput
            style={styles.input}
            value={userName}
            onChangeText={setUserName}
            placeholder="Username"
            autoCapitalize="words"
          />

          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address" // 🚩 OPTIMIZATION 5: Native keyboard optimization
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Password"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleRegister}
            activeOpacity={0.7} // 🚩 OPTIMIZATION 6: Visual feedback on press
            testID="handleRegister"
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.footer} testID="textData">
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text style={styles.linkText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

// 🚩 OPTIMIZATION 1: Externalizing styles reduces re-renders
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
  },
  logo: {
    width: 50,
    height: 50,
  },
  form: {
    marginTop: 30,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
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

export default SignUp;