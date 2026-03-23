return (
  <View style={styles.container}>
    <TouchableOpacity style={styles.likeBtn} onPress={handleFavoriteToggle}>
      <Image
        source={isFavorite ? icons.heartFilled : icons.heartOutline}
        resizeMode="contain"
        style={[
          styles.likeBtnImage,
          { tintColor: isFavorite ? "red" : "#F37453" },
        ]}
      />
    </TouchableOpacity>

    <TouchableOpacity style={styles.applyBtn} onPress={handleFavoriteToggle}>
      <Text style={styles.applyBtnText}>
        {isFavorite ? "Remove from favorites" : "Add to favorites"}
      </Text>
    </TouchableOpacity>
  </View>
);