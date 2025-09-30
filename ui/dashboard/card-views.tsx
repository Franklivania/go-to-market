import { TouchableOpacity, View } from "react-native";
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/card";
import { colors } from "@/constants/Colours";
import Typography from "@/components/typography";
import { router } from "expo-router";

export default function CardViews() {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        rowGap: 8,
        columnGap: 24,
      }}
    >
      <TouchableOpacity
        style={{ width: "100%", maxWidth: "46%" }}
        onPress={() => router.push("/(user)/market-list")}
      >
        <Card style={{ backgroundColor: colors.green[100], gap: 58 }}>
          <CardContent>
            <Typography variant="h1">0</Typography>
          </CardContent>
          <CardFooter style={{ alignSelf: "flex-start" }}>
            <Typography variant="body">Market Lists</Typography>
          </CardFooter>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ width: "100%", maxWidth: "46%" }}
        onPress={() => router.push("/(user)/request-display")}
      >
        <Card style={{ borderWidth: 1, borderColor: colors.green[400], gap: 58 }}>
          <CardContent>
            <Typography variant="h1">0</Typography>
          </CardContent>
          <CardFooter style={{ alignSelf: "flex-start" }}>
            <Typography variant="body">Requests Made</Typography>
          </CardFooter>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ width: "100%", maxWidth: "46%" }}
        onPress={() => router.push("/(user)/order-history")}
      >
        <Card style={{ borderWidth: 1, borderColor: colors.orange[400], gap: 58 }}>
          <CardContent>
            <Typography variant="h1">0</Typography>
          </CardContent>
          <CardFooter style={{ alignSelf: "flex-start" }}>
            <Typography variant="body">Orders Fulfilled</Typography>
          </CardFooter>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity style={{ width: "100%", maxWidth: "46%" }}>
        <Card style={{ borderWidth: 1, borderColor: colors.yellow[400], gap: 58 }}>
          <CardContent>
            <Typography variant="h1">0</Typography>
          </CardContent>
          <CardFooter style={{ alignSelf: "flex-start" }}>
            <Typography variant="body">Pending Orders</Typography>
          </CardFooter>
        </Card>
      </TouchableOpacity>
    </View>
  );
}
