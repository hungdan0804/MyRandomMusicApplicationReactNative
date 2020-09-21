import React from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  Animated,
  Text,
} from "react-native";
import colors from "../../../config/colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const { width, height } = Dimensions.get("screen");
const ITEM_SIZE = width * 0.6;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const SPACING = 10;
const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcons);

function MyBannerRenderItem({ item, index, scrollXAnimated }) {
  if (!item.albumArtUrl) {
    return (
      <View
        style={{
          width: SPACER_ITEM_SIZE,
        }}
      />
    );
  }

  const inputRange = [
    (index - 2) * ITEM_SIZE,
    (index - 1) * ITEM_SIZE,
    index * ITEM_SIZE,
  ];

  const translateY = scrollXAnimated.interpolate({
    inputRange,
    outputRange: [0, -50, 0],
  });

  const opacity = scrollXAnimated.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
  });

  return (
    <View style={{ width: ITEM_SIZE }}>
      <Animated.View
        style={{ ...styles.container, transform: [{ translateY }] }}
      >
        <Image style={styles.albumCover} source={{ uri: item.albumArtUrl }} />
        <Animated.Text style={{ ...styles.songName, opacity }}>
          {item.title}
        </Animated.Text>
        <Animated.Text style={{ ...styles.artist, opacity }}>
          {item.artist}
        </Animated.Text>
        <AnimatedIcon
          name="heart-circle"
          color={colors.red_light}
          size={48}
          style={{ opacity }}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height * 0.5,

    paddingTop: SPACING,
    marginHorizontal: SPACING,

    alignItems: "center",

    backgroundColor: colors.white,
    borderRadius: 15,
  },
  albumCover: {
    width: width * 0.5,
    height: height * 0.3,

    borderRadius: 15,
  },
  songName: {
    width: width * 0.5,
    height: height * 0.07,

    textAlign: "center",
    textAlignVertical: "center",

    fontFamily: "Righteous",
    fontSize: 25,
  },
  artist: {
    width: width * 0.5,
    height: height * 0.04,

    textAlign: "center",

    fontFamily: "Righteous",
    fontSize: 15,

    color: colors.opacity,
  },
});

export default MyBannerRenderItem;
