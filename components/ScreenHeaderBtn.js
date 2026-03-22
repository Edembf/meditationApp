import React from "react"; // 🚩 OPTIMISATION 1 : Toujours importer React
import { Image, TouchableOpacity, StyleSheet, View } from "react-native"; // 🚩 CORRECTIF 2 : Importation de View depuis "react-native"
import { useRouter } from "expo-router";
import { COLORS, SIZES } from "../constants/theme";
import icons from "../constants/icons";

const ScreenHeaderBtn = ({ detailPage, handleShare }) => {
  const router = useRouter();

  return (
    <View style={styles.headerWrapper}>
      <TouchableOpacity 
        style={styles.btnContainer} 
        onPress={() => router.push("/home")}
        activeOpacity={0.7}
      >
        <Image source={icons.menu} style={styles.image} />
      </TouchableOpacity>

      {detailPage ? (
        <TouchableOpacity 
          style={styles.btnContainer} 
          onPress={handleShare}
          activeOpacity={0.7}
        >
          <Image source={icons.share} style={styles.image} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity 
          style={styles.btnContainer} 
          onPress={() => router.push("/settings")}
          activeOpacity={0.7}
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
    paddingHorizontal: 10, 
    width: '100%', // 🚩 OPTIMISATION 3 : Utiliser '100%' au lieu de '100vw' pour la compatibilité native
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
    width: 30, 
    height: 30,
    resizeMode: 'contain',
  },
});

export default ScreenHeaderBtn;