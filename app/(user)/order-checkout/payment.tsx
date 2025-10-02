import React, { useMemo, useState } from "react";
import { View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { usePaystack } from "react-native-paystack-webview";
import Typography from "@/components/typography";
import Button from "@/components/button";
import { colors } from "@/constants/Colours";
import { formatNaira } from "@/lib/formart-naira";
import PaymentSuccessView from "@/ui/payment/success";
import PaymentErrorView from "@/ui/payment/error";
import PaymentCancelledView from "@/ui/payment/cancelled";
import InlinePaystack from "@/ui/payment/inline";
import { Ionicons } from "@expo/vector-icons";
import { useListStore } from "@/store/useListStore";
import { printAndShareReceipt, tryLoadLogoBase64, ReceiptData, ReceiptList } from "@/lib/receipt";
import HapticPressable from "@/components/haptic-pressable";

type Params = { amount?: string; lists?: string };

type PaymentStatus = "idle" | "success" | "cancelled" | "error";

export default function Payment() {
  const { amount: amountParam, lists: listsParam } = useLocalSearchParams<Params>();
  const amount = useMemo(() => {
    const parsed = Number(amountParam);
    return Number.isFinite(parsed) ? parsed : 0;
  }, [amountParam]);

  const { popup } = usePaystack();
  const [status, setStatus] = useState<PaymentStatus>("idle");
  const { lists, getTotalPrice } = useListStore();
  const [useInline, setUseInline] = useState(false);
  const [fallbackStarted, setFallbackStarted] = useState(false);

  const handlePaystack = (): void => {
    // const key = process.env.EXPO_PUBLIC_PAYSTACK_PUBLIC_KEY || ''
    if (!fallbackStarted) {
      setFallbackStarted(true);
      setTimeout(() => {
        if (status === "idle") {
          setUseInline(true);
        }
      }, 4000);
    }
    popup.checkout({
      // Type cast to keep things lean while avoiding dependency type drift
      // publicKey: key,
      email: "cfaodigbo@gmail.com",
      amount,
      reference: `GTM-${Date.now()}`,
      onSuccess: () => {
        setStatus("success");
      },
      onCancel: () => {
        setStatus("cancelled");
      },
      onError: () => {
        setStatus("error");
      },
    });
  };

  if (status === "success") {
    return (
      <PaymentSuccessView
        onBackToDashboard={() => router.replace("/(user)/dashboard")}
        onDownloadReceipt={async () => {
          const selectedIds = (listsParam ?? "")
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s.length > 0);

          const receiptLists: ReceiptList[] = selectedIds
            .map((id) => lists[id])
            .filter((l): l is (typeof lists)[string] => Boolean(l))
            .map((l) => ({
              id: l.id,
              title: l.title,
              items: l.items.map((it) => ({
                name: it.name,
                quantity: it.quantity,
                unit: it.unit,
                price: it.price ?? 0,
              })),
              total: getTotalPrice(l.id) ?? 0,
            }));

          const logoBase64 = await tryLoadLogoBase64();
          const data: ReceiptData = {
            issuedBy: "GO TO MARKET",
            logoBase64,
            receiptNumber: `GTM-${Date.now()}`,
            purchasedAt: new Date(),
            lists: receiptLists,
            grandTotal: amount,
          };
          await printAndShareReceipt(data);
        }}
      />
    );
  }

  if (status === "cancelled") {
    return <PaymentCancelledView onBack={() => router.back()} onRetry={() => setStatus("idle")} />;
  }

  if (status === "error") {
    return (
      <PaymentErrorView
        onRetry={() => {
          setStatus("idle");
          setUseInline(false);
          setFallbackStarted(false);
        }}
        onCancel={() => router.back()}
      />
    );
  }

  return (
    <View style={{ position: "relative", flex: 1, paddingHorizontal: 16, paddingTop: 18, gap: 24 }}>
      <Typography variant="h3" style={{ marginBottom: 8 }}>
        Payment
      </Typography>

      <View
        style={{
          width: "100%",
          borderRadius: 12,
          padding: 16,
          gap: 12,
          alignItems: "center",
          justifyContent: "center",
          marginVertical: "auto",
        }}
      >
        <Ionicons name="pricetags-outline" size={72} color={colors.green[600]} />

        <Typography variant="h5" fontWeight="500" style={{ textAlign: "center" }}>
          You are about to make a payment of {formatNaira(amount)}
        </Typography>

        <Typography variant="caption">Verify before you proceed</Typography>
      </View>

      <View style={{ marginTop: "auto", marginBottom: 32 }}>
        <HapticPressable>
          <Button
            width="full"
            label="Continue with Paystack"
            onPress={handlePaystack}
            disabled={amount <= 0}
            size="lg"
          />
        </HapticPressable>
      </View>

      {useInline && (
        <View
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#fff",
          }}
        >
          <InlinePaystack
            email={"cfaodigbo@gmail.com"}
            amount={amount}
            reference={`GTM-${Date.now()}`}
            onSuccess={() => setStatus("success")}
            onCancel={() => setStatus("cancelled")}
            onError={() => setStatus("error")}
          />
        </View>
      )}
    </View>
  );
}
