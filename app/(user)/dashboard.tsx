import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import Typography from "@/components/typography";
import Button from "@/components/button";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/constants/Colours";
import AppLayout from "@/layout/app-layout";
import CardViews from "@/ui/dashboard/card-views";
import CreateListButton from "@/ui/dashboard/create-list-button";
import { router } from "expo-router";

export default function UserDashboard() {
  let user = "Franklin";

  return (
    <AppLayout style={{ display: "flex", gap: 12 }}>
      <View style={styles.header}>
        <View>
          <Typography variant="h3" fontWeight={300}>
            Good Morning
          </Typography>
          <Typography>Saturday, 1:56 PM</Typography>
        </View>
        <Button
          variant="outline"
          size="icon"
          onPress={() => router.push("/notifications")}
          style={{ borderColor: colors.black[600] }}
        >
          <Ionicons name="notifications-outline" size={24} />
        </Button>
      </View>

      <View style={styles.banner}>
        <View style={{ width: "60%", position: "relative", zIndex: 10 }}>
          <Typography variant="h4" style={styles["text-white"]}>
            Welcome {user}{" "}
          </Typography>
          <Typography variant="body" style={styles.paragraph}>
            It is a beautiful day today, remember to smile
          </Typography>
        </View>

        <Image
          source={require("@/assets/images/qqquad.png")}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            opacity: 75,
          }}
        />
        <Pressable onPress={() => router.push("/(user)/user-settings")}>
          <Image
            source={require("@/assets/images/avatar.png")}
            style={{
              width: 48,
              height: 48,
              // borderWidth: 1
            }}
          />
        </Pressable>
      </View>

      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          borderWidth: 2,
          paddingHorizontal: 4,
          paddingVertical: 4,
          borderRadius: 8,
          borderColor: colors.green[600],
        }}
      >
        <View
          style={{
            backgroundColor: colors.green[600],
            paddingHorizontal: 4,
            paddingVertical: 4,
            borderRadius: 8,
          }}
        >
          <MaterialIcons name="info" size={24} color={colors.white[100]} />
        </View>
        <Typography variant="body" fontWeight={600}>
          Pro tip:
        </Typography>
        <Typography variant="caption" style={{ width: "75%" }}>
          You can get started by tapping the bottom right button to create your first list
        </Typography>
      </View>

      <View style={{ marginTop: 12 }}>
        <Typography variant="h4">Let&apos;s get you up to speed</Typography>
        <CardViews />
      </View>

      <CreateListButton />
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  banner: {
    position: "relative",
    width: "100%",
    backgroundColor: "#2B3316",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  "text-white": {
    color: colors.white[100],
  },
  paragraph: {
    color: colors.white[400],
  },
});
