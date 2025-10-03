import Typography from "@/components/typography";
import { Image } from "expo-image";
import { View, StyleSheet } from "react-native";
import { colors } from "@/constants/Colours";
import HapticPressable from "@/components/haptic-pressable";
import { Ionicons } from "@expo/vector-icons";

interface ScreenOneProps {
  onNext: () => void;
}

export default function ScreenOne({ onNext }: ScreenOneProps) {
  return (
    <View style={styles.container}>
      <Typography variant="h3" fontWeight={500} style={styles.text}>
        You do not have to go to the market, we will do it for you
      </Typography>

      <Image
        source={require("@/assets/images/splash-one.png")}
        contentFit="cover"
        style={styles.image}
      />

      <View style={styles.bottomContainer}>
        <View style={styles.progressContainer}>
          <View style={[styles.progressDot, styles.activeDot]} />
          <View style={[styles.progressDot]} />
        </View>

        <HapticPressable style={styles.nextButton} onPress={onNext}>
          <Typography style={styles.nextText}>Next</Typography>
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
    marginBottom: 30,
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
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.orange[300],
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    gap: 8,
  },
  nextText: {
    color: "white",
    fontWeight: "500",
  },
});
