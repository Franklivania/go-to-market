import { View } from "react-native";
import React from "react";
import Typography from "@/components/typography";
import { colors } from "@/constants/Colours";
import FormInput from "@/components/form-input";
import Button from "@/components/button";

export default function ChangePassword() {
  return (
    <View>
      <Typography variant="h2" fontWeight={500} style={{ marginTop: 32 }}>
        Change Password
      </Typography>

      <View
        style={{
          width: "100%",
          paddingHorizontal: 12,
          paddingVertical: 32,
          backgroundColor: colors.white[100],
          borderRadius: 12,
          rowGap: 16,
          marginTop: 48,
        }}
      >
        <FormInput
          variant="filled"
          label="Current Password"
          type="password"
          placeholder="Enter your current password"
        />
        <FormInput
          variant="filled"
          label="New Password"
          type="password"
          placeholder="Enter your current password"
        />
        <FormInput
          variant="filled"
          label="Confirm New Password"
          type="password"
          placeholder="Enter your current password"
        />

        <Button width="full" label="Confirm Change" onPress={() => {}} />
      </View>
    </View>
  );
}
