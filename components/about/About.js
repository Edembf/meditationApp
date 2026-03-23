import React, { memo } from "react";
import { View, Text } from "react-native";
import styles from "./About.style";

/**
 * Optimized About Component
 * Using React.memo to prevent re-renders when parent state changes
 * unless 'info' or 'title' actually change.
 */
const About = memo(({ info, title = "this session" }) => {
  // Guard clause: If there is no info, we might not want to render the section at all
  if (!info) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.headText}>About {title}:</Text>

      <View style={styles.contentBox}>
        <Text 
          style={styles.contextText}
          selectable={true} // UX Improvement: allows users to copy text
        >
          {info}
        </Text>
      </View>
    </View>
  );
});

// Setting DisplayName for better debugging with memoized components
About.displayName = "About";

export default About;