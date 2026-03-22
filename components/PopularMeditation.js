import React, { useState } from "react";
import { useRouter } from "expo-router";
import { COLORS, FONT, SHADOWS, SIZES } from '../constants/theme';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import useFetch from "../hook/useFetch";

const PopularMeditation = () => {
  const router = useRouter();
  const [selectedMeditation, setSelectedMeditation] = useState();

  // 🚩 OPTIMISATION 1 : Ajuster la requête pour qu'elle corresponde au contenu (Méditation)
  const { data, isLoading, error } = useFetch("search", {
    query: "Meditation", 
    num_pages: "1",
  });

  const handleCardPress = (item) => {
    router.push(`/meditation-details/${item.id}`);
    setSelectedMeditation(item.id);
  };

  // 🚩 OPTIMISATION 2 : Extraire le rendu pour plus de clarté
  const renderMeditationCard = ({ item }) => {
    const isSelected = selectedMeditation === item.id;

    return (
      <TouchableOpacity
        style={styles.cardContainer(isSelected)}
        onPress={() => handleCardPress(item)}
      >
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: item?.image || 'https://via.placeholder.com/150' }}
            resizeMode="cover"
            style={styles.logoImage}
          />
        </View>

        <View style={styles.tabsContainer}>
          <Text style={styles.targetTag} numberOfLines={1}>
            {item.target || "All Levels"}
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.meditationTitle(isSelected)} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.description(isSelected)} numberOfLines={2}>
            {item?.shortDescription}
          </Text>
        </View>
        
        <Text style={styles.duration}>🕒 {item.duration || "10 min"}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Meditations</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text style={styles.errorText}>Something went wrong</Text>
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderMeditationCard}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
            showsHorizontalScrollIndicator={false} // 🚩 OPTIMISATION 3 : UI plus propre
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: SIZES.xLarge,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SIZES.small,
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.primary,
  },
  headerBtn: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.gray,
  },
  cardsContainer: {
    marginTop: SIZES.medium,
  },
  // 🚩 OPTIMISATION 4 : Simplification du passage de props aux styles
  cardContainer: (isSelected) => ({
    width: 250,
    padding: SIZES.medium,
    backgroundColor: isSelected ? COLORS.primary : "#FFF",
    borderRadius: SIZES.medium,
    marginLeft: SIZES.small,
    ...SHADOWS.medium,
    elevation: 3, // Pour Android sur ton environnement Linux
  }),
  logoContainer: {
    width: "100%",
    height: 120,
    borderRadius: SIZES.medium,
    overflow: "hidden",
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  tabsContainer: {
    marginTop: SIZES.small,
  },
  targetTag: {
    fontSize: SIZES.small,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: SIZES.small,
    borderWidth: 1,
    borderColor: COLORS.gray2,
    alignSelf: 'flex-start',
  },
  infoContainer: {
    marginTop: SIZES.small,
  },
  meditationTitle: (isSelected) => ({
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    color: isSelected ? COLORS.white : COLORS.primary,
  }),
  description: (isSelected) => ({
    fontSize: SIZES.small,
    fontFamily: FONT.regular,
    color: isSelected ? COLORS.lightWhite : COLORS.gray,
    marginTop: 4,
  }),
  duration: {
    fontSize: SIZES.small,
    fontFamily: FONT.medium,
    color: "#B3AEC6",
    marginTop: SIZES.small,
  },
  errorText: {
    color: COLORS.tertiary,
    textAlign: 'center',
  }
});

export default PopularMeditation;