import React from "react";
import { Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";
import * as Haptics from "expo-haptics";

interface HapticPressableProps extends PressableProps {
  hapticType?: "light" | "medium" | "heavy" | "success" | "warning" | "error";
  style?: StyleProp<ViewStyle> | ((state: { pressed: boolean }) => StyleProp<ViewStyle>);
}

const HapticPressable: React.FC<HapticPressableProps> = ({
  hapticType = "light",
  onPress,
  style,
  children,
  ...rest
}) => {
  const triggerHaptic = async () => {
    switch (hapticType) {
      case "light":
        await Haptics.selectionAsync();
        break;
      case "medium":
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        break;
      case "heavy":
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        break;
      case "success":
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        break;
      case "warning":
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        break;
      case "error":
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        break;
    }
  };

  return (
    <Pressable
      {...rest}
      style={(state) => [
        typeof style === "function" ? style(state) : style,
        { opacity: state.pressed ? 0.6 : 1 },
      ]}
      onPress={async (e) => {
        await triggerHaptic();
        onPress?.(e);
      }}
    >
      {children}
    </Pressable>
  );
};

export default HapticPressable;
