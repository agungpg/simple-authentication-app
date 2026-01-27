import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./MainNavigation";
import AuthNavigation from "./AuthNavigation";
import { useContext } from "react";
import SplashScreen from "@components/SplashScreen";
import { AuthContext } from "app/provider/AuthProvider";

const AppNavigation = () => {
  const { isLogedIn, isLoading } = useContext(AuthContext);
  if(isLoading) return <SplashScreen />

  return (
    <NavigationContainer>
      {isLogedIn ? <MainNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default AppNavigation;
