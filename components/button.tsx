import { colors } from "@/constants/Colours";
import React from "react";
import { ActivityIndicator, GestureResponderEvent } from "react-native";
import styled from "styled-components/native";

type BorderRadiusType = "flat" | "curved" | "rounded";
type ButtonSize = "sm" | "md" | "base" | "lg" | "xl";

interface ButtonProps {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "accent" | "outline";
  width?: "full" | "fit";
  borderRadius?: BorderRadiusType;
  size?: ButtonSize;
}

const getBorderRadius = (borderRadius?: BorderRadiusType) => {
  switch (borderRadius) {
    case "flat":
      return "0px";
    case "curved":
      return "4px";
    case "rounded":
    default:
      return "20px";
  }
};

const sizeStyles = {
  sm: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    fontSize: 12,
  },
  md: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    fontSize: 14,
  },
  base: {
    paddingVertical: 9,
    paddingHorizontal: 25,
    fontSize: 15,
  },
  lg: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    fontSize: 17,
  },
  xl: {
    paddingVertical: 16,
    paddingHorizontal: 40,
    fontSize: 20,
  },
};

const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  loading = false,
  disabled = false,
  variant = "primary",
  width = "fit",
  borderRadius = "curved",
  size = "base",
}) => {
  return (
    <ButtonWrapper
      onPress={onPress}
      disabled={disabled || loading}
      variant={variant}
      width={width}
      borderRadius={borderRadius}
      size={size}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={colors.orange[50]} />
      ) : (
        <ButtonText variant={variant} size={size}>
          {label}
        </ButtonText>
      )}
    </ButtonWrapper>
  );
};

export default Button;

const ButtonWrapper = styled.TouchableOpacity<{
  disabled?: boolean;
  variant: string;
  width: string;
  borderRadius?: BorderRadiusType;
  size?: ButtonSize;
}>`
  background-color: ${({ disabled, variant }) =>
    disabled
      ? colors.orange[50]
      : variant === "primary"
        ? colors.orange[300]
        : variant === "accent"
          ? colors.yellow[300]
          : variant === "outline"
            ? "transparent"
            : colors.orange[300]};
  border: ${({ variant }) =>
    variant === "outline" ? `1px solid ${colors.orange[500]}` : "none"};
  padding-vertical: ${({ size }) =>
    sizeStyles[size || "base"].paddingVertical}px;
  padding-horizontal: ${({ size }) =>
    sizeStyles[size || "base"].paddingHorizontal}px;
  border-radius: ${({ borderRadius }) => getBorderRadius(borderRadius)};
  align-items: center;
  justify-content: center;
  width: ${({ width }) => (width === "full" ? "100%" : "auto")};
  align-self: ${({ width }) => (width === "full" ? "stretch" : "center")};
`;

const ButtonText = styled.Text<{ variant: string; size?: ButtonSize }>`
  color: ${({ variant }) =>
    variant === "outline"
      ? colors.orange[500]
      : variant === "accent"
        ? colors.black[300]
        : colors.white[100]};
  font-size: ${({ size }) => sizeStyles[size || "base"].fontSize}px;
  font-weight: 500;
`;
