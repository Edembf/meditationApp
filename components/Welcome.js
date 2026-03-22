import React from "react"; // 🚩 OPTIMISATION 1 : Toujours présent pour la cohérence
import { View, Text, StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../constants/theme";

const Welcome = ({ userDetails }) => {
  // 🚩 OPTIMISATION 2 : Valeur de repli (fallback) si le nom est absent
  const nameToShow = userDetails?.userName || "Guest";

  return (
    <View style={styles.container}>
      <Text style={styles.userName}>Hello {nameToShow}!</Text>
      <Text style={styles.welcomeMessage}>Find your perfect meditation</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // 🚩 OPTIMISATION 3 : Ajout d'un padding optionnel pour l'alignement
    paddingVertical: SIZES.small, 
  },
  userName: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.secondary,
  },
  welcomeMessage: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginTop: 2,
  },
  // 🚩 OPTIMISATION 4 : J'ai supprimé les styles de recherche (searchContainer, etc.) 
  // s'ils ne sont pas utilisés dans ce composant spécifique pour alléger le bundle.
});

export default Welcome;