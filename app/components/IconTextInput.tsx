import { memo, useCallback, useState } from "react";
import { StyleSheet, TextInput, View, TextInputProps, Text, TouchableOpacity } from "react-native";
import MaterialIcons, { MaterialIconsIconName } from "@react-native-vector-icons/material-icons";

interface CustomFormInputProps extends TextInputProps {
  error?: string;
  type?: "normal" | "password",
  leftIcon?: {
    name: MaterialIconsIconName;
    size: number;
    color?: string;
  }
}

const CustomTextInput = ({
  error = "",
  type = "normal",
  leftIcon,
  ...props
}: CustomFormInputProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const visibilityIcon = useCallback(() => {
    if(type !== "password") return null;

    return  <TouchableOpacity onPress={() => setIsVisible(prev => !prev)}>
            <MaterialIcons name={isVisible ? "visibility" : "visibility-off"} color="#000" size={24} />
        </TouchableOpacity>
  }, [type, isVisible])
  
  return <View style={styles.container}>
      <View style={[styles.textInputWrapper]}>
        {leftIcon && <MaterialIcons {...leftIcon} />}
        <TextInput 
          secureTextEntry={!isVisible && type === "password"} 
          style={styles.textInput} 
          {...props} 
        />
        {visibilityIcon()}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
}

const styles = StyleSheet.create({
  container: {

  },
  textInputWrapper: {
    height: 46,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    borderRadius: 23,
    paddingHorizontal: 12,
  },
  textInput: {
    height: 46,
    width: "100%",
    borderRadius: 23,
    paddingHorizontal: 10,
    paddingVertical: 2,
    flex: 1
  },
  errorText:{
    color: "#DC3545"
  }
})

export default memo(CustomTextInput)
