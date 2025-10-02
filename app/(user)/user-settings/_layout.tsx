import React from "react";
import AppContainer from "@/layout/app-container";
import { colors } from "@/constants/Colours";
import BackButton from "@/components/back-button";
import { Stack } from "expo-router";

export default function UserSettingsLayout() {
  return (
    <AppContainer style={{ backgroundColor: colors.orange[50] }}>
      <BackButton />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.orange[50] },
        }}
      />
    </AppContainer>
  );
}
