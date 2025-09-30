import React, { useMemo, useState } from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
  NativeSyntheticEvent,
  TextInputContentSizeChangeEventData,
} from "react-native";

// Keep the same public types as FormInput for API parity
export type TextAreaVariant = "outline" | "plain" | "filled" | "underlined";
export type TextAreaRadius = "none" | "sm" | "md" | "lg" | "xl" | "full";
export type TextAreaSize = "xs" | "sm" | "md" | "lg" | "xl";
export type BorderPosition = "all" | "top" | "right" | "bottom" | "left";

interface TextAreaProps extends Omit<TextInputProps, "multiline"> {
  label?: string;
  variant?: TextAreaVariant;
  radius?: TextAreaRadius;
  size?: TextAreaSize;
  color?: string; // used for border/outline/filled tint
  backgroundColor?: string; // sets background directly
  textColor?: string; // sets text color
  borderPosition?: BorderPosition;
  error?: string;
  minRows?: number; // approximate rows via minHeight
  maxRows?: number; // clamp auto-grow height
}

const radiusMap: Record<TextAreaRadius, number> = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

const sizeMap: Record<TextAreaSize, { fontSize: number; paddingY: number }> = {
  xs: { fontSize: 12, paddingY: 6 },
  sm: { fontSize: 14, paddingY: 8 },
  md: { fontSize: 16, paddingY: 10 },
  lg: { fontSize: 18, paddingY: 12 },
  xl: { fontSize: 20, paddingY: 14 },
};

export default function TextArea({
  label,
  variant = "outline",
  radius = "md",
  size = "md",
  color = "#4A5568",
  backgroundColor,
  textColor,
  borderPosition = "all",
  error,
  minRows = 3,
  maxRows = 10,
  onContentSizeChange,
  style,
  ...props
}: TextAreaProps) {
  const { fontSize, paddingY } = sizeMap[size];
  const lineHeight = useMemo(() => Math.round(fontSize * 1.4), [fontSize]);
  const minHeight = useMemo(
    () => minRows * lineHeight + paddingY * 2,
    [minRows, lineHeight, paddingY]
  );
  const maxHeight = useMemo(
    () => maxRows * lineHeight + paddingY * 2,
    [maxRows, lineHeight, paddingY]
  );
  const [inputHeight, setInputHeight] = useState<number>(minHeight);

  const containerStyle: ViewStyle = {
    borderRadius: radiusMap[radius],
    backgroundColor: backgroundColor ?? (variant === "filled" ? color + "15" : "transparent"),
    paddingHorizontal: 8,
    paddingVertical: 2,
  };

  if (variant === "outline") {
    containerStyle.borderWidth = 1;
    containerStyle.borderColor = color;
  } else if (variant === "underlined") {
    containerStyle.borderBottomWidth = 1;
    containerStyle.borderBottomColor = color;
  }

  if (variant === "outline" && borderPosition !== "all") {
    containerStyle.borderWidth = 0;
    if (borderPosition === "top") containerStyle.borderTopWidth = 1;
    if (borderPosition === "bottom") containerStyle.borderBottomWidth = 1;
    if (borderPosition === "left") containerStyle.borderLeftWidth = 1;
    if (borderPosition === "right") containerStyle.borderRightWidth = 1;
  }

  const inputStyle: TextStyle = {
    paddingVertical: paddingY,
    fontSize,
    color: textColor ?? color,
    minHeight,
  };

  const handleContentSizeChange = (
    e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>
  ) => {
    const nextHeight = Math.min(Math.max(minHeight, e.nativeEvent.contentSize.height), maxHeight);
    setInputHeight(nextHeight);
    onContentSizeChange?.(e);
  };

  return (
    <View style={{ marginBottom: 12 }}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={containerStyle}>
        <TextInput
          style={[inputStyle, { height: inputHeight }, style as TextStyle]}
          multiline
          textAlignVertical="top"
          onContentSizeChange={handleContentSizeChange}
          {...props}
        />
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
