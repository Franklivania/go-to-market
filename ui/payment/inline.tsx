import React from "react";
import { View } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";

export type InlinePaystackProps = {
  publicKey?: string;
  email: string;
  amount: number;
  reference: string;
  currency?: "NGN" | "GHS" | "USD";
  channels?: ("card" | "bank" | "bank_transfer" | "ussd" | "qr" | "mobile_money")[];
  onSuccess: (payload: { reference: string }) => void;
  onCancel: () => void;
  onError?: (message: string) => void;
};

export default function InlinePaystack({
  publicKey,
  email,
  amount,
  reference,
  currency = "NGN",
  channels = ["card", "bank_transfer", "bank", "ussd"],
  onSuccess,
  onCancel,
  onError,
}: InlinePaystackProps) {
  const key = publicKey || "";
  const paystackAmount = amount; // keep units consistent with popup usage

  const html = `
    <!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <script src="https://js.paystack.co/v1/inline.js"></script>
        <style> html,body{height:100%;margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;} .center{display:flex;align-items:center;justify-content:center;height:100%;} .btn{background:#f4511e;color:#fff;border:none;padding:12px 16px;border-radius:8px;} </style>
      </head>
      <body>
        <div class="center"><button id="start" class="btn">Continue</button></div>
        <script>
          const pay = () => {
            try {
              var handler = PaystackPop.setup({
                key: ${JSON.stringify(key)},
                email: ${JSON.stringify(email)},
                amount: ${JSON.stringify(paystackAmount)},
                currency: ${JSON.stringify(currency)},
                ref: ${JSON.stringify(reference)},
                channels: ${JSON.stringify(channels)},
                callback: function(response){
                  window.ReactNativeWebView.postMessage(JSON.stringify({ event: 'success', data: response }));
                },
                onClose: function(){
                  window.ReactNativeWebView.postMessage(JSON.stringify({ event: 'cancel' }));
                }
              });
              handler.openIframe();
            } catch (e) {
              window.ReactNativeWebView.postMessage(JSON.stringify({ event: 'error', error: { message: e.message } }));
            }
          };
          document.getElementById('start').addEventListener('click', pay);
          // auto-start
          setTimeout(pay, 300);
        </script>
      </body>
    </html>
  `;

  const onMessage = (e: WebViewMessageEvent) => {
    try {
      const payload = JSON.parse(e.nativeEvent.data) as {
        event: "success" | "cancel" | "error";
        data?: any;
        error?: { message?: string };
      };
      if (payload.event === "success") {
        onSuccess({
          reference: (payload.data && (payload.data.reference || payload.data.trxref)) || reference,
        });
      } else if (payload.event === "cancel") {
        onCancel();
      } else if (payload.event === "error") {
        onError && onError(payload.error?.message || "Unknown error");
      }
    } catch {
      onError && onError("Malformed message");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView originWhitelist={["*"]} source={{ html }} javaScriptEnabled onMessage={onMessage} />
    </View>
  );
}
