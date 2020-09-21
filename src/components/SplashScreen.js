import React from "react";
import { ImageBackground, StyleSheet, StatusBar, View } from "react-native";
import shareStyles from "../config/styles";

function SplashScreen(props) {
  return (
    <ImageBackground
      style={shareStyles.container}
      source={require("../assets/ss_background.jpg")}
    />
  );
}

const styles = StyleSheet.create({});

export default SplashScreen;
