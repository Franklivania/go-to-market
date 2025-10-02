import { View, Pressable, Alert } from "react-native";
import React, { useMemo, useCallback } from "react";
import AppContainer from "@/layout/app-container";
import Typography from "@/components/typography";
import { FlatList } from "react-native-gesture-handler";
import { Card, CardContent, CardTitle } from "@/components/card";
import { formatNaira } from "@/lib/formart-naira";
import { colors } from "@/constants/Colours";
import Button from "@/components/button";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import CreateListButton from "@/ui/dashboard/create-list-button";
import { useListStore } from "@/store/useListStore";

export default function MarketList() {
  const { lists, getTotalPrice, setCurrentList, deleteList } = useListStore();

  const data = useMemo(() => {
    const arr = Object.values(lists);
    // Sort by updatedAt desc
    return arr.sort((a, b) => b.updatedAt - a.updatedAt);
  }, [lists]);

  const handleOpenList = useCallback(
    (id: string) => {
      setCurrentList(id);
      router.push({ pathname: "/(user)/edit-market-list", params: { id } });
    },
    [setCurrentList]
  );

  const handleDelete = useCallback(
    (id: string) => {
      Alert.alert(
        "Delete draft?",
        "This will permanently remove this draft list.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => deleteList(id),
          },
        ],
        { cancelable: true }
      );
    },
    [deleteList]
  );

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
          data={data}
          numColumns={2}
          style={{
            gap: 12,
            marginBottom: 72,
          }}
          renderItem={({ item }) => (
            <Pressable style={{ width: "50%" }} onPress={() => handleOpenList(item.id)}>
              <Card
                key={item.id}
                style={{
                  position: "relative",
                  width: "96%",
                  height: 200,
                  borderWidth: 1,
                  marginHorizontal: 4,
                  padding: 0,
                  borderColor: colors.white[500],
                  overflow: "hidden",
                  backgroundColor: colors.black[200],
                }}
              >
                {item.isDraft && (
                  <Pressable
                    onPress={(e) => {
                      e.stopPropagation();
                      handleDelete(item.id);
                    }}
                    hitSlop={8}
                    style={{ position: "absolute", top: 6, right: 6, zIndex: 2 }}
                  >
                    <Ionicons name="trash-outline" size={18} color={colors.white[600]} />
                  </Pressable>
                )}
                {item.isDraft && (
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
                      DRAFTS
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
                  <Typography variant="h5">{item.title}</Typography>
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
                    <Typography variant="body2">
                      {item.items.length === 1 ? "Item" : "Items"}
                    </Typography>
                    <Typography variant="body">{item.items.length}</Typography>
                  </View>
                  <View>
                    <Typography variant="body2">Total</Typography>
                    <Typography variant="body">{formatNaira(getTotalPrice(item.id))}</Typography>
                  </View>
                </CardContent>
              </Card>
            </Pressable>
          )}
        />
      </View>
      <CreateListButton />
    </AppContainer>
  );
}
