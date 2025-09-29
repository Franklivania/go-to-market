import { View } from "react-native";
import React from "react";
import { colors } from "@/constants/Colours";
import Typography from "@/components/typography";
import FormInput from "@/components/form-input";
import Button from "@/components/button";
import { router } from "expo-router";
import AuthLayout from "@/layout/auth-layout";

export default function Register() {
  return (
    <AuthLayout>
      <Typography variant="h2" fontWeight={400} style={{ marginVertical: 12 }}>
        Create an account
      </Typography>

      <View
        style={{
          width: "100%",
          // paddingHorizontal: 8,
        }}
      >
        <FormInput
          type="text"
          variant="outline"
          borderPosition="bottom"
          color={colors.orange[600]}
          placeholder="Full name"
        />
        <FormInput
          type="email"
          variant="outline"
          borderPosition="bottom"
          color={colors.orange[600]}
          placeholder="Email"
        />
        <FormInput
          type="phone"
          variant="outline"
          borderPosition="bottom"
          color={colors.orange[600]}
          placeholder="Phone Number"
        />
        <FormInput
          type="password"
          variant="outline"
          borderPosition="bottom"
          color={colors.orange[600]}
          placeholder="Password"
        />

        <Button
          label="REGISTER"
          width="full"
          onPress={() => router.push("/(auth)/request-otp")}
          style={{ marginTop: 12 }}
        />
      </View>

      <Typography style={{ marginTop: 56 }}>
        Click{" "}
        <Typography
          style={{ color: colors.orange[600] }}
          onPress={() => router.push("/(auth)/login")}
        >
          here
        </Typography>
        &nbsp; to log in, if you already have an account
      </Typography>
    </AuthLayout>
  );
}
