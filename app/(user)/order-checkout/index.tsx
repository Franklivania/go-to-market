import React, { useMemo, useRef, useState, useCallback, useEffect } from "react";
import { View, Pressable, ScrollView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Typography from "@/components/typography";
import Button from "@/components/button";
import { colors } from "@/constants/Colours";
import { useListStore } from "@/store/useListStore";
import { formatNaira } from "@/lib/formart-naira";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import HapticPressable from "@/components/haptic-pressable";
type PrefillParams = { prefill?: string };

export default function OrderCheckout() {
  // Use store lists; selection is local to checkout
  const { lists, getTotalPrice } = useListStore();
  const { prefill } = useLocalSearchParams<PrefillParams>();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const allLists = useMemo(() => Object.values(lists), [lists]);
  const selectedLists = useMemo(
    () => allLists.filter((l) => selectedIds.includes(l.id)),
    [allLists, selectedIds]
  );
  const total = useMemo(
    () => selectedLists.reduce((acc, l) => acc + (getTotalPrice(l.id) || 0), 0),
    [selectedLists, getTotalPrice]
  );
  const hasSelection = selectedLists.length > 0;

  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%", "90%"], []);

  const openSheet = useCallback(() => sheetRef.current?.expand(), []);
  const closeSheet = useCallback(() => sheetRef.current?.close(), []);
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        style={{ position: "absolute" }}
        appearsOnIndex={0}
        opacity={0.4}
      />
    ),
    []
  );

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);
  const removeSelected = useCallback(
    (id: string) => setSelectedIds((prev) => prev.filter((x) => x !== id)),
    []
  );

  useEffect(() => {
    if (prefill && typeof prefill === "string") {
      const ids = prefill
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      setSelectedIds(ids);
    }
  }, [prefill]);

  return (
    <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 18, gap: 24 }}>
      <Typography variant="h3" style={{ marginBottom: 8 }}>
        Checkout
      </Typography>

      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6">Selected Lists</Typography>
        <Pressable onPress={openSheet} hitSlop={8}>
          <Typography variant="body" color={colors.orange[400]}>
            Add lists +
          </Typography>
        </Pressable>
      </View>

      {!hasSelection ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Typography variant="body" color={colors.white[600]} style={{ textAlign: "center" }}>
            No list selected yet. Tap &quot;Add lists&quot; to choose items.
          </Typography>
        </View>
      ) : (
        <>
          <View style={{ gap: 12 }}>
            {selectedLists.map((l, idx) => (
              <View key={l.id}>
                {idx === 0 && <View style={{ height: 1, backgroundColor: colors.orange[200] }} />}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    paddingVertical: 12,
                  }}
                >
                  <View style={{ gap: 4 }}>
                    <Typography variant="body" fontWeight="600">
                      {l.title}
                    </Typography>
                    <Typography variant="caption" color={colors.white[600]}>
                      Items: {l.items.length}
                    </Typography>
                  </View>
                  <View style={{ alignItems: "flex-end", gap: 6 }}>
                    <Typography variant="body" fontWeight="600">
                      {formatNaira(getTotalPrice(l.id))}
                    </Typography>
                    <Pressable onPress={() => removeSelected(l.id)} hitSlop={8}>
                      <Typography variant="caption" color={colors.orange[400]}>
                        Remove
                      </Typography>
                    </Pressable>
                  </View>
                </View>
                <View style={{ height: 1, backgroundColor: colors.orange[200] }} />
              </View>
            ))}
          </View>

          <View style={{ marginTop: 8, gap: 6 }}>
            <Typography variant="caption" color={colors.white[600]}>
              Total
            </Typography>
            <Typography variant="body" fontWeight="600">
              {formatNaira(total)}
            </Typography>
          </View>

          <View style={{ marginTop: "auto", marginBottom: 24 }}>
            <HapticPressable>
              <Button
                width="full"
                label="Proceed to Payment"
                onPress={() => {
                  router.push({
                    pathname: "/(user)/order-checkout/payment",
                    params: {
                      amount: String(total),
                      lists: selectedIds.join(","),
                    },
                  });
                }}
                disabled={!hasSelection}
                size="lg"
              />
            </HapticPressable>
          </View>
        </>
      )}

      {/* Bottom Sheet: pick lists */}
      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{ backgroundColor: colors.orange[600], width: 40 }}
      >
        <BottomSheetView style={{ paddingHorizontal: 16, paddingBottom: 12, gap: 12 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
          >
            <Typography variant="h6">Add lists</Typography>
            <Pressable onPress={closeSheet} hitSlop={8}>
              <Typography variant="body" color={colors.orange[400]}>
                Done
              </Typography>
            </Pressable>
          </View>
          <ScrollView style={{ maxHeight: 400 }} showsVerticalScrollIndicator={false}>
            {allLists.map((l) => (
              <Pressable
                key={l.id}
                onPress={() => toggleSelect(l.id)}
                style={{ paddingVertical: 12 }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View style={{ gap: 4 }}>
                    <Typography variant="body" fontWeight="600">
                      {l.title}
                    </Typography>
                    <Typography variant="caption" color={colors.white[600]}>
                      Items: {l.items.length}
                    </Typography>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                    <Typography variant="body">{formatNaira(getTotalPrice(l.id))}</Typography>
                    <Typography variant="caption" color={colors.orange[400]}>
                      {selectedIds.includes(l.id) ? "Selected" : "Select"}
                    </Typography>
                  </View>
                </View>
                <View style={{ height: 1, backgroundColor: colors.orange[200], marginTop: 12 }} />
              </Pressable>
            ))}
          </ScrollView>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}
