import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import CustomTextInput from "@components/IconTextInput";
import Button from "@components/Button";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native"
import { AuthParamList, AuthRoutes } from "../../navigations/AuthNavigation";
import Typography from "@components/Typography";

const LoginScreen = () => {
    const [password, setPassword] = useState("")
    const { navigate } = useNavigation<NativeStackNavigationProp<AuthParamList>>();

    const onSignupPress = () => {
      navigate(AuthRoutes.Registration)
    }

    const onSignInPress = () => {
      // navigate(MainRoutes.Home)
    }

    return <View style={styles.screenContainer}>
      <View style={styles.headerSection}>
        <Typography variant="display">Welcome Back</Typography>
        <Typography variant="label">Hey! Good to see you again</Typography>
      </View>
      <View style={styles.formSection}>
        <CustomTextInput 
          leftIcon={{
            name: "email",
            size: 28,
          }}
          value={password} 
          onChangeText={setPassword} 
          placeholder="email..." 
        />  
        <CustomTextInput
          leftIcon={{
            name: "key",
            size: 28,
          }}
          value={password} 
          onChangeText={setPassword} 
          placeholder="password..." 
          type="password" 
        />  
      </View>
      <View style={styles.actionsSection}>
        <Button label="Sign In" onPress={onSignInPress} />
        <View style={styles.linkRow}>
          <Typography variant="caption">Don't have an account?</Typography>
          <Button 
            onPress={onSignupPress}
            label="Sign up"  
            backgroundColor="transparent" 
            style={styles.linkButton}
            textVariant="caption"
            textColor="#363F47"
          />
        </View>
      </View>
    </View>
}

const styles = StyleSheet.create({
  screenContainer: {
    padding: 28,
    backgroundColor: "#E6EBF0",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    paddingTop: "18%"
  },
  headerSection: {
    gap: 12
  },
  formSection: {
    gap: 12
  },
  actionsSection: {
    gap: 32
  },
  linkRow:{
    display: "flex",
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  linkButton: {
    height: "auto",
    paddingHorizontal: 0,
  }
})

export default LoginScreen;
