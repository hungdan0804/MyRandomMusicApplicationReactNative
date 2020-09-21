import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../../config/colors";

const { width, height } = Dimensions.get("screen");

function PlayerControler({
  handlePlayPause,
  handleNextTrack,
  handlePreviousTrack,
  paused,
}) {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        style={{ margin: 5 }}
        onPress={handlePreviousTrack}
      >
        <MaterialCommunityIcons
          name="skip-previous"
          size={40}
          color={colors.gray}
        />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback style={{ margin: 5 }} onPress={handlePlayPause}>
        {paused ? (
          <MaterialCommunityIcons
            name="play-circle"
            size={80}
            color={colors.gray}
          />
        ) : (
          <MaterialCommunityIcons
            name="pause-circle"
            size={80}
            color={colors.gray}
          />
        )}
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback style={{ margin: 5 }} onPress={handleNextTrack}>
        <MaterialCommunityIcons
          name="skip-next"
          size={40}
          color={colors.gray}
        />
      </TouchableWithoutFeedback>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width,
    height: height * 0.1875,

    backgroundColor: colors.white,

    alignItems: "center",
    justifyContent: "center",

    flexDirection: "row",
  },
});

export default PlayerControler;
