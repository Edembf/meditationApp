import React, { memo } from "react";
import { View, Text, Image } from "react-native";
import styles from "./MeditationTopDisplay.style";

// Use React.memo to skip re-renders if props haven't changed
const MeditationTopDisplay = memo(({ 
  meditationImage, 
  meditationTitle = "Meditation Session", 
  duration = "00:00", 
  target = "General" 
}) => {
  
  // Placeholder image in case the URI is broken or null
  const imageSource = meditationImage 
    ? { uri: meditationImage } 
    : { uri: 'https://via.placeholder.com/150' };

  return (
    <View style={styles.container}>
      <View style={styles.logoBox}>
        <Image
          source={imageSource}
          resizeMode="cover"
          style={styles.logoImage}
          // Optimization: load priority for the main header image
          progressiveRenderingEnabled
        />
      </View>

      <View style={styles.meditationTitleBox}>
        <Text style={styles.meditationTitle} numberOfLines={2}>
          {meditationTitle}
        </Text>
      </View>

      <View style={styles.meditationInfoBox}>
        <Text style={styles.meditationName}>{target} / </Text>
        
        <View style={styles.durationBox}>
          <Image
            // FIX: Remote URIs must be wrapped in { uri: ... }
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/109/109613.png" }}
            resizeMode="contain"
            style={styles.durationImage}
          />
          <Text style={styles.durationName}>{duration}</Text>
        </View>
      </View>
    </View>
  );
});

// Setting a display name for easier debugging with memo
MeditationTopDisplay.displayName = "MeditationTopDisplay";

export default MeditationTopDisplay;