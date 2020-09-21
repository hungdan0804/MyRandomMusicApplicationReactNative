import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback } from "react";
import * as Font from "expo-font";
import { StyleSheet, AppState } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "./src/components/SplashScreen";
import HomeScreen from "./src/features/Home/index";
import PlayerScreen from "./src/features/Player/index";
import myFont from "./src/config/font";
import colors from "./src/config/colors";
import { Provider, useSelector } from "react-redux";
import store from "./src/store";

const Stack = createStackNavigator();
const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Player"
        component={PlayerScreen}
        options={({ route }) => ({
          title: route.params.item.name,
          headerShown: true,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0.1,
            shadowOpacity: 0.1,
            borderBottomWidth: 0,
          },
          headerTintColor: colors.black,
        })}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (!fontLoaded) {
        loadFont();
      }
    }, 1500);
  }, []);

  async function loadFont() {
    await Font.loadAsync(myFont);
    setFontLoaded(true);
  }

  return (
    <Provider store={store}>
      {fontLoaded ? (
        <NavigationContainer>
          <StatusBar hidden />
          <MyStack />
        </NavigationContainer>
      ) : (
        <SplashScreen />
      )}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
