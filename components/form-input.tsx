import React, { useState } from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type FormInputVariant = "outline" | "plain" | "filled" | "underlined";
export type FormInputRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";
export type FormInputSize = "xs" | "sm" | "md" | "lg" | "xl";
export type FormInputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "phone"
  | "url"
  | "search"
  | "multiline"
  | "numeric";
export type BorderPosition = "all" | "top" | "right" | "bottom" | "left";

interface FormInputProps extends TextInputProps {
  label?: string;
  variant?: FormInputVariant;
  radius?: FormInputRadius;
  size?: FormInputSize;
  type?: FormInputType;
  color?: string; // used for border/outline/filled tint
  backgroundColor?: string; // NEW - sets background directly
  textColor?: string; // NEW - sets text color
  borderPosition?: BorderPosition;
  error?: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
}

const radiusMap: Record<FormInputRadius, number> = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

const sizeMap: Record<FormInputSize, { fontSize: number; padding: number }> = {
  xs: { fontSize: 12, padding: 6 },
  sm: { fontSize: 14, padding: 8 },
  md: { fontSize: 16, padding: 10 },
  lg: { fontSize: 18, padding: 12 },
  xl: { fontSize: 20, padding: 14 },
};

export default function FormInput({
  label,
  variant = "outline",
  radius = "md",
  size = "md",
  type = "text",
  color = "#4A5568",
  backgroundColor,
  textColor,
  borderPosition = "all",
  error,
  leftIcon,
  rightIcon,
  secureTextEntry,
  ...props
}: FormInputProps) {
  const [hidden, setHidden] = useState(type === "password");

  const { fontSize, padding } = sizeMap[size];

  // dynamic container style
  const containerStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radiusMap[radius],
    paddingHorizontal: 8,
    backgroundColor: backgroundColor ?? (variant === "filled" ? color + "15" : "transparent"),
  };

  if (variant === "outline") {
    containerStyle.borderWidth = 1;
    containerStyle.borderColor = color;
  } else if (variant === "underlined") {
    containerStyle.borderBottomWidth = 1;
    containerStyle.borderBottomColor = color;
  }

  // border position logic
  if (variant === "outline" && borderPosition !== "all") {
    containerStyle.borderWidth = 0;
    if (borderPosition === "top") containerStyle.borderTopWidth = 1;
    if (borderPosition === "bottom") containerStyle.borderBottomWidth = 1;
    if (borderPosition === "left") containerStyle.borderLeftWidth = 1;
    if (borderPosition === "right") containerStyle.borderRightWidth = 1;
  }

  const inputStyle: TextStyle = {
    flex: 1,
    paddingVertical: padding,
    fontSize,
    color: textColor ?? color,
  };

  // decide keyboard type
  let keyboardType: TextInputProps["keyboardType"] = "default";
  if (type === "email") keyboardType = "email-address";
  if (type === "number" || type === "numeric") keyboardType = "numeric";
  if (type === "phone") keyboardType = "phone-pad";
  if (type === "url") keyboardType = "url";
  if (type === "search") keyboardType = "default";

  return (
    <View style={{ marginBottom: 12 }}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={containerStyle}>
        {leftIcon && <View style={{ marginRight: 6 }}>{leftIcon}</View>}
        <TextInput
          style={inputStyle}
          keyboardType={keyboardType}
          secureTextEntry={hidden}
          multiline={type === "multiline"}
          {...props}
        />
        {type === "password" && (
          <Ionicons
            name={hidden ? "eye-off" : "eye"}
            size={20}
            color={textColor ?? color}
            onPress={() => setHidden(!hidden)}
            style={{ paddingHorizontal: 6 }}
          />
        )}
        {rightIcon && <View style={{ marginLeft: -24 }}>{rightIcon}</View>}
      </View>

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 4,
    color: "#4A5568",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});
