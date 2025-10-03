import { View, StyleSheet } from "react-native";
import React from "react";
import Typography from "@/components/typography";
import { Image } from "expo-image";
import { colors } from "@/constants/Colours";
import HapticPressable from "@/components/haptic-pressable";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

interface ScreenTwoProps {
  isNewUser: boolean;
  onBack: () => void;
}

export default function ScreenTwo({ isNewUser, onBack }: ScreenTwoProps) {
  const handleAction = () => {
    if (isNewUser) {
      router.push("/(auth)/register");
    } else {
      router.push("/(auth)/login");
    }
  };

  return (
    <View style={styles.container}>
      <Typography variant="h3" fontWeight={500} style={styles.text}>
        Get started by creating your account, so you can create your market list and make your first
        request.
      </Typography>

      <Image
        source={require("@/assets/images/splash-two.png")}
        contentFit="cover"
        style={styles.image}
      />

      <View style={styles.bottomContainer}>
        <View style={styles.progressContainer}>
          <View style={[styles.progressDot]} />
          <View style={[styles.progressDot, styles.activeDot]} />
        </View>

        <HapticPressable style={styles.actionButton} onPress={handleAction}>
          <Typography style={styles.actionText}>{isNewUser ? "Sign up" : "Continue"}</Typography>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </HapticPressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  text: {
    marginBottom: 50,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 40,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  progressContainer: {
    flexDirection: "row",
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.white[600],
  },
  activeDot: {
    backgroundColor: colors.orange[300],
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.orange[300],
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    gap: 8,
  },
  actionText: {
    color: "white",
    fontWeight: "500",
  },
});
