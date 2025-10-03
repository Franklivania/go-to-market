import { View, ScrollView } from "react-native";
import React, { useMemo } from "react";
import AppContainer from "@/layout/app-container";
import BackButton from "@/components/back-button";
import Typography from "@/components/typography";
import { Card, CardContent } from "@/components/card";
import { colors } from "@/constants/Colours";
import { formatNaira } from "@/lib/formart-naira";

export default function RequestDisplay() {
  type RequestStatus = "Pending" | "Started" | "Not Started";
  type RequestItem = {
    id: string;
    title: string;
    amount: number;
    status: RequestStatus;
    timeLabel: string;
    timeValue: string;
    highlight?: boolean;
  };

  const requests = useMemo(() => {
    const data = require("@/data/request-display.json") as RequestItem[];
    return data;
  }, []);

  const getStatusColor = (status: RequestStatus) => {
    switch (status) {
      case "Pending":
        return colors.orange[300];
      case "Started":
        return colors.yellow[700];
      case "Not Started":
      default:
        return colors.white[700];
    }
  };

  return (
    <AppContainer>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12, paddingBottom: 12 }}>
        <BackButton style={{ alignSelf: "center" }} />

        <View>
          <Typography variant="h3" fontWeight={400}>
            Requests
          </Typography>
          <Typography variant="body2" fontWeight={400}>
            View your requests
          </Typography>
        </View>
      </View>

      <ScrollView>
        {requests.map((req) => (
          <Card
            key={req.id}
            style={{
              borderWidth: 1,
              borderColor: req.highlight ? colors.orange[300] : colors.orange[100],
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
                  {req.title}
                </Typography>
                <Typography variant="h6" fontWeight={700}>
                  {formatNaira(req.amount).replace("₦", "NGN ")}
                </Typography>
              </View>

              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Typography variant="caption" color={colors.white[700]}>
                  {`${req.timeLabel}: ${req.timeValue}`}
                </Typography>
                <Typography variant="caption" style={{ color: getStatusColor(req.status) }}>
                  {`Status: ${req.status}`}
                </Typography>
              </View>
            </CardContent>
          </Card>
        ))}
      </ScrollView>
    </AppContainer>
  );
}
