import React from "react"; // Nécessaire pour le JSX
import { useRouter } from "expo-router";
import { Image, TouchableOpacity, StyleSheet, View } from "react-native"; // Ajout de View
import { COLORS, SIZES } from "../constants/theme";
import icons from "../constants/icons";

const ScreenHeaderBtn = ({ detailPage, handleShare }) => {
  const router = useRouter();

  return (
    <View style={styles.headerWrapper}>
      <TouchableOpacity 
        style={styles.btnContainer} 
        onPress={() => router.push("/home")}
      >
        <Image source={icons.menu} style={styles.image} />
      </TouchableOpacity>

      {detailPage ? (
        <TouchableOpacity 
          style={styles.btnContainer} 
          onPress={handleShare}
        >
          <Image source={icons.share} style={styles.image} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity 
          style={styles.btnContainer} 
          onPress={() => router.push("/settings")}
        >
          <Image source={icons.settings} style={styles.image} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center', 
    paddingHorizontal: 10, // Correction du padding web '0 10px'
    width: '100%', // Correction de '100vw'
  },
  btnContainer: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small / 1.25,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 30, // Correction de '30px'
    height: 30, // Correction de '30px'
    resizeMode: 'contain',
  },
});

export default ScreenHeaderBtn;