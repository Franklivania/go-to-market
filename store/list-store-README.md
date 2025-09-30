### useListStore – Market List state (Zustand + AsyncStorage)

This store manages the entire lifecycle of a user's market list(s): creating drafts, adding/editing/removing items, persisting state to `AsyncStorage`, and handling lightweight UI state (bottom sheet expansion).

- **File**: `store/useListStore.ts`
- **State manager**: Zustand with `persist` middleware
- **Storage**: `@react-native-async-storage/async-storage`

---

## Quick start

```tsx
import React from "react";
import { View, Text, Button } from "react-native";
import { useListStore, selectCurrentList, selectItems, selectTotal } from "../store/useListStore";

export function SimpleListWidget() {
  const currentList = useListStore(selectCurrentList);
  const items = useListStore(selectItems);
  const total = useListStore(selectTotal);

  const addBananas = () => {
    useListStore.getState().addItem({
      name: "Bananas",
      category: "fruit",
      quantity: 6,
      unit: "pcs",
      price: 1200,
    });
  };

  return (
    <View>
      <Text>{currentList?.title ?? "No list yet"}</Text>
      <Text>Items: {items.length}</Text>
      <Text>Total: ₦{total}</Text>
      <Button title="Add Bananas" onPress={addBananas} />
    </View>
  );
}
```

Notes:

- `addItem` auto-creates a draft list if none exists and auto-titles the list on the first add.
- Selectors like `selectItems` and `selectTotal` minimize re-renders.

---

## Domain model

- `MarketList` – a list with `title`, `items[]`, timestamps, and `isDraft`.
- `ListItem` – one entry in the list with `name`, `category`, `quantity`, `unit`, optional `price` and `notes`.

Types (from `useListStore.ts`):

```ts
type ItemCategory = "fruit" | "tubers" | "grains" | "vegetables" | "packaged" | "protein" | "other";
type MeasurementUnit = "kg" | "g" | "pcs" | "bag" | "other";
```

Helper labels are available as `ItemCategoryLabels`.

---

## API overview

Selectors:

- `getCurrentList(): MarketList | null`
- `getTotalPrice(listId?: string): number`
- `selectCurrentList`, `selectItems`, `selectTotal`, `selectBottomSheetExpanded`

Mutations:

- `createOrUseDraft(title?: string): string` – returns `listId`
- `setCurrentList(listId: string)`
- `setTitle(title: string)` – for the current list
- `addItem(item: Omit<ListItem, "id" | "createdAt" | "updatedAt">): string` – returns `itemId`
- `updateItem(itemId: string, changes: Partial<ListItem>)`
- `removeItem(itemId: string)`
- `clearItems()`
- `expandBottomSheet(expanded: boolean)`
- `checkout()` – marks current draft as not draft (kept for history)
- `resetStore()` – clears everything

Persistence:

- Key: `gtm:list-store:v1`
- `partialize` persists only `lists`, `currentListId`, and `ui`.

---

## Best-practice usage patterns

### 1) Creating/using a draft list

```ts
const listId = useListStore.getState().createOrUseDraft("Groceries for Saturday");
useListStore.getState().setCurrentList(listId);
```

- If a draft already exists and is current, it will be reused.
- Title defaults to "New list"; the first `addItem` can auto-title it to `List YYYY-MM-DD` if still default/empty.

### 2) Adding items (auto-create draft)

```ts
useListStore.getState().addItem({
  name: "Rice",
  category: "grains",
  quantity: 2,
  unit: "bag",
  price: 15000,
});
```

- If there is no current draft, one is created automatically.

### 3) Updating an item

```ts
const { addItem, updateItem } = useListStore.getState();
const itemId = addItem({
  name: "Tomatoes",
  category: "vegetables",
  quantity: 5,
  unit: "kg",
  price: 3200,
});
updateItem(itemId, { quantity: 6, price: 3800 });
```

### 4) Removing/clearing items

```ts
useListStore.getState().removeItem(itemId);
useListStore.getState().clearItems();
```

### 5) Setting title and checking out

```ts
useListStore.getState().setTitle("Neighborhood Market Run");
useListStore.getState().checkout(); // marks current list as not draft
```

### 6) Switching lists

```ts
const { lists } = useListStore.getState();
const allListIds = Object.keys(lists);
if (allListIds.length > 0) {
  useListStore.getState().setCurrentList(allListIds[0]);
}
```

### 7) UI state: bottom sheet

```ts
const isExpanded = useListStore(selectBottomSheetExpanded);
const toggle = () => useListStore.getState().expandBottomSheet(!isExpanded);
```

### 8) Derived totals

```ts
const total = useListStore(selectTotal);
// or for a specific list id
const totalFor = useListStore.getState().getTotalPrice(listId);
```

---

## Using selectors to avoid re-renders

Prefer the provided selectors or your own memoized selectors to minimize component updates.

```tsx
import { useShallow } from "zustand/react/shallow";
import { useListStore } from "../store/useListStore";

export function Header() {
  const { title, count } = useListStore(
    useShallow((s) => {
      const list = s.getCurrentList();
      return { title: list?.title ?? "New list", count: list?.items.length ?? 0 };
    })
  );
  return (
    <Text>
      {title} · {count} items
    </Text>
  );
}
```

---

## Example: Full add/edit flow in a screen

```tsx
import React, { useMemo } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { useListStore, ItemCategoryLabels } from "../store/useListStore";

export default function MarketListScreen() {
  const list = useListStore((s) => s.getCurrentList());
  const items = list?.items ?? [];
  const total = useListStore((s) => s.getTotalPrice());

  const ensureDraft = () => {
    const id = useListStore.getState().createOrUseDraft();
    useListStore.getState().setCurrentList(id);
  };

  const addSample = () => {
    ensureDraft();
    useListStore
      .getState()
      .addItem({ name: "Chicken", category: "protein", quantity: 1, unit: "kg", price: 4500 });
  };

  return (
    <View>
      <Text>{list?.title ?? "Tap to start a new list"}</Text>
      <Button title="Add sample" onPress={addSample} />
      <FlatList
        data={items}
        keyExtractor={(it) => it.id}
        renderItem={({ item }) => (
          <View>
            <Text>
              {item.name} · {ItemCategoryLabels[item.category]} · {item.quantity}
              {item.unit}
            </Text>
            <Button
              title="+1"
              onPress={() =>
                useListStore.getState().updateItem(item.id, { quantity: item.quantity + 1 })
              }
            />
            <Button title="Remove" onPress={() => useListStore.getState().removeItem(item.id)} />
          </View>
        )}
        ListFooterComponent={<Text>Total: ₦{total}</Text>}
      />
    </View>
  );
}
```

---

## Persistence, versioning, and migrations

- The store is persisted with key `gtm:list-store:v1`.
- Only `lists`, `currentListId`, and `ui` are persisted.
- A `migrate(persisted, version)` function exists for forward-friendly changes; currently, it returns data as-is.

If you change the schema, bump the `version` and add logic to transform older shapes into the new one.

---

## Edge cases and gotchas

- `updateItem`, `removeItem`, `clearItems`, `setTitle`, and `checkout` require a valid `currentListId`. If none is set, they no-op. Use `createOrUseDraft` or `setCurrentList` beforehand.
- `addItem` is safe when no list exists; it creates a draft automatically.
- The first `addItem` may auto-title the list based on date if the title is still default/empty.
- `checkout` only flips `isDraft` to `false` and updates `updatedAt`; it does not archive or delete.
- `resetStore` clears all persisted data, including UI state.

---

## Testing tips

For unit-like tests or imperative flows, interact with the store directly via `getState()`:

```ts
const store = useListStore.getState();
const listId = store.createOrUseDraft("Test");
store.setCurrentList(listId);
const itemId = store.addItem({
  name: "Eggs",
  category: "protein",
  quantity: 12,
  unit: "pcs",
  price: 1800,
});
store.updateItem(itemId, { quantity: 18 });
expect(store.getTotalPrice()).toBeGreaterThan(0);
```

---

## TypeScript helpers

You can import and use the public types where needed:

```ts
import type { ListItem, MarketList, ItemCategory, MeasurementUnit } from "../store/useListStore";

function formatItem(item: ListItem) {
  return `${item.name} (${item.quantity}${item.unit})`;
}
```

---

## Performance notes

- Prefer `select*` helpers and `useShallow` when mapping multiple derived fields.
- Avoid selecting the entire store in components; subscribe to the smallest slice you need.
- Keep expensive computations outside of selectors or memoize them with `useMemo`.

---

## UI examples

Toggle bottom sheet expansion:

```tsx
const isExpanded = useListStore(selectBottomSheetExpanded);
const onToggle = () => useListStore.getState().expandBottomSheet(!isExpanded);
```

Show a badge with item count:

```tsx
const itemCount = useListStore((s) => s.getCurrentList()?.items.length ?? 0);
```

---

## Migration checklist (when evolving the store)

- Bump `version` in `persist` config.
- Extend `migrate` to map old persisted shape to the new one.
- Consider backfilling defaults for new fields (e.g., `isDraft: true`).
- Verify `partialize` includes all fields you need persisted.

---

## FAQ

- "How do I start a new list without adding an item yet?"
  - Call `createOrUseDraft(title?)` and then `setCurrentList` with the returned id.

- "How do I keep both active draft and history?"
  - Use `checkout` to mark a list as complete (`isDraft: false`); do not call `resetStore`.

- "Can I compute totals by list id?"
  - Yes: `useListStore.getState().getTotalPrice(listId)`.
