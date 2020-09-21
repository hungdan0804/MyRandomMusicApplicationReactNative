import React from "react";
import { View, StyleSheet, Dimensions, Image, Animated } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("screen");
const BACKDROP_HEIGHT = height * 0.4;
const ITEM_SIZE = width * 0.6;

function BackDrop({ data, scrollXAnimated }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => String(index)}
        removeClippedSubviews={false}
        contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
        renderItem={({ item, index }) => {
          if (!item.albumArtUrl) return null;

          const translateX = scrollXAnimated.interpolate({
            inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
            outputRange: [0, width],
          });
          return (
            <Animated.View
              removeClippedSubviews={false}
              style={{
                position: "absolute",
                height,
                width: translateX,
                overflow: "hidden",
              }}
            >
              <Image
                source={{ uri: item.albumArtUrl }}
                style={{
                  width,
                  height: BACKDROP_HEIGHT,
                  position: "absolute",
                }}
              />
            </Animated.View>
          );
        }}
      />
      <LinearGradient
        colors={["rgba(0, 0, 0, 0)", "white"]}
        style={{
          height: BACKDROP_HEIGHT * 0.5,
          width,
          position: "absolute",
          bottom: 0,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width,
    height: BACKDROP_HEIGHT,
  },
  background: {
    width: width,
    height: BACKDROP_HEIGHT,
    resizeMode: "cover",
  },
});

export default BackDrop;
