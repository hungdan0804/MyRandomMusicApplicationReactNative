import React, { useCallback } from "react";
import { View, Dimensions, StyleSheet, Image, Text } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import colors from "../../../config/colors";
import { deleteFavoriteSong } from "../../../actions/favorite";

const { width, height } = Dimensions.get("screen");

function MyFavoriteRenderItem({ item, index }) {
  const dispatch = useDispatch();

  const handleDeleleItem = useCallback(() => {
    const action = deleteFavoriteSong(index);
    dispatch(action);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.bannerContainer}>
        <Image style={styles.thumbnail} source={{ uri: item.albumArtUrl }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.artist}>{item.artist}</Text>
      </View>
      <View style={styles.controlerContainer}>
        <View style={{ ...styles.button, backgroundColor: colors.red_light }}>
          <MaterialCommunityIcons
            name="play-circle"
            size={height * 0.05}
            color={colors.white}
          />
        </View>
        <View style={{ ...styles.button, backgroundColor: colors.gray }}>
          <TouchableWithoutFeedback onPress={handleDeleleItem}>
            <MaterialCommunityIcons
              name="delete"
              size={height * 0.05}
              color={colors.white}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={{ ...styles.button, backgroundColor: colors.blue_sky }}>
          <MaterialCommunityIcons
            name="share-variant"
            size={height * 0.05}
            color={colors.white}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.7,
    height: height * 0.3,

    backgroundColor: colors.white,

    borderRadius: 15,

    alignSelf: "center",
    flexDirection: "row",
  },
  bannerContainer: {
    flex: 2,

    padding: 5,
  },
  controlerContainer: {
    flex: 1,

    padding: 5,
  },
  thumbnail: {
    width: "100%",
    height: height * 0.2,

    borderRadius: 15,
  },
  title: {
    width: "100%",
    height: height * 0.05,

    fontFamily: "Righteous",
    fontSize: height * 0.023,

    textAlign: "center",
    textAlignVertical: "center",
    overflow: "hidden",
  },

  artist: {
    width: "100%",
    height: height * 0.04,

    fontFamily: "Righteous",
    fontSize: height * 0.015,
    color: colors.opacity,

    textAlign: "center",
    overflow: "hidden",
  },
  button: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 180,
    margin: 5,
  },
});

export default MyFavoriteRenderItem;
