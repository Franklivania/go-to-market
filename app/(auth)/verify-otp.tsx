import React from "react";
import AuthLayout from "@/layout/auth-layout";
import FormInput from "@/components/form-input";
import Typography from "@/components/typography";
import { colors } from "@/constants/Colours";
import Button from "@/components/button";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function VerifyOTP() {
  let timer = "0:35";

  return (
    <AuthLayout>
      <Typography variant="h3" fontWeight={600} style={{ marginVertical: 42 }}>
        Validate your OTP
      </Typography>
      <FormInput
        type="number"
        variant="outline"
        color={colors.orange[600]}
        borderPosition="bottom"
        placeholder="Enter OTP"
        textColor={colors.black[300]}
        style={{ width: "100%" }}
      />

      <Button
        width="full"
        label="PROCEED"
        onPress={() => router.push("/(auth)/complete-onboarding")}
        style={{ marginTop: 24 }}
      />

      <View style={styles.display}>
        <Typography color={colors.orange[500]}>{timer} secs</Typography>
        <Button label="Resend OTP" variant="plain" onPress={() => {}} />
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  display: {
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 32,
  },
});
