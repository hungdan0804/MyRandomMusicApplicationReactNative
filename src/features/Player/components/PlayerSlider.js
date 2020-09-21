import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import Slider from "react-native-slider";
import colors from "../../../config/colors";

const { width, height } = Dimensions.get("screen");

function pad(n, width, z = 0) {
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const minutesAndSeconds = (position) => [
  pad(Math.floor((position * 0.001) / 60), 2),
  pad(Math.floor(position * 0.001) % 60, 2),
];

function PlayerSlider({
  trackLength,
  currentPosition,
  onSeek,
  onSlidingStart,
}) {
  const elapsed = minutesAndSeconds(currentPosition);
  const remaining = minutesAndSeconds(trackLength - currentPosition);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.text}>{elapsed[0] + ":" + elapsed[1]}</Text>
        <Text style={{ flex: 1 }}></Text>
        <Text style={[styles.text, { alignSelf: "flex-end" }]}>
          {trackLength > 1 && "-" + remaining[0] + ":" + remaining[1]}
        </Text>
      </View>
      <Slider
        maximumValue={Math.max(trackLength, 1, currentPosition + 1)}
        onSlidingStart={onSlidingStart}
        onSlidingComplete={(time) => onSeek(time)}
        value={currentPosition}
        minimumTrackTintColor={colors.blue_sky}
        maximumTrackTintColor={colors.gray}
        thumbStyle={styles.thumb}
        trackStyle={styles.track}
        style={styles.slider}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height * 0.1,

    padding: 10 * 2,

    backgroundColor: colors.white,
    justifyContent: "center",
  },
  text: {
    fontFamily: "Righteous",
    fontSize: 14,
  },

  track: {
    height: 3,

    borderRadius: 1,
  },
  thumb: {
    width: 15,
    height: 15,

    borderRadius: 15,

    backgroundColor: colors.blue_sky,
  },
  slider: {
    flex: 1,
  },
});

export default PlayerSlider;
