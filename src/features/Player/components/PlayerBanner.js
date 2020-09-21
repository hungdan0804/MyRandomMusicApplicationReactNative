import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { View, StyleSheet, Dimensions, Animated } from "react-native";
import colors from "../../../config/colors";
import MyBannerRenderItem from "../components/MyBannerRenderItem";
import BackDrop from "../components/BackDrop";
const { width, height } = Dimensions.get("screen");

const ITEM_SIZE = width * 0.6;

function PlayerBanner({
  data,
  onItemChange,
  selectedTrack,
  listBanner,
  insertFavoriteTrack,
}) {
  const [tracks, setTracks] = useState([]);
  const scrollXAnimated = useRef(new Animated.Value(0)).current;
  const currentIndex = useRef(selectedTrack);

  useEffect(() => {
    setTracks([{ id: "left-spacer" }, ...data, { id: "right-spacer" }]);
  }, []);

  useEffect(() => {
    onItemChange(currentIndex.current);
  }, [currentIndex.current]);

  return (
    <View style={styles.container}>
      <BackDrop data={tracks} scrollXAnimated={scrollXAnimated} />
      <Animated.FlatList
        ref={(ref) => {
          listBanner.current = ref;
        }}
        getItemLayout={(data, index) => {
          return { length: ITEM_SIZE, index, offset: ITEM_SIZE * index };
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={tracks}
        keyExtractor={(item, index) => String(index)}
        snapToInterval={ITEM_SIZE}
        decelerationRate={10}
        bounces={false}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          return (
            <MyBannerRenderItem
              item={item}
              index={index}
              scrollXAnimated={scrollXAnimated}
              onFavorite={insertFavoriteTrack}
            />
          );
        }}
        contentContainerStyle={{
          alignItems: "flex-end",
          paddingBottom: 10 * 2,
        }}
        onScroll={(e) => {
          const curX = e.nativeEvent.contentOffset.x;

          currentIndex.current = Math.round(curX / ITEM_SIZE);
          scrollXAnimated.setValue(curX);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height: height * 0.65,

    backgroundColor: colors.white,
  },
});

export default PlayerBanner;
