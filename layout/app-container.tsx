import { colors } from "@/constants/Colours";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface AppContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function AppContainer({ children, style }: AppContainerProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.inner, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white[100],
  },
  inner: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: colors.white[100],
  },
});
