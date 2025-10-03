import HapticPressable from "@/components/haptic-pressable";
import { colors } from "@/constants/Colours";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function CreateListButton() {
  return (
    <HapticPressable
      style={{
        position: "absolute",
        bottom: 58,
        right: 16,
        backgroundColor: colors.orange[400],
        padding: 12,
        borderRadius: 99999,
        alignItems: "center",
      }}
      onPress={() => router.push("/(user)/create-market-list")}
    >
      <Ionicons name="add-circle-outline" size={36} style={{ color: colors.white[100] }} />
    </HapticPressable>
  );
}
