import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  ImageBackground,
  AppState,
} from "react-native";
import shareStyles from "../../config/styles";
import HomeHeader from "../Home/components/HomeHeader";
import HomeLeftTab from "../Home/components/HomeLeftTab";
import HomeCategory from "../Home/components/HomeCategory";
import HomeFavorite from "../Home/components/HomeFavorite";
import { useSelector } from "react-redux";
import HomePlayer from "./components/HomePlayer";

function index({ navigation }) {
  const [tab, setTab] = useState(0);
  const [appState, setAppState] = useState(AppState.currentState);

  const playbackInstance = useSelector(
    (state) => state.player.playbackInstance
  );

  const handleOnTabChange = useCallback((curTab) => {
    setTab(curTab);
  }, []);
  const handleCategoryItemChange = useCallback((item, index) => {
    navigation.navigate("Player", { item });
  }, []);

  const handleAppChange = useCallback(async (nextAppState) => {
    if (nextAppState === "inactive") {
      if (playbackInstance != null) {
        await playbackInstance.unloadAsync();
        playbackInstance.setOnPlaybackStatusUpdate(null);
        console.log("App_close");
      }
    }
  }, []);

  useEffect(() => {
    AppState.addEventListener("change", handleAppChange);
    return () => {
      AppState.removeEventListener("change", handleAppChange);
      console.log("App_close");
    };
  }, []);

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/background.png")}
    >
      <StatusBar hidden />
      <HomeHeader />
      <View style={styles.mainContent}>
        <HomeLeftTab myTab={tab} onChange={handleOnTabChange} />
        {/* {tab == 0 ? <HomeCategory /> : <HomeFavorite />} */}
        <HomeCategory myTab={tab} onClick={handleCategoryItemChange} />
        <HomeFavorite myTab={tab} />
      </View>
      {playbackInstance && <HomePlayer />}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",

    justifyContent: "flex-end",
  },
  mainContent: {
    flexDirection: "row",
  },
});

export default index;
