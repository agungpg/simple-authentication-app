import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle, StyleProp, TouchableOpacityProps, TextStyle } from "react-native";
import Typography, { TypographyVariant } from "./Typography";

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  isLoading?: boolean;
  disabled?: boolean;
  backgroundColor?: string;
  textColor?: string;
  textVariant?: TypographyVariant;
  outline?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Button = ({
  label,
  isLoading = false,
  disabled = false,
  backgroundColor = "#DA478D",
  textColor = "#fff",
  textVariant = "label",
  outline = false,
  style,
  ...props
}: ButtonProps) => {
  const buttonColor = disabled ? "#C4C4C4" : backgroundColor;
  const borderStyle = outline ? { borderWidth: 1.5, borderColor: textColor } : null;

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      disabled={disabled}
      style={[
        styles.button,
        { backgroundColor: outline ? "transparent" : buttonColor },
        borderStyle,
        style,
      ]}
      {...props}
    >
      <Typography variant={textVariant} color={textColor} >
        {isLoading ? "Loading..." : label}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
});

export type { ButtonProps };
export default Button;
