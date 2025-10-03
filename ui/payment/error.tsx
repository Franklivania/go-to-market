import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Typography from "@/components/typography";
import Button from "@/components/button";
import { colors } from "@/constants/Colours";

type PaymentErrorViewProps = {
  title?: string;
  message?: string;
  onRetry: () => void;
  onCancel?: () => void;
};

export default function PaymentErrorView({
  title = "Payment Failed",
  message = "Something went wrong while processing your payment. Please try again.",
  onRetry,
  onCancel,
}: PaymentErrorViewProps) {
  return (
    <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 56, gap: 24 }}>
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 12,
          paddingVertical: 36,
          alignItems: "center",
          gap: 16,
        }}
      >
        <View
          style={{
            width: 64,
            height: 64,
            borderRadius: 32,
            backgroundColor: "#FF3B3033",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="close-circle" size={48} color="#FF3B30" />
        </View>
        <Typography variant="h5" fontWeight="700">
          {title}
        </Typography>
        <Typography
          variant="caption"
          color={colors.white[600]}
          style={{ textAlign: "center", paddingHorizontal: 24 }}
        >
          {message}
        </Typography>
      </View>

      <Button width="full" label="Try Again" onPress={onRetry} size="lg" />

      {onCancel && (
        <Button width="full" label="Cancel" onPress={onCancel} variant="outline" size="lg" />
      )}
    </View>
  );
}
