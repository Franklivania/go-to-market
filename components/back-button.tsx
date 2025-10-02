import Button from "./button";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StyleProp, ViewStyle } from "react-native";

export default function BackButton({ style }: { style?: StyleProp<ViewStyle> }) {
  return (
    <Button
      width="fit"
      variant="plain"
      size="icon"
      style={[{ alignSelf: "flex-start" }, style]}
      onPress={() => router.back()}
      hitSlop={20}
    >
      <Ionicons name="arrow-back-outline" size={32} />
    </Button>
  );
}
