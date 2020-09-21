import React, { useCallback, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import colors from "../../../config/colors";
import categoryData from "../../../config/categoryData";
import MyCategoryRenderItem from "../components/MyCategoryRenderItem";

const { width, height } = Dimensions.get("screen");

function HomeCategory({ myTab, onClick }) {
  const [data, setData] = useState(categoryData);

  const handleOnclickCategoryItem = useCallback((item, index) => {
    onClick(item, index);
  }, []);

  return (
    <View style={{ ...styles.container, opacity: myTab != 0 ? 0 : 1 }}>
      <FlatList
        data={data}
        key={(item, index) => item.id}
        renderItem={({ item, index }) => {
          return (
            <MyCategoryRenderItem
              item={item}
              index={index}
              onClick={handleOnclickCategoryItem}
            />
          ); //animation each item
        }}
        numColumns={2}
        horizontal={false}
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

export default HomeCategory;
