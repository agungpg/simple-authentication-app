import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import CustomTextInput from "@components/IconTextInput";
import Button from "@components/Button";
import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import { AuthParamList, AuthRoutes } from "../../navigations/AuthNavigation";
import Typography from "@components/Typography";

const RegistrationScreen = () => {
    const [password, setPassword] = useState("")
    const { navigate } = useNavigation<NativeStackNavigationProp<AuthParamList>>();

    const onSignupPress = () => {
      navigate(AuthRoutes.Login)
    }
    
    return <View style={styles.screenContainer}>
      <View style={styles.headerSection}>
        <Typography variant="display">Sign Up</Typography>
        <Typography variant="label">Hello! let's join with us</Typography>
      </View>
      <View style={styles.formInputSection}>
        <CustomTextInput 
          leftIcon={{
            name: "person",
            size: 28,
          }}
          value={password} 
          onChangeText={setPassword} 
          placeholder="email..." 
        />  
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
        <CustomTextInput
          leftIcon={{
            name: "key",
            size: 28,
          }}
          value={password} 
          onChangeText={setPassword} 
          placeholder="confirm password..." 
          type="password" 
        />  
      </View>
      <View style={styles.actionsSection}>
        <Button label="Sign Up" onPress={onSignupPress} />
        <View style={styles.linkRow}>
          <Typography variant="caption">You already have an account?</Typography>
          <Button 
            onPress={onSignupPress}
            label="Sign In"  
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
  formInputSection: {
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

export default RegistrationScreen;
