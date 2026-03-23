import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, useColorScheme } from "react-native"; // Ajout de useColorScheme
import { COLORS, SIZES } from "../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScreenHeaderBtn from "../components/ScreenHeaderBtn";
import Welcome from "../components/Welcome";
import PopularMeditation from "../components/PopularMeditation";
import DailyMeditation from "../components/DailyMeditation";
import DailyQuote from "../components/DailyQuote";

const Home = () => {
  const [userDetails, setUserDetails] = useState(null);
  
  // Correction 1 : Gérer le mode sombre (via le système ou un état)
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    try {
      const user = await AsyncStorage.getItem("userDetails");
      if (user !== null) {
        // Correction 2 : Parser le JSON ici pour simplifier le composant Welcome
        setUserDetails(JSON.parse(user));
      }
    } catch (error) {
      console.error("Erreur lors du chargement de l'utilisateur", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      {/* Vérifiez si ScreenHeaderBtn attend des props spécifiques */}
      <ScreenHeaderBtn /> 
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
          testID="screensDisplay"
        >
          {/* On passe userDetails directement car il est déjà parsé */}
          <Welcome 
            userDetails={userDetails} 
            isDarkMode={isDarkMode} 
          />
          
          <DailyQuote />
          
          <PopularMeditation isDarkMode={isDarkMode} />
          
          <DailyMeditation isDarkMode={isDarkMode} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;