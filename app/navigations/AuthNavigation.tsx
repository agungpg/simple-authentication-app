import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "@screens/login";
import RegistrationScreen from "@screens/registration";

export type AuthParamList = {
  Login: undefined;
  Registration: undefined;
};

export const AuthRoutes = {
  Login: "Login",
  Registration: "Registration",
} as const;

const Stack = createNativeStackNavigator<AuthParamList>();

const AuthNavigation = () => (
  <Stack.Navigator initialRouteName={AuthRoutes.Login} screenOptions={{ headerShown: false }}>
    <Stack.Screen name={AuthRoutes.Login} component={LoginScreen} />
    <Stack.Screen name={AuthRoutes.Registration} component={RegistrationScreen} />
  </Stack.Navigator>
);

export default AuthNavigation;
