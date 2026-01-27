import React, { useCallback, useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import CustomTextInput from "@components/IconTextInput";
import Button from "@components/Button";
import Typography from "@components/Typography";
import { AuthParamList, AuthRoutes } from "../../navigations/AuthNavigation";
import { AuthContext } from "app/provider/AuthProvider";
import { useValidation } from "app/validations";
import { SignUpSchema } from "app/validations/auth";

const formInitialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const errorInitialState = {
  ...formInitialState,
  form: "",
};

const RegistrationScreen = () => {
    const { navigate } = useNavigation<NativeStackNavigationProp<AuthParamList>>();
    const { signUp } = useContext(AuthContext);
    const { validate, isLoading: isValidating } = useValidation();

    const [form, setForm] = useState(formInitialState);
    const [errors, setErrors] = useState(errorInitialState);
    const [isLoading, setIsLoading] = useState(false);

    const handleNameChange = useCallback(
      (value: string) => setForm(prev => ({ ...prev, name: value })),
      []
    );

    const handleEmailChange = useCallback(
      (value: string) => setForm(prev => ({ ...prev, email: value })),
      []
    );

    const handlePasswordChange = useCallback(
      (value: string) => setForm(prev => ({ ...prev, password: value })),
      []
    );

    const handleConfirmPasswordChange = useCallback(
      (value: string) => setForm(prev => ({ ...prev, confirmPassword: value })),
      []
    );

    const validateFormData = useCallback(async () => {
      setErrors(errorInitialState);
      const res = await validate(SignUpSchema, form);
      if (res) {
        setErrors(prev => ({
          ...prev,
          ...res
        }));
        return false;
      }
      return true;
    }, [form, validate]);

    const onSignupPress = useCallback(async () => {
      try {
        setIsLoading(true);
        const isValid = await validateFormData();
        if (!isValid) return;

        const { error } = await signUp({
          name: form.name,
          email: form.email,
          password: form.password
        });
        if (error) {
          throw new Error(error);
        }

      } catch (error) {
        const errMsg = error?.toString()?.replaceAll("Error: ", "") 
                        ?? "Opps something went wrong";

        setErrors(prev => ({ ...prev, form: errMsg  }));
      } finally {
        setIsLoading(false);
      }
    }, [form, signUp, validateFormData]);

    const goToLogin = useCallback(() => navigate(AuthRoutes.Login), [navigate]);
    
    return <View style={styles.screenContainer}>
      <View style={styles.headerSection}>
        <Typography variant="display">Sign Up</Typography>
        <Typography variant="label">Hello! let's join with us</Typography>
      </View>
      <View style={styles.formInputSection}>
        <CustomTextInput 
          error={errors.name}
          leftIcon={{
            name: "person",
            size: 28,
          }}
          value={form.name} 
          onChangeText={handleNameChange} 
          placeholder="name..." 
        />  
        <CustomTextInput 
          error={errors.email}
          leftIcon={{
            name: "email",
            size: 28,
          }}
          value={form.email} 
          onChangeText={handleEmailChange} 
          placeholder="email..." 
        />  
        <CustomTextInput
          error={errors.password}
          leftIcon={{
            name: "key",
            size: 28,
          }}
          value={form.password} 
          onChangeText={handlePasswordChange} 
          placeholder="password..." 
          type="password" 
        />  
        <CustomTextInput
          error={errors.confirmPassword}
          leftIcon={{
            name: "key",
            size: 28,
          }}
          value={form.confirmPassword} 
          onChangeText={handleConfirmPasswordChange} 
          placeholder="confirm password..." 
          type="password" 
        />  
      </View>
      <View style={styles.actionsSection}>
        <View>
          {errors.form ? (
              <Typography variant="body" style={{ color: "#DC2626", textAlign: "center", paddingBottom: 8 }}>
                {errors.form}
              </Typography>
            ) : null}
          <Button isLoading={isValidating || isLoading} label="Sign Up" onPress={onSignupPress} />
        </View>
        <View style={styles.linkRow}>
          <Typography variant="caption">You already have an account?</Typography>
          <Button 
            onPress={goToLogin}
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
