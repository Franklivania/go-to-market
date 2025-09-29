import { View, ImageBackground, Image, StyleSheet, ViewStyle } from "react-native";
import React from "react";
import { colors } from "@/constants/Colours";

type AuthLayoutProps = {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
};

export default function AuthLayout({ children, style }: AuthLayoutProps) {
  return (
    <ImageBackground
      source={require("@/assets/images/background.png")}
      style={{ flex: 1, backgroundColor: colors.white[100] }}
      resizeMode="cover"
    >
      <View
        style={[
          {
            flex: 1,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 16,
          },
          style,
        ]}
      >
        <Image source={require("@/assets/logo.png")} style={styles.logo} resizeMode="contain" />
        {children}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  logo: {
    position: "absolute",
    top: 78,
    width: 120,
    height: 120,
    alignSelf: "center",
  },
});
