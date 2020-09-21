import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import MyFavoriteRenderItem from "./MyFavoriteRenderItem";

const { width, height } = Dimensions.get("screen");

function HomeFavorite({ myTab }) {
  const myFavoList = useSelector((state) => state.favorite.list);

  return (
    <View style={styles.container}>
      <FlatList
        data={myFavoList}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item, index }) => {
          return <MyFavoriteRenderItem item={item} index={index} />; //animation each item
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: (width * 9) / 10,
    height: (height * 7) / 8,
  },
});

export default HomeFavorite;
