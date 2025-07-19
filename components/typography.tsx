import React from "react";
import { Text, TextProps, StyleProp, TextStyle } from "react-native";
import { useThemeContext } from "@/context/ThemeContext";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle"
  | "body"
  | "body2"
  | "caption"
  | "overline"
  | "button";

interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  color?: string;
  fontWeight?: TextStyle["fontWeight"];
  fontFamily?: string;
  italic?: boolean;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
  numberOfLines?: number;
  ellipsizeMode?: TextProps["ellipsizeMode"];
}

// This function returns the base style for each variant with variable Karla font family
const getVariantStyles = (theme: any): Record<TypographyVariant, TextStyle> => ({
  h1: {
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 40,
    fontFamily: "Karla",
    color: theme?.colors?.textPrimary,
  },
  h2: {
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 36,
    fontFamily: "Karla",
    color: theme?.colors?.textPrimary,
  },
  h3: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 32,
    fontFamily: "Karla",
    color: theme?.colors?.textPrimary,
  },
  h4: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 28,
    fontFamily: "Karla",
    color: theme?.colors?.textPrimary,
  },
  h5: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 24,
    fontFamily: "Karla",
    color: theme?.colors?.textPrimary,
  },
  h6: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 22,
    fontFamily: "Karla",
    color: theme?.colors?.textPrimary,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 20,
    fontFamily: "Karla",
    color: theme?.colors?.textSecondary,
  },
  body: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 22,
    fontFamily: "Karla",
    color: theme?.colors?.textPrimary,
  },
  body2: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    fontFamily: "Karla",
    color: theme?.colors?.textSecondary,
  },
  caption: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
    fontFamily: "Karla",
    color: theme?.colors?.textSecondary,
  },
  overline: {
    fontSize: 10,
    fontWeight: "500",
    lineHeight: 14,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    fontFamily: "Karla",
    color: theme?.colors?.textSecondary,
  },
  button: {
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 20,
    fontFamily: "Karla",
    color: theme?.colors?.buttonText || theme?.colors?.textPrimary,
  },
});

const Typography: React.FC<TypographyProps> = ({
  variant = "body",
  color,
  fontWeight,
  fontFamily,
  italic = false,
  style,
  children,
  numberOfLines,
  ellipsizeMode,
  ...rest
}) => {
  const theme = useThemeContext();
  const variantStyles = getVariantStyles(theme);

  const baseStyle = variantStyles[variant] || variantStyles.body;
  
  // Handle italic variants
  const fontFamilyToUse = fontFamily || (italic ? "Karla-Italic" : "Karla");
  
  const customStyle: TextStyle = {
    ...(color ? { color } : {}),
    ...(fontWeight ? { fontWeight } : {}),
    ...(fontFamilyToUse ? { fontFamily: fontFamilyToUse } : {}),
    ...(italic ? { fontStyle: "italic" } : {}),
  };

  return (
    <Text
      style={[baseStyle, customStyle, style]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default Typography;