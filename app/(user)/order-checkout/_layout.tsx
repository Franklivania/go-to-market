import React from "react";
import AppLayout from "@/layout/app-layout";
import { Stack } from "expo-router";
import { colors } from "@/constants/Colours";
import BackButton from "@/components/back-button";

export default function OrderCheckoutLayout() {
  return (
    <AppLayout>
      <BackButton />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.white[100] },
        }}
      />
    </AppLayout>
  );
}
