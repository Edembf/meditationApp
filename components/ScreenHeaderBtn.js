import React, { useState } from "react";
import { Image, TouchableOpacity, StyleSheet, View, Text, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { COLORS, SIZES } from "../constants/theme";
import icons from "../constants/icons";
import AsyncStorage from "@react-native-async-storage/async-storage";



// Composant interne stylisé selon ta capture
const MenuItem = ({ title, icon, onPress, isLogout }) => (
  <TouchableOpacity 
    style={[styles.menuCard, isLogout && styles.logoutCard]} 
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={styles.iconBox}>
      <Text style={styles.iconStyle}>{icon}</Text>
    </View>
    <Text style={styles.menuText}>{title}</Text>
  </TouchableOpacity>
);

const ScreenHeaderBtn = ({ user = "User", detailPage, handleShare, isDarkMode = false }) => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false); 

  const handleMenuToggle = () => setShowMenu(prev => !prev);

  const navigateTo = (path) => {
    setShowMenu(false);
    router.push(path);
  };
  const [userName, setUserName] = useState("User");

const loadUserDetails = async () => {
  try {
    // Utilisation de la clé exacte : "userDetails"
    const user = await AsyncStorage.getItem("userDetails");
    
    if (user) {
      // On transforme la string JSON en objet JS
      const parsedUser = JSON.parse(user);
      
      // On extrait "userName" (Adama dans ton exemple)
      setUserName(parsedUser.userName || "User");
    }
  } catch (error) {
    console.error("Erreur chargement user:", error);
  }
};

React.useEffect(() => {
  loadUserDetails();
}, []);

  return (
    <View style={styles.headerWrapper}>
      <TouchableOpacity 
        style={styles.btnContainer} 
        onPress={() => router.push("/home")}
      >
        <Image source={icons.menu} style={styles.image} />
      </TouchableOpacity>

      <View style={{ zIndex: 3000 }}> 
        <TouchableOpacity 
          style={styles.btnContainer} 
          onPress={detailPage ? handleShare : handleMenuToggle}
        >
          <Image source={detailPage ? icons.share : icons.settings} style={styles.image} />
        </TouchableOpacity>

        {/* MENU DYNAMIQUE STYLISÉ */}
        {showMenu && (
          <View style={[
            styles.dropdownMenu, 
            { backgroundColor: isDarkMode ? "#1A1A1A" : "#FBFBFF" }
          ]}>
            <Text style={styles.helloText}>Hello {userName}!</Text>
            <Text style={styles.dropdownTitle}>Would you like to change any settings?</Text>

            <MenuItem 
              title="Settings" icon="⚙️" 
              onPress={() => navigateTo("/settings/ThemeChange")} 
            />
            <MenuItem 
              title="My Favourites" icon="👒" 
              onPress={() => navigateTo("/settings/Favourites")} 
            />
            <MenuItem 
              title="Daily Reminders" icon="⏰" 
              onPress={() => navigateTo("/settings/Reminders")} 
            />
            
            <MenuItem 
              title="Logout" icon="⬅️" 
              isLogout={true} 
              onPress={() => {
                setShowMenu(false);
                router.replace("/login");
              }} 
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center', 
    paddingHorizontal: 15, 
    width: '100%',
    zIndex: 1000,
  },
  btnContainer: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
  },
  image: {
    width: 25, 
    height: 25,
    resizeMode: 'contain',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 50,
    right: 0,
    width: 280, // Un peu plus large pour l'effet carte
    padding: 20,
    borderRadius: 25,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
  },
  helloText: {
    fontSize: 14,
    color: '#6A6A8E',
    marginBottom: 4,
  },
  dropdownTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#312651',
    marginBottom: 20,
  },
  // Style des Cartes
  menuCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  logoutCard: {
    backgroundColor: '#FFC0D3', // Rose selon ta capture
    marginTop: 10,
  },
  iconBox: {
    width: 40,
    height: 40,
    backgroundColor: '#F3F4F8',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconStyle: {
    fontSize: 18,
  },
  menuText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#312651',
  }
});

export default ScreenHeaderBtn;