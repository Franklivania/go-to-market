import React, { useEffect, useState } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreens from "@/ui/splash-screens";
import { Redirect } from "expo-router";

export default function Index() {
  const [showSplash, setShowSplash] = useState<boolean | null>(null);
  const [isNewUser, setIsNewUser] = useState(true);

  useEffect(() => {
    const checkSplashPreference = async () => {
      try {
        // Check if splash screens are disabled
        const splashDisabled = await AsyncStorage.getItem("splashScreensDisabled");
        const shouldShowSplash = splashDisabled === null || JSON.parse(splashDisabled) === false;

        // Check if user is new (no stored user data)
        const userData = await AsyncStorage.getItem("userData");
        const userIsNew = userData === null;

        setShowSplash(shouldShowSplash);
        setIsNewUser(userIsNew);
      } catch (error) {
        console.error("Error checking splash preference:", error);
        setShowSplash(true); // Default to showing splash on error
      }
    };

    checkSplashPreference();
  }, []);

  // Show loading while checking preferences
  if (showSplash === null) {
    return <View style={{ flex: 1, backgroundColor: "white" }} />;
  }

  // Show splash screens if enabled
  if (showSplash) {
    return <SplashScreens isNewUser={isNewUser} />;
  }

  // Redirect to login if splash screens are disabled
  return <Redirect href={"/(auth)/login"} />;
}
