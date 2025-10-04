import { StyleSheet, TextInput, View, Pressable } from "react-native";
import React, { useState, useRef, useMemo, useCallback, useEffect } from "react";
import AppContainer from "@/layout/app-container";
import Typography from "@/components/typography";
import Button from "@/components/button";
import FormInput from "@/components/form-input";
import TextArea from "@/components/text-area";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import {
  createMarketItemSchema,
  CategoryOptions,
  UnitOptions,
} from "@/validations/create-market-validation";
import {
  useListStore,
  ItemCategoryLabels,
  ItemCategory,
  MeasurementUnit,
} from "@/store/useListStore";
import ListItemsSheet from "@/ui/dashboard/list-items-view";
import { colors } from "@/constants/Colours";

type BottomSheetType = "category" | "unit" | null;

const unitLabels: Record<MeasurementUnit, string> = {
  kg: "Kilograms (kg)",
  g: "Grams (g)",
  pcs: "Pieces (pcs)",
  bag: "Bags",
  crates: "Crates",
  other: "Other",
};

export default function EditMarketList() {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [activeSheet, setActiveSheet] = useState<BottomSheetType>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectionSheetRef = useRef<BottomSheet>(null);
  const listItemsSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%"], []);

  const { id } = useLocalSearchParams<{ id?: string }>();
  const { getCurrentList, setCurrentList, setTitle, addItem } = useListStore();

  // Ensure the provided list id is set as current
  useEffect(() => {
    if (id) setCurrentList(String(id));
  }, [id, setCurrentList]);

  const currentList = getCurrentList();

  const [formState, setFormState] = useState({
    name: "",
    category: "grains" as ItemCategory,
    quantity: 0,
    unit: "kg" as MeasurementUnit,
    price: 0,
    notes: "",
  });

  const openSheet = useCallback((type: BottomSheetType) => {
    setActiveSheet(type);
    selectionSheetRef.current?.expand();
  }, []);

  const closeSheet = useCallback(() => {
    selectionSheetRef.current?.close();
    setActiveSheet(null);
  }, []);

  const handleSelect = useCallback(
    (value: ItemCategory | MeasurementUnit) => {
      if (activeSheet === "category") {
        setFormState((s) => ({ ...s, category: value as ItemCategory }));
      } else if (activeSheet === "unit") {
        setFormState((s) => ({ ...s, unit: value as MeasurementUnit }));
      }
      closeSheet();
    },
    [activeSheet, closeSheet]
  );

  const handleAddItem = useCallback(() => {
    setErrors({});
    const payload = {
      title: currentList?.title,
      name: formState.name,
      category: formState.category,
      quantity: formState.quantity,
      unit: formState.unit,
      price: formState.price,
      notes: formState.notes,
    };
    const result = createMarketItemSchema.safeParse(payload);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0];
        if (typeof key === "string") {
          fieldErrors[key] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }
    addItem({
      name: result.data.name,
      category: result.data.category as ItemCategory,
      quantity: result.data.quantity,
      unit: result.data.unit as MeasurementUnit,
      price: result.data.price,
      notes: result.data.notes,
    });
    setFormState({ name: "", category: "grains", quantity: 0, unit: "kg", price: 0, notes: "" });
    listItemsSheetRef.current?.snapToIndex(0);
  }, [formState, currentList, addItem]);

  const handleTitleBlur = useCallback(() => {
    setIsEditingTitle(false);
    if (currentList?.title) {
      setTitle(currentList.title);
    }
  }, [currentList?.title, setTitle]);

  const handleBack = useCallback(() => {
    router.back();
  }, []);

  const handleCheckout = useCallback(() => {
    const current = getCurrentList();
    if (!current) return;
    router.push({ pathname: "/(user)/order-checkout", params: { prefill: current.id } });
  }, [getCurrentList]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />
    ),
    []
  );

  return (
    <AppContainer>
      <Button
        width="fit"
        variant="plain"
        size="icon"
        style={{ alignSelf: "flex-start" }}
        onPress={handleBack}
      >
        <Ionicons name="arrow-back-outline" size={32} />
      </Button>

      <View style={styles.header}>
        {isEditingTitle ? (
          <TextInput
            value={currentList?.title || ""}
            onChangeText={(t) => setTitle(t)}
            onBlur={handleTitleBlur}
            autoFocus
            placeholder="Edit List"
            style={styles.titleInput}
          />
        ) : (
          <Pressable onPress={() => setIsEditingTitle(true)}>
            <Typography variant="h2" fontWeight={600}>
              {currentList?.title?.trim() || "Untitled"}
            </Typography>
          </Pressable>
        )}
        <Button variant="plain" label="Save" onPress={handleBack} />
      </View>

      <View style={styles.main}>
        <FormInput
          type="text"
          variant="filled"
          label="Item Name"
          placeholder="Rice, Garri, Eggs, Milk"
          textColor={colors.black[300]}
          value={formState.name}
          onChangeText={(name) => setFormState((s) => ({ ...s, name }))}
          error={errors.name}
        />

        <Pressable onPress={() => openSheet("category")}>
          <FormInput
            type="text"
            variant="filled"
            label="Select Type"
            value={ItemCategoryLabels[formState.category]}
            textColor={colors.black[300]}
            editable={false}
            rightIcon={<Ionicons name="chevron-down" size={18} />}
            pointerEvents="none"
          />
        </Pressable>

        <View style={styles.inlineRow}>
          <View style={styles.quantityWrapper}>
            <FormInput
              type="numeric"
              variant="filled"
              label="Quantity"
              placeholder="0"
              textColor={colors.black[300]}
              value={String(formState.quantity)}
              onChangeText={(quantityText) =>
                setFormState((s) => ({ ...s, quantity: Number(quantityText) || 0 }))
              }
              error={errors.quantity}
            />
          </View>

          <View style={styles.unitWrapper}>
            <Pressable onPress={() => openSheet("unit")}>
              <FormInput
                type="text"
                variant="filled"
                label="Unit"
                textColor={colors.black[300]}
                value={formState.unit.toUpperCase()}
                editable={false}
                rightIcon={<Ionicons name="chevron-down" size={18} />}
                pointerEvents="none"
              />
            </Pressable>
          </View>
        </View>

        <FormInput
          type="numeric"
          variant="filled"
          label="Price"
          placeholder="e.g. 10000"
          textColor={colors.black[300]}
          value={String(formState.price)}
          onChangeText={(priceText) =>
            setFormState((s) => ({ ...s, price: Number(priceText) || 0 }))
          }
          error={errors.price}
        />

        <TextArea
          variant="filled"
          label="Notes"
          placeholder="Other things to know..."
          textColor={colors.black[300]}
          minRows={5}
          maxRows={12}
          value={formState.notes}
          onChangeText={(notes) => setFormState((s) => ({ ...s, notes }))}
          style={{ color: colors.black[500] }}
        />

        <Button width="full" label="Add to List" onPress={handleAddItem} />
      </View>
      <ListItemsSheet ref={listItemsSheetRef} onCheckout={handleCheckout} />

      {/* Selection Bottom Sheet (Category/Unit) */}
      <BottomSheet
        ref={selectionSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        onClose={() => setActiveSheet(null)}
      >
        <BottomSheetView style={styles.sheetContent}>
          <Typography variant="h5" style={styles.sheetTitle}>
            {activeSheet === "category" ? "Select Category" : "Select Unit"}
          </Typography>

          {activeSheet === "category" &&
            CategoryOptions.map((cat) => (
              <Pressable key={cat} style={styles.sheetOption} onPress={() => handleSelect(cat)}>
                <Typography variant="body">{ItemCategoryLabels[cat]}</Typography>
                {formState.category === cat && (
                  <Ionicons name="checkmark" size={20} color="#4A5568" />
                )}
              </Pressable>
            ))}

          {activeSheet === "unit" &&
            UnitOptions.map((unit) => (
              <Pressable key={unit} style={styles.sheetOption} onPress={() => handleSelect(unit)}>
                <Typography variant="body">{unitLabels[unit]}</Typography>
                {formState.unit === unit && <Ionicons name="checkmark" size={20} color="#4A5568" />}
              </Pressable>
            ))}
        </BottomSheetView>
      </BottomSheet>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
  main: {
    marginVertical: 12,
    rowGap: 6,
  },
  titleInput: {
    fontSize: 28,
    fontWeight: "600",
    padding: 0,
    margin: 0,
  },
  inlineRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    width: "100%",
  },
  quantityWrapper: {
    flex: 1,
    marginRight: 8,
  },
  unitWrapper: {
    width: 90,
  },
  sheetContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sheetTitle: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  sheetOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F7FAFC",
  },
});
