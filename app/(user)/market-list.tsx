import { View } from "react-native";
import React from "react";
import AppContainer from "@/layout/app-container";
import Typography from "@/components/typography";
import { FlatList } from "react-native-gesture-handler";
import marketlist from "@/data/market-list.json";
import { Card, CardContent, CardTitle } from "@/components/card";
import { formatNaira } from "@/lib/formart-naira";
import { colors } from "@/constants/Colours";
import Button from "@/components/button";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import CreateListButton from "@/ui/dashboard/create-list-button";

export default function MarketList() {
  return (
    <AppContainer>
      <Button
        width="fit"
        variant="plain"
        size="icon"
        style={{ alignSelf: "flex-start" }}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back-outline" size={32} />
      </Button>
      <View>
        <Typography variant="h3">Market Lists View</Typography>
      </View>

      <View>
        <FlatList
          data={marketlist}
          numColumns={2}
          style={{
            gap: 12,
            marginBottom: 72,
          }}
          renderItem={({ item }) => (
            <Card
              key={item?.id}
              style={{
                position: "relative",
                width: "48%",
                height: 200,
                borderWidth: 1,
                marginHorizontal: 4,
                padding: 0,
                borderColor: colors.white[500],
                overflow: "hidden",
                backgroundColor: colors.black[200],
              }}
            >
              {item?.in_draft && (
                <View
                  style={{
                    position: "absolute",
                    bottom: 56,
                    right: 4,
                    borderRadius: 4,
                    width: "auto",
                    paddingHorizontal: 6,
                    paddingVertical: 4,
                    backgroundColor: colors.black[300],
                  }}
                >
                  <Typography
                    variant="caption"
                    style={{
                      color: colors.white[500],
                    }}
                  >
                    {item?.in_draft && "DRAFTS"}
                  </Typography>
                </View>
              )}

              <CardTitle
                style={{
                  width: "100%",
                  height: "auto",
                  padding: 6,
                }}
              >
                <Typography variant="h5">{item?.title}</Typography>
              </CardTitle>
              <CardContent
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderTopWidth: 1,
                  paddingHorizontal: 6,
                  paddingTop: 6,
                  paddingBottom: 6,
                  marginTop: "auto",
                  marginBottom: -4,
                  borderColor: colors.white[500],
                  backgroundColor: colors.white[100],
                }}
              >
                <View>
                  <Typography variant="body2">{item?.items === 1 ? "Item" : "Items"}</Typography>
                  <Typography variant="body">{item?.items}</Typography>
                </View>
                <View>
                  <Typography variant="body2">Total</Typography>
                  <Typography variant="body">{formatNaira(item?.total)}</Typography>
                </View>
              </CardContent>
            </Card>
          )}
        />
      </View>
      <CreateListButton />
    </AppContainer>
  );
}
