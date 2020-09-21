import React, { useCallback, useState } from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../../config/colors";

const { width, height } = Dimensions.get("screen");

function HomeLeftTab({ myTab, onChange }) {
  const handleOnTabChange = useCallback((index) => {
    onChange(index);
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.tabContainer}
        onPress={() => handleOnTabChange(0)}
      >
        {myTab == 0 ? (
          <MaterialCommunityIcons
            name="home-circle"
            size={40}
            color={colors.white}
          />
        ) : (
          <MaterialCommunityIcons name="home" size={30} color={colors.white} />
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabContainer}
        onPress={() => handleOnTabChange(1)}
      >
        {myTab != 0 ? (
          <MaterialCommunityIcons
            name="heart-circle"
            size={40}
            color={colors.white}
          />
        ) : (
          <MaterialCommunityIcons name="heart" size={24} color={colors.white} />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: (height * 7) / 8,
    width: width / 10,
  },
  tabContainer: {
    height: (height - height / 8) / 2,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeLeftTab;
