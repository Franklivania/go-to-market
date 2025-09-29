export const FONT_FAMILIES = {
  regular: "Karla",
  italic: "Karla-Italic",
} as const;

export const FONT_WEIGHTS = {
  light: "200",
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
} as const;

export type FontFamily = typeof FONT_FAMILIES[keyof typeof FONT_FAMILIES];
export type FontWeight = typeof FONT_WEIGHTS[keyof typeof FONT_WEIGHTS];

// Helper function to get font style for italic variants
export const getFontStyle = (isItalic: boolean = false): {
  fontFamily: FontFamily;
  fontStyle?: "normal" | "italic";
} => ({
  fontFamily: isItalic ? FONT_FAMILIES.italic : FONT_FAMILIES.regular,
  fontStyle: isItalic ? "italic" : "normal",
});

// Scaling helpers
// Re-export the scaler so consumers can keep imports centralized from constants
export { getFontSize as getScaledFontSize } from "@/lib/font";

// Convenience helper to produce a text style using scaled size and optional weight/italic
// Deliberately avoids pulling react-native types here to keep this module lightweight
export const getScaledFont = (
  size: number,
  options?: { weight?: FontWeight; italic?: boolean }
) => {
  const { getFontSize } = require("@/lib/font");
  const scaled = getFontSize(size);
  const fontFamily = options?.italic ? FONT_FAMILIES.italic : FONT_FAMILIES.regular;
  return {
    fontSize: scaled,
    fontFamily,
    ...(options?.weight ? { fontWeight: options.weight } : {}),
    ...(options?.italic ? { fontStyle: "italic" as const } : {}),
  };
};