import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from "./MainNavigation";
import AuthNavigation from "./AuthNavigation";
import { useContext } from "react";
import { AuthContext } from "app/provider/AuthProvider";

const AppNavigation = () => {
  const {isLogedIn} = useContext(AuthContext);

  return (
    <NavigationContainer>
      {isLogedIn ? <MainNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default AppNavigation;
