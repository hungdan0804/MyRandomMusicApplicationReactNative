import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  Animated,
} from "react-native";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { Button } from "react-native-paper";
import colors from "../../../config/colors";

const { width, height } = Dimensions.get("screen");

function MyCategoryRenderItem({ item, index, onClick }) {
  const categoryBackground = useRef(colors.category_color_1);
  const animatedItem = useRef(new Animated.Value(0)).current;
  const inputRange = [0, 1];
  const translateY = animatedItem.interpolate({
    inputRange,
    outputRange: [height, 1],
  });

  useEffect(() => {
    Animated.timing(animatedItem, {
      toValue: 1,
      duration: 700,
      delay: index * 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleOnItemClick = useCallback((item, index) => {
    onClick(item, index);
  }, []);

  const categoryColor = useCallback(() => {
    switch (index + 1) {
      case 1:
        categoryBackground.current = colors.category_color_1;
        break;
      case 2:
        categoryBackground.current = colors.category_color_2;
        break;
      case 3:
        categoryBackground.current = colors.category_color_3;
        break;
      case 4:
        categoryBackground.current = colors.category_color_4;
        break;
      case 5:
        categoryBackground.current = colors.category_color_5;
        break;
      case 6:
        categoryBackground.current = colors.category_color_6;
        break;
      case 7:
        categoryBackground.current = colors.category_color_7;
        break;
      case 8:
        categoryBackground.current = colors.category_color_8;
        break;
    }
  }, []);

  categoryColor();

  return (
    <Animated.View
      style={{
        ...styles.container,
        backgroundColor: categoryBackground.current,
        transform: [
          {
            translateY,
          },
        ],
      }}
    >
      <TouchableWithoutFeedback
        style={{
          ...styles.button,
        }}
        onPress={() => handleOnItemClick(item, index)}
      >
        <Image style={styles.thumbnail} source={item.thumbnail} />
        <View style={styles.absoluteView}>
          <Text style={styles.title}>{item.name}</Text>
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  thumbnail: {
    width: (width * 9) / 10 / 2,
    height: (width * 9) / 10 / 2,
    opacity: 0.7,
  },
  absoluteView: {
    position: "absolute",
    alignContent: "center",
  },
  title: {
    color: colors.white,
    fontFamily: "Righteous",
    fontSize: 25,
  },
});

export default MyCategoryRenderItem;
