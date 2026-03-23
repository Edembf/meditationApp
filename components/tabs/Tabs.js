import React, { memo, useCallback } from "react";
import { TouchableOpacity, FlatList, Text, View } from "react-native";

import styles from "./Tabs.style";
import { SIZES } from "../../constants";

// 1. Memoize the button to prevent all tabs from re-rendering 
// when only one tab's active state changes.
const TabButton = memo(({ name, activeTab, onHandleSearchType }) => (
  <TouchableOpacity
    style={styles.btn(name, activeTab)}
    onPress={() => onHandleSearchType(name)}
    activeOpacity={0.7}
  >
    <Text style={styles.btnText(name, activeTab)}>{name}</Text>
  </TouchableOpacity>
));

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  
  // 2. Use useCallback for the press handler to maintain referential identity
  const handlePress = useCallback((name) => {
    setActiveTab(name);
  }, [setActiveTab]);

  // 3. Extract renderItem to a function or use a stable reference
  const renderItem = useCallback(({ item }) => (
    <TabButton
      name={item}
      activeTab={activeTab}
      onHandleSearchType={handlePress}
    />
  ), [activeTab, handlePress]);

  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        // 4. Performance Flags for FlatList
        contentContainerStyle={{ columnGap: SIZES.small / 2 }}
        initialNumToRender={tabs?.length || 5} 
        scrollEnabled={tabs?.length > 3} // Only scroll if content exceeds screen
        removeClippedSubviews={false} // Better for small horizontal lists
      />
    </View>
  );
};

export default memo(Tabs);