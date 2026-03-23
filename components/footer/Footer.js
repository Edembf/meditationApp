import { View, Text, Image, TouchableOpacity } from "react-native";
import { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./Footer.style";
import { icons } from "../../constants";

const FAVORITES_KEY = "favorites";

const Footer = ({ data }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if item is favorited on mount or when data changes
  const checkIfFavorite = useCallback(async () => {
    if (!data?.id) return;
    try {
      const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
      const favoritesArray = favorites ? JSON.parse(favorites) : [];
      setIsFavorite(favoritesArray.some((item) => item.id === data.id));
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  }, [data?.id]);

  useEffect(() => {
    checkIfFavorite();
  }, [checkIfFavorite]);

  const handleFavoriteToggle = async () => {
    // 1. Optimistic Update: Change UI immediately for better UX
    const previousState = isFavorite;
    setIsFavorite(!previousState);

    try {
      const favorites = await AsyncStorage.getItem(FAVORITES_KEY);
      let favoritesArray = favorites ? JSON.parse(favorites) : [];

      if (previousState) {
        // Remove from favorites
        favoritesArray = favoritesArray.filter((item) => item.id !== data.id);
      } else {
        // Add to favorites
        favoritesArray.push(data);
      }

      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favoritesArray));
    } catch (error) {
      // 2. Rollback: If storage fails, revert the UI state
      setIsFavorite(previousState);
      console.error("Failed to update favorites:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.likeBtn} 
        onPress={handleFavoriteToggle}
        activeOpacity={0.7}
      >
        <Image
          source={isFavorite ? icons.heartFilled : icons.heartOutline}
          resizeMode="contain"
          style={[
            styles.likeBtnImage,
            { tintColor: isFavorite ? "#FF0000" : "#F37453" },
          ]}
        />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.applyBtn} 
        onPress={handleFavoriteToggle}
        activeOpacity={0.8}
      >
        <Text style={styles.applyBtnText}>
          {isFavorite ? "Remove from favorites" : "Add to favorites"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;