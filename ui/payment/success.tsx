import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Typography from "@/components/typography";
import Button from "@/components/button";
import { colors } from "@/constants/Colours";

type PaymentSuccessViewProps = {
  onBackToDashboard: () => void;
  onDownloadReceipt?: () => void;
};

export default function PaymentSuccessView({
  onBackToDashboard,
  onDownloadReceipt,
}: PaymentSuccessViewProps) {
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
            backgroundColor: "#26C28133",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="checkmark-circle" size={48} color="#26C281" />
        </View>
        <Typography variant="h5" fontWeight="700">
          Payment Successful
        </Typography>
        <Typography
          variant="caption"
          color={colors.white[600]}
          style={{ textAlign: "center", paddingHorizontal: 24 }}
        >
          Your order has been made, and you will receive it within the next 8 - 12 hrs
        </Typography>
      </View>

      <Button width="full" label="Back to Dashboard" onPress={onBackToDashboard} size="lg" />

      {onDownloadReceipt && (
        <Button
          width="full"
          label="Download Receipt"
          onPress={onDownloadReceipt}
          variant="outline"
          size="lg"
        />
      )}
    </View>
  );
}
