import { View, StyleSheet } from "react-native";
import React from "react";
import { colors } from "@/constants/Colours";
import { Image } from "expo-image";
import HapticPressable from "@/components/haptic-pressable";
import Typography from "@/components/typography";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function UserSettings() {
  let user = "Franklin";

  return (
    <View style={{ width: "100%", alignSelf: "center", alignItems: "center", marginTop: 120 }}>
      <Image source={require("@/assets/images/avatar.webp")} style={{ width: 150, height: 150 }} />

      <View
        style={{ alignItems: "center", justifyContent: "center", marginTop: 6, marginBottom: 24 }}
      >
        <Typography variant="h3" fontWeight={500}>
          Hi, {user}
        </Typography>
        <Typography>Do you want to make some changes?</Typography>
      </View>

      <View
        style={{
          width: "100%",
          paddingVertical: 24,
          paddingHorizontal: 12,
          backgroundColor: colors.white[100],
          borderRadius: 12,
          rowGap: 12,
        }}
      >
        <HapticPressable
          style={styles.button}
          onPress={() => router.push("/user-settings/update-profile")}
        >
          <Typography>Update Profile</Typography>
          <Ionicons name="person-circle-outline" size={24} />
        </HapticPressable>
        <HapticPressable
          style={styles.button}
          onPress={() => router.push("/user-settings/change-password")}
        >
          <Typography>Change password</Typography>
          <Ionicons name="lock-closed-outline" size={24} />
        </HapticPressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderWidth: 1,
    borderColor: colors.white[600],
    borderRadius: 12,
  },
});
