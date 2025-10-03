import { ScrollView, View, Pressable } from "react-native";
import React, { useState } from "react";
import AppContainer from "@/layout/app-container";
import BackButton from "@/components/back-button";
import Typography from "@/components/typography";
import { Card, CardContent } from "@/components/card";
import { colors } from "@/constants/Colours";

type NotificationItem = {
  id: string;
  title: string;
  body: string;
  date: string;
  read: boolean;
};

export default function Notifications() {
  const notificationsData = require("@/data/notifications.json") as NotificationItem[];

  const [items, setItems] = useState<NotificationItem[]>(() => {
    return [...notificationsData].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  });

  const toggleRead = (id: string) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)));
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <AppContainer>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12, paddingBottom: 12 }}>
        <BackButton style={{ alignSelf: "center" }} />

        <View>
          <Typography variant="h3" fontWeight={400}>
            Notifications
          </Typography>
          <Typography variant="body2" fontWeight={400}>
            Tap on each to mark as read
          </Typography>
        </View>
      </View>

      <ScrollView>
        {items.map((item) => {
          const isRead = item.read;
          return (
            <Pressable key={item.id} onPress={() => toggleRead(item.id)}>
              <Card
                style={{
                  borderWidth: 1,
                  borderColor: isRead ? colors.white[400] : colors.orange[300],
                  backgroundColor: isRead ? colors.white[100] : colors.white[50],
                  opacity: isRead ? 0.45 : 1,
                }}
              >
                <CardContent style={{ gap: 8 }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                    <Typography variant="h6" fontWeight={700}>
                      {item.title}
                    </Typography>
                    <View
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: isRead ? colors.green[300] : colors.orange[300],
                      }}
                    />
                  </View>
                  <Typography variant="body2">{item.body}</Typography>
                  <View
                    style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 6 }}
                  >
                    <Typography variant="caption" color={colors.white[700]}>
                      {`Time: ${formatDate(item.date)}`}
                    </Typography>
                    <Typography
                      variant="caption"
                      color={isRead ? colors.green[300] : colors.orange[300]}
                    >
                      {isRead ? "Status: Read" : "Status: Unread"}
                    </Typography>
                  </View>
                </CardContent>
              </Card>
            </Pressable>
          );
        })}
      </ScrollView>
    </AppContainer>
  );
}
