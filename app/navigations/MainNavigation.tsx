import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "@screens/home";

export type HomeParamList = {
  Home: undefined;
};

export const MainRoutes = {
  Home: "Home",
} as const;

const Stack = createNativeStackNavigator<HomeParamList>();

const MainNavigation = () => (
  <Stack.Navigator initialRouteName={MainRoutes.Home} screenOptions={{ headerShown: false }}>
    <Stack.Screen name={MainRoutes.Home} component={HomeScreen} />
  </Stack.Navigator>
);

export default MainNavigation;
