import React, { useState, useCallback } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";

import { COLORS, FONT, SIZES } from "../../constants";
import DailyMeditation from "../../components/DailyMeditation";
import ScreenHeaderBtn from '../../components/ScreenHeaderBtn';

const Favourites = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadFavorites = async (showLoader = false) => {
    if (showLoader) setIsLoading(true);
    
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      const favoritesArray = storedFavorites ? JSON.parse(storedFavorites) : [];
      setFavorites(favoritesArray);
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  // Optimized: useFocusEffect only triggers loading state on the very first mount
  useFocusEffect(
    useCallback(() => {
      loadFavorites(favorites.length === 0);
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    loadFavorites();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScreenHeaderBtn />
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />
        }
      >
        <View style={styles.container}>
          {isLoading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
          ) : favorites.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.headerTitle}>No favorite sessions found yet.</Text>
              <Text style={styles.subTitle}>Items you heart will appear here.</Text>
            </View>
          ) : (
            <View>
              <Text style={styles.sectionTitle}>My Favorite Exercises</Text>
              <DailyMeditation meditations={favorites} />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.darkBackground,
  },
  container: {
    marginTop: SIZES.xLarge,
    padding: SIZES.medium,
  },
  loaderContainer: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    marginTop: 100,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
    color: COLORS.primary,
    textAlign: "center",
  },
  subTitle: {
    fontSize: SIZES.medium,
    color: COLORS.gray, // Assuming you have gray in constants
    textAlign: "center",
    marginTop: 10,
  },
  sectionTitle: {
    textAlign: "center", 
    color: "#FF4500", 
    fontWeight: "bold",
    fontSize: SIZES.medium,
    marginBottom: SIZES.small,
    textTransform: "uppercase",
  },
});

export default Favourites;