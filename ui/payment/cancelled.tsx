import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Typography from "@/components/typography";
import Button from "@/components/button";
import { colors } from "@/constants/Colours";

type PaymentCancelledViewProps = {
  onBack: () => void;
  onRetry?: () => void;
};

export default function PaymentCancelledView({ onBack, onRetry }: PaymentCancelledViewProps) {
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
            backgroundColor: "#FFA50033",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="alert-circle" size={48} color="#FFA500" />
        </View>
        <Typography variant="h5" fontWeight="700">
          Payment Cancelled
        </Typography>
        <Typography
          variant="caption"
          color={colors.white[600]}
          style={{ textAlign: "center", paddingHorizontal: 24 }}
        >
          You cancelled the payment. You can try again or go back.
        </Typography>
      </View>

      {onRetry && <Button width="full" label="Try Again" onPress={onRetry} size="lg" />}

      <Button width="full" label="Back" onPress={onBack} variant="outline" size="lg" />
    </View>
  );
}
