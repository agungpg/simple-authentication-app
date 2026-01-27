import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import CustomTextInput from "@components/IconTextInput";
import Button from "@components/Button";
import React, { useCallback, useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { AuthParamList, AuthRoutes } from "../../navigations/AuthNavigation";
import Typography from "@components/Typography";
import { AuthContext } from "app/provider/AuthProvider";
import { useValidation } from "@validations/index";
import { LoginSchema } from "@validations/auth";

const initialFormState = {
  email: "",
  password: ""
};
const initialErrorState = {
  ...initialFormState,
  form: "",
};

const LoginScreen = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<AuthParamList>>();
  const { login } = useContext(AuthContext);
  const { validate, isLoading: isValidating } = useValidation();

  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState(initialErrorState);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = useCallback(
    (value: string) => setForm(prev => ({ ...prev, email: value })),
    []
  );

  const handlePasswordChange = useCallback(
    (value: string) => setForm(prev => ({ ...prev, password: value })),
    []
  );

  const onSignupPress = useCallback(() => {
    navigate(AuthRoutes.Registration);
  }, [navigate]);

  const validateFormData = useCallback(async () => {
    setErrors(initialErrorState);
    const validationResult = await validate(LoginSchema, form);
    if (validationResult) {
      setErrors(prev => ({ ...prev, ...validationResult }));
      return false;
    }
    return true;
  }, [form, validate]);

  const onLoginPress = useCallback(async () => {
    try {
      setIsLoading(true);
      const isValid = await validateFormData();
      if (!isValid) return;
      const {error} = await login(form);
      if (error) {
        throw new Error(error);
      }
    } catch (error) {
      const errMsg = error?.toString()?.replace("Error: ", "") 
                      ?? "Opps something went wrong";

      setErrors(prev => ({ ...prev, form: errMsg  }));
    } finally {
      setIsLoading(false);
    }
  }, [form, login, validateFormData]);

  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerSection}>
        <Typography variant="display">Welcome Back</Typography>
        <Typography variant="label">Hey! Good to see you again</Typography>
      </View>

      <View style={styles.formSection}>
        <CustomTextInput
          error={errors.email}
          leftIcon={{ name: "email", size: 28 }}
          value={form.email}
          onChangeText={handleEmailChange}
          placeholder="email..."
        />
        <CustomTextInput
          error={errors.password}
          leftIcon={{ name: "key", size: 28 }}
          value={form.password}
          onChangeText={handlePasswordChange}
          placeholder="password..."
          type="password"
        />
      </View>

      <View style={styles.actionsSection}>
        <View>
          {errors.form ? (
              <Typography variant="body" style={styles.formErrorMsg}>
                {errors.form}
              </Typography>
            ) : null}
          <Button
            isLoading={isValidating || isLoading}
            label="Login"
            onPress={onLoginPress}
          />
        </View>
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
  );
};

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
  },
  formErrorMsg: { 
    color: "#DC2626", 
    textAlign: "center", 
    paddingBottom: 8 
  }
})

export default LoginScreen;
