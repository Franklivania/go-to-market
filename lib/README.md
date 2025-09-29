Font scaling utility

Overview

The font scaler in `lib/font.ts` normalizes text sizes across devices by scaling from a 375pt base width. It clamps scaling by device type (phone/tablet) and screen size bucket (small/medium/large) so text remains readable without oversizing.

Exports

- `getDeviceType()` → "phone" | "tablet"
- `getFontSize(size: number)` → number (scaled px)
- `adjustFontConfig(deviceType, sizeCategory, minScale, maxScale)` → void

Usage

Basic

```tsx
import { Text } from "react-native";
import { getFontSize } from "@/lib/font";

export function PriceTag() {
  return (
    <Text style={{ fontSize: getFontSize(16) }}>$19.99</Text>
  );
}
```

With line height

```tsx
<Text style={{ fontSize: getFontSize(14), lineHeight: getFontSize(20) }}>
  Scaled text
</Text>
```

Clamping configuration

```ts
import { adjustFontConfig } from "@/lib/font";

// Narrow phones: allow slightly smaller min scale
adjustFontConfig("phone", "small", 0.8, 1);
```

Notes

- Base width is 375; change `BASE_WIDTH` to retarget.
- Scaling ignores OS fontScale to keep design consistency.
- For typography variants, prefer the `Typography` component which already uses the scaler.


