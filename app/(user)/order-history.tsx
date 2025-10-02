import { View, ScrollView } from "react-native";
import React, { useMemo } from "react";
import AppContainer from "@/layout/app-container";
import BackButton from "@/components/back-button";
import Typography from "@/components/typography";
import { Card, CardContent } from "@/components/card";
import { colors } from "@/constants/Colours";
import { formatNaira } from "@/lib/formart-naira";

type OrderStatus = "Delivered" | "Reverted" | "In Delivery";
type Order = {
  id: string;
  title: string;
  amount: number;
  status: OrderStatus;
  timeLabel: string;
  timeValue: string;
  highlight?: boolean;
};

export default function OrderHistory() {
  const orders = useMemo(() => {
    const data = require("@/data/order-history.json") as Order[];
    return data;
  }, []);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "Delivered":
        return colors.green[300];
      case "Reverted":
        return colors.orange[300];
      default:
        return colors.yellow[400];
    }
  };

  return (
    <AppContainer>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12, paddingBottom: 12 }}>
        <BackButton style={{ alignSelf: "center" }} />

        <View>
          <Typography variant="h3" fontWeight={400}>
            Order History
          </Typography>
          <Typography variant="body2" fontWeight={400}>
            Track recent deliveries and reversals
          </Typography>
        </View>
      </View>

      <ScrollView>
        {orders.map((order) => (
          <Card
            key={order.id}
            style={{
              borderWidth: 2,
              borderColor: order.highlight ? colors?.green[200] : colors.orange[100],
              backgroundColor: colors.white[50],
            }}
          >
            <CardContent style={{ gap: 12 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" fontWeight={700}>
                  {order.title}
                </Typography>
                <Typography variant="h6" fontWeight={700}>
                  {formatNaira(order.amount).replace("₦", "NGN ")}
                </Typography>
              </View>

              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Typography variant="caption" color={colors.white[700]}>
                  {`${order.timeLabel}: ${order.timeValue}`}
                </Typography>
                <Typography variant="caption" style={{ color: getStatusColor(order.status) }}>
                  {`Status: ${order.status}`}
                </Typography>
              </View>
            </CardContent>
          </Card>
        ))}
      </ScrollView>
    </AppContainer>
  );
}
