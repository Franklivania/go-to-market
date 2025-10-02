import { View, ScrollView } from "react-native";
import React from "react";
import Typography from "@/components/typography";
import { colors } from "@/constants/Colours";
import FormInput from "@/components/form-input";
import Button from "@/components/button";

export default function UpdateProfile() {
  return (
    <View>
      <Typography variant="h2" fontWeight={500} style={{ marginTop: 32 }}>
        Update Details
      </Typography>

      <ScrollView
        style={{
          width: "100%",
          paddingHorizontal: 12,
          paddingVertical: 32,
          backgroundColor: colors.white[100],
          borderRadius: 12,
          rowGap: 16,
          marginTop: 24,
        }}
      >
        <FormInput
          variant="filled"
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
        />
        <FormInput variant="filled" label="Email" type="email" placeholder="Enter your email" />
        <FormInput
          variant="filled"
          label="Phone Number"
          type="phone"
          placeholder="Enter your phone number"
        />
        <FormInput
          variant="filled"
          label="Nationality"
          type="text"
          placeholder="Enter your nationality"
        />
        <FormInput
          variant="filled"
          label="State/Region"
          type="text"
          placeholder="Enter your state/region"
        />
        <FormInput
          variant="filled"
          label="Home Address"
          type="text"
          placeholder="Enter your home address"
        />

        <Button width="full" label="Update Details" onPress={() => {}} />
      </ScrollView>
    </View>
  );
}
