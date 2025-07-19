import { colors } from './Colours';
import { FONT_FAMILIES } from './Fonts';

export type ThemeFonts = {
  regular: string;
  italic: string;
  semibold: string;
};

export type ThemeColors = {
  primary: string;
  background: string;
  text: string;
  card: string;
  border: string;
};

export type Themes = {
  light: ThemeColors & { fonts: ThemeFonts };
  dark: ThemeColors & { fonts: ThemeFonts };
};

export const themes: Themes = {
  light: {
    primary: colors.orange[500], // Primary color for buttons, accents, etc.
    background: colors.white[50], // Light background
    text: colors.black[300], // Dark text for light theme
    card: colors.white[200], // Slightly darker for cards
    border: colors.white[400], // Light border
    fonts: {
      regular: FONT_FAMILIES.regular,
      italic: FONT_FAMILIES.italic,
      semibold: FONT_FAMILIES.regular, // Adjust if you have a semibold font file
    },
  },
  dark: {
    primary: colors.orange[500], // Same primary color for consistency
    background: colors.black[600], // Dark background
    text: colors.white[300], // Light text for dark theme
    card: colors.black[400], // Slightly lighter for cards
    border: colors.black[200], // Dark border
    fonts: {
      regular: FONT_FAMILIES.regular,
      italic: FONT_FAMILIES.italic,
      semibold: FONT_FAMILIES.regular, // Adjust if you have a semibold font file
    },
  },
};