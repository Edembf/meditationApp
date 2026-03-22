import React from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { COLORS, FONT, SIZES, SHADOWS } from "../constants/theme";
import useFetch from "../hook/useFetch";

const DailyMeditation = ({ meditations }) => {
  const router = useRouter();

  // 🚩 OPTIMISATION 1 : Vérifier la clé de retour du hook. 
  // Ton hook retourne probablement 'data' et non 'bestMeditations'. 
  const { data: fetchedData, isLoading, error } = useFetch("search", {
    query: "Daily Meditation", // 🚩 OPTIMISATION 2 : Ajouter une query par défaut
    num_pages: "1",
  });

  const handleNavigate = (id) => {
    router.push(`/meditation-details/${id}`);
  };

  // 🚩 OPTIMISATION 3 : Priorité aux props, sinon aux données fetchées
  const finalData = meditations || fetchedData;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Daily Meditation</Text>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text style={styles.errorText}>Something went wrong</Text>
        ) : (
          finalData?.map((meditation) => (
            <TouchableOpacity
              key={`daily-${meditation.id}`}
              style={styles.cardContainer}
              onPress={() => handleNavigate(meditation.id)}
              activeOpacity={0.8}
            >
              <View style={styles.logoContainer}>
                <Image
                  source={{ uri: meditation.image || 'https://via.placeholder.com/150' }}
                  resizeMode="cover"
                  style={styles.logoImage}
                />
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.meditationName} numberOfLines={1}>
                  {meditation.title}
                </Text>
                <View style={styles.detailsRow}>
                  <Text style={styles.meditationDetail}>🎯 {meditation.target}</Text>
                  <Text style={styles.meditationDetail}>🕒 {meditation.duration}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xLarge,
    paddingHorizontal: SIZES.small, // 🚩 OPTIMISATION 4 : Meilleur alignement
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SIZES.medium,
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.primary,
  },
  cardsContainer: {
    gap: SIZES.medium, // Espacement entre les cartes verticales
  },
  cardContainer: {
    backgroundColor: "#FFF",
    borderRadius: SIZES.medium,
    overflow: "hidden", // 🚩 OPTIMISATION 5 : Pour que l'image respecte l'arrondi
    ...SHADOWS.medium,
    elevation: 3, // Support Android
    marginBottom: SIZES.small,
  },
  logoContainer: {
    width: "100%",
    height: 160,
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    padding: SIZES.medium,
  },
  meditationName: {
    fontSize: SIZES.medium,
    fontFamily: FONT.bold, // 🚩 Utilisation de FONT.bold au lieu de chaîne "DMBold"
    color: COLORS.primary,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: SIZES.small / 2,
  },
  meditationDetail: {
    fontSize: SIZES.small,
    fontFamily: FONT.regular,
    color: COLORS.gray,
  },
  errorText: {
    color: COLORS.tertiary,
    fontFamily: FONT.regular,
  }
});

export default DailyMeditation;