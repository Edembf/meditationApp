import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    marginVertical: SIZES.medium,
    paddingHorizontal: SIZES.small, // Add padding so text doesn't hit the edges
  },
  
  // FIX: Added color and line height for the "About" text
  contextText: {
    fontSize: SIZES.medium - 2,
    color: COLORS.secondary || "#333", // Ensure this isn't white!
    fontFamily: FONT.regular,
    textAlign: 'justify',
    lineHeight: 22, // Makes long descriptions much easier to read
  },

  // Added styling for the "About Title" (headText)
  headText: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    fontFamily: FONT.bold,
    marginBottom: SIZES.small,
  },

  contentBox: {
    marginTop: SIZES.small,
  },

  // --- Meditation Top Display Styles ---
  logoBox: {
    width: "100%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: SIZES.large,
    // Note: Shadow needs elevation on Android
    shadowColor: COLORS.gray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, 
  },
  logoImage: {
    width: "100%",
    height: "100%",
    borderRadius: SIZES.large,
  },
  meditationTitleBox: {
    marginTop: SIZES.small,
  },
  meditationTitle: {
    fontSize: SIZES.large,
    color: COLORS.primary,
    fontFamily: FONT.bold,
    textAlign: "center",
  },
  meditationInfoBox: {
    marginTop: SIZES.small / 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  meditationName: {
    fontSize: SIZES.medium - 2,
    color: COLORS.primary,
    fontFamily: FONT.medium,
  },
  durationBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  durationImage: {
    width: 14,
    height: 14,
    tintColor: COLORS.gray, // Ensures the icon color matches the text
  },
  durationName: {
    fontSize: SIZES.medium - 2,
    color: COLORS.gray,
    fontFamily: FONT.regular,
    marginLeft: 4,
  },
});

export default styles;