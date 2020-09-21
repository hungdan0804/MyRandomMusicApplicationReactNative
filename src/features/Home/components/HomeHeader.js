import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import string from "../../../config/string";
import colors from "../../../config/colors";

const { width, height } = Dimensions.get("screen");

function HomeHeader(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> {string.App_Name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height / 8,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Righteous",
    color: colors.white,
    fontSize: 30,
  },
});

export default HomeHeader;
