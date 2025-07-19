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