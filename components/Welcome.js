import React, { useMemo } from "react"; // 1. Ajout de useMemo
import { View, Text, StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../constants/theme";

const Welcome = ({ userDetails, isDarkMode }) => {
  

  const dynamicStyles = useMemo(() => ({
    userName: {
      color: isDarkMode ? COLORS.lightWhite : COLORS.darkText,
    },
    welcomeMessage: {
      color: isDarkMode ? COLORS.lightText : COLORS.darkText,
    }
  }), [isDarkMode]);

  return (
    <View>
      <Text style={{ 
        fontSize: SIZES.xLarge,
        fontFamily: "DMBold",
        
        color: isDarkMode ? COLORS.lightWhite : COLORS.primary 
      }}>
        Hello {userDetails?.userName}!
      </Text>
      <Text 
        style={[
          styles.welcomeMessage, 
          { color: isDarkMode ? COLORS.lightWhite : COLORS.primary }
        ]}
      >
        Find your perfect meditation
      </Text>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
 container: {
    width: "100%",
    padding: 10,
  },
  userName: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
  },
  welcomeMessage: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    marginTop: 2,
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.large,
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
  },
  searchInput: {
    fontFamily: FONT.regular,
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
  },
  tabsContainer: {
    width: "100%",
    marginTop: SIZES.medium,
  },
});
