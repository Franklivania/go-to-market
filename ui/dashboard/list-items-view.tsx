import React, { useCallback, useMemo, forwardRef } from "react";
import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import Typography from "@/components/typography";
import { Ionicons } from "@expo/vector-icons";
import { useListStore, ItemCategoryLabels } from "@/store/useListStore";
import Button from "@/components/button";
import { colors } from "@/constants/Colours";

interface ListItemsSheetProps {
  onCheckout?: () => void;
}

const ListItemsSheet = forwardRef<BottomSheet, ListItemsSheetProps>(({ onCheckout }, ref) => {
  const snapPoints = useMemo(() => ["10%", "50%", "90%"], []);
  const { getCurrentList, removeItem, getTotalPrice } = useListStore();

  const currentList = getCurrentList();
  const items = currentList?.items || [];
  const totalPrice = getTotalPrice();

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={0}
        appearsOnIndex={1}
        opacity={0.5}
        pressBehavior="collapse"
      />
    ),
    []
  );

  const formatPrice = (price?: number) => {
    if (!price) return "NGN 0";
    return `NGN ${price.toLocaleString()}`;
  };

  const handleRemoveItem = useCallback(
    (itemId: string) => {
      removeItem(itemId);
    },
    [removeItem]
  );

  return (
    <BottomSheet
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={false}
      handleIndicatorStyle={styles.indicator}
      style={{
        borderWidth: 1,
        borderRadius: 14,
        borderColor: colors.orange[400],
      }}
    >
      <BottomSheetView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Typography variant="h6">Items in list</Typography>
            <View style={styles.badge}>
              <Typography variant="caption" color="#fff">
                {items.length}
              </Typography>
            </View>
          </View>
          <Ionicons name="chevron-up" size={20} color="#4A5568" />
        </View>

        {/* Content */}
        {items.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="cart-outline" size={48} color="#CBD5E0" />
            <Typography variant="body2" style={styles.emptyText}>
              No items added yet
            </Typography>
          </View>
        ) : (
          <>
            <ScrollView style={styles.itemsList} showsVerticalScrollIndicator={false}>
              {items.map((item) => (
                <View key={item.id} style={styles.itemCard}>
                  <View style={styles.itemLeft}>
                    <Typography variant="body" fontWeight="600">
                      {item.name}
                    </Typography>
                    <View style={styles.itemMeta}>
                      <Typography variant="caption">{ItemCategoryLabels[item.category]}</Typography>
                      <View style={styles.dot} />
                      <Typography variant="caption">
                        {item.quantity} {item.unit}
                      </Typography>
                    </View>
                    {item.notes && (
                      <Typography variant="caption" color="#718096" numberOfLines={1}>
                        {item.notes}
                      </Typography>
                    )}
                  </View>

                  <View style={styles.itemRight}>
                    <Typography variant="body" fontWeight="600">
                      {formatPrice(item.price)}
                    </Typography>
                    <Pressable
                      onPress={() => handleRemoveItem(item.id)}
                      hitSlop={8}
                      style={styles.removeBtn}
                    >
                      <Ionicons name="close-circle" size={20} color="#E53E3E" />
                    </Pressable>
                  </View>
                </View>
              ))}
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
              <View style={styles.totalRow}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h5" fontWeight="700">
                  {formatPrice(totalPrice)}
                </Typography>
              </View>
              <Button
                width="full"
                label="Checkout"
                onPress={() => {
                  if (onCheckout) onCheckout();
                }}
                style={styles.checkoutBtn}
              />
            </View>
          </>
        )}
      </BottomSheetView>
    </BottomSheet>
  );
});

ListItemsSheet.displayName = "ListItemsSheet";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  indicator: {
    backgroundColor: colors.orange[600],
    width: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.black[200],
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  badge: {
    backgroundColor: colors.orange[300],
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyText: {
    marginTop: 12,
    color: colors.white[600],
  },
  itemsList: {
    flex: 1,
    marginTop: 12,
  },
  itemCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.orange[200],
  },
  itemLeft: {
    flex: 1,
    gap: 4,
  },
  itemMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.black[100],
  },
  itemRight: {
    alignItems: "flex-end",
    gap: 4,
    marginLeft: 12,
  },
  removeBtn: {
    padding: 4,
  },
  footer: {
    paddingTop: 16,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: colors.orange[400],
    gap: 12,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkoutBtn: {
    marginTop: 4,
  },
});

export default ListItemsSheet;
