Fonts: families, weights, and scaling

Overview

This module centralizes font families and weights and provides convenience helpers to apply consistent, scaled typography across the app. It ships with Karla by default, but the families are intentionally swappable so this utility can be reused across different applications with different fonts.

Exports

- `FONT_FAMILIES` → `{ regular: "Karla", italic: "Karla-Italic" }`
- `FONT_WEIGHTS` → `{ light: "200", regular: "400", medium: "500", semibold: "600", bold: "700", extrabold: "800" }`
- `getFontStyle(isItalic?: boolean)` → `{ fontFamily, fontStyle }`
- `getScaledFontSize(size: number)` → number (alias of `lib/font.getFontSize`)
- `getScaledFont(size: number, options?: { weight?: FontWeight; italic?: boolean })` → style object

Basic usage

```tsx
import { Text } from "react-native";
import { FONT_FAMILIES, FONT_WEIGHTS, getScaledFont } from "@/constants/Fonts";

export function Headline() {
  return (
    <Text
      style={{
        ...getScaledFont(24, { weight: FONT_WEIGHTS.bold }),
        color: "#111",
      }}
    >
      Welcome
    </Text>
  );
}
```

Italic text

```tsx
import { getScaledFont } from "@/constants/Fonts";

<Text style={getScaledFont(16, { italic: true })}>Emphasis</Text>
```

Just the scaled size

```tsx
import { getScaledFontSize } from "@/constants/Fonts";

<Text style={{ fontSize: getScaledFontSize(14) }}>Body</Text>
```

Typography component

Prefer the `components/typography.tsx` component for app text. It already applies scaled `fontSize` and `lineHeight`, sets `fontFamily` to Karla, and supports `variant`, `italic`, `fontWeight`, and color overrides.

Loading fonts

Ensure your chosen fonts are loaded at app start (e.g., with Expo Font in your app root). The family names used in styles must exactly match the postscript names you load.

Replacing the font families (reusable across apps)

You can replace Karla with any font family (e.g., Inter, Roboto, SF Pro) without changing callers:

```ts
// constants/Fonts.ts
export const FONT_FAMILIES = {
  regular: "Inter-Regular", // or "Inter" depending on how you loaded it
  italic: "Inter-Italic",
} as const;
```

- Keep the `regular` and `italic` keys stable; only change the values to your loaded font family names.
- `Typography` and the helpers (`getScaledFont`, `getScaledFontSize`, `getFontStyle`) will automatically use the new families.

Font loading example (Expo)

```tsx
import * as Font from "expo-font";

await Font.loadAsync({
  "Inter-Regular": require("@/assets/fonts/Inter-Regular.ttf"),
  "Inter-Italic": require("@/assets/fonts/Inter-Italic.ttf"),
});
```

Tips

- Ensure the family names you provide in `FONT_FAMILIES` match what you load.
- If your font uses weight-specific families (e.g., "Inter-Bold"), continue to rely on `fontWeight` values; React Native will map to the correct face if available.


