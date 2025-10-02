import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Domain Types
export type ItemCategory =
  | "fruit"
  | "tubers"
  | "grains"
  | "vegetables"
  | "packaged"
  | "protein"
  | "other";

export const ItemCategoryLabels: Record<ItemCategory, string> = {
  fruit: "Fruit",
  tubers: "Tubers",
  grains: "Grains",
  vegetables: "Vegetables",
  packaged: "Packaged Goods",
  protein: "Protein",
  other: "Other",
};

export type MeasurementUnit = "kg" | "g" | "pcs" | "bag" | "crates" | "other";

export interface ListItem {
  id: string;
  name: string; // e.g., Mangoes, Rice
  category: ItemCategory;
  quantity: number;
  unit: MeasurementUnit;
  price?: number; // per item or total; caller defines semantics
  notes?: string;
  createdAt: number;
  updatedAt: number;
}

export interface MarketList {
  id: string;
  title: string; // editable header; defaults to "New list"
  items: ListItem[];
  createdAt: number;
  updatedAt: number;
  isDraft: boolean; // always true until user "checks out"
}

// UI state housed here for convenience and persistence
interface ListUIState {
  // Bottom sheet starts peeked; expand/collapse drives UX
  isBottomSheetExpanded: boolean;
}

interface ListStoreState {
  // Data
  lists: Record<string, MarketList>;
  currentListId: string | null;

  // UI
  ui: ListUIState;

  // Derived selectors
  getCurrentList: () => MarketList | null;
  getTotalPrice: (listId?: string) => number;

  // Mutations
  createOrUseDraft: (title?: string) => string; // returns listId
  startFreshDraft: (title?: string) => string; // always create a brand-new draft and set it current
  setCurrentList: (listId: string) => void;
  setTitle: (title: string) => void; // applies to current list
  addItem: (item: Omit<ListItem, "id" | "createdAt" | "updatedAt">) => string; // returns itemId
  updateItem: (itemId: string, changes: Partial<ListItem>) => void;
  removeItem: (itemId: string) => void;
  clearItems: () => void;
  deleteList: (listId: string) => void;
  expandBottomSheet: (expanded: boolean) => void;
  checkout: () => void; // mark current draft as not draft (kept for history)
  resetStore: () => void;
}

const DEFAULT_LIST_TITLE = "New list";

function generateId(prefix: string): string {
  // Simple, readable unique id for client-only usage
  return `${prefix}_${Math.random().toString(36).slice(2)}_${Date.now().toString(36)}`;
}

function makeAutoTitle(): string {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `List ${yyyy}-${mm}-${dd}`;
}

export const useListStore = create<ListStoreState>()(
  persist(
    (set, get) => ({
      lists: {},
      currentListId: null,
      ui: { isBottomSheetExpanded: false },

      getCurrentList: () => {
        const { lists, currentListId } = get();
        return currentListId ? (lists[currentListId] ?? null) : null;
      },

      getTotalPrice: (listId) => {
        const { lists, currentListId } = get();
        const list = lists[listId ?? (currentListId as string)];
        if (!list) return 0;
        return list.items.reduce((sum, item) => sum + (item.price ?? 0), 0);
      },

      createOrUseDraft: (title) => {
        const { currentListId, lists } = get();
        if (currentListId && lists[currentListId]?.isDraft) return currentListId;
        const id = generateId("list");
        const now = Date.now();
        const next: MarketList = {
          id,
          title: title?.trim() ? title.trim() : DEFAULT_LIST_TITLE,
          items: [],
          createdAt: now,
          updatedAt: now,
          isDraft: true,
        };
        set((s) => ({ lists: { ...s.lists, [id]: next }, currentListId: id }));
        return id;
      },

      startFreshDraft: (title) => {
        const id = generateId("list");
        const now = Date.now();
        const next: MarketList = {
          id,
          title: title?.trim() ? title.trim() : DEFAULT_LIST_TITLE,
          items: [],
          createdAt: now,
          updatedAt: now,
          isDraft: true,
        };
        set((s) => ({ lists: { ...s.lists, [id]: next }, currentListId: id }));
        return id;
      },

      setCurrentList: (listId) => set({ currentListId: listId }),

      setTitle: (title) => {
        const { currentListId, lists } = get();
        if (!currentListId) return;
        const list = lists[currentListId];
        if (!list) return;
        const updated: MarketList = {
          ...list,
          title: title,
          updatedAt: Date.now(),
        };
        set((s) => ({ lists: { ...s.lists, [currentListId]: updated } }));
      },

      addItem: (item) => {
        // Ensure there is a draft to add items to
        const listId = get().createOrUseDraft();
        const { lists } = get();
        const list = lists[listId];
        const id = generateId("item");
        const now = Date.now();
        const nextItem: ListItem = { id, createdAt: now, updatedAt: now, ...item };

        // Auto-title if still default when adding first item
        const shouldAutoTitle =
          (list.title.trim() === DEFAULT_LIST_TITLE || list.title.trim() === "") &&
          list.items.length === 0;
        const autoTitle = shouldAutoTitle ? makeAutoTitle() : list.title;

        const updated: MarketList = {
          ...list,
          title: autoTitle,
          items: [...list.items, nextItem],
          updatedAt: now,
          isDraft: true,
        };

        set((s) => ({ lists: { ...s.lists, [listId]: updated } }));
        return id;
      },

      updateItem: (itemId, changes) => {
        const { currentListId, lists } = get();
        if (!currentListId) return;
        const list = lists[currentListId];
        if (!list) return;
        const now = Date.now();
        const items = list.items.map((it) =>
          it.id === itemId ? { ...it, ...changes, updatedAt: now } : it
        );
        const updated: MarketList = { ...list, items, updatedAt: now };
        set((s) => ({ lists: { ...s.lists, [currentListId]: updated } }));
      },

      removeItem: (itemId) => {
        const { currentListId, lists } = get();
        if (!currentListId) return;
        const list = lists[currentListId];
        if (!list) return;
        const now = Date.now();
        const items = list.items.filter((it) => it.id !== itemId);
        const updated: MarketList = { ...list, items, updatedAt: now };
        set((s) => ({ lists: { ...s.lists, [currentListId]: updated } }));
      },

      clearItems: () => {
        const { currentListId, lists } = get();
        if (!currentListId) return;
        const list = lists[currentListId];
        if (!list) return;
        const now = Date.now();
        const updated: MarketList = {
          ...list,
          title: DEFAULT_LIST_TITLE,
          items: [],
          updatedAt: now,
        };
        set((s) => ({ lists: { ...s.lists, [currentListId]: updated } }));
      },

      deleteList: (listId) => {
        const { currentListId, lists } = get();
        if (!lists[listId]) return;
        const { [listId]: _, ...rest } = lists;
        const nextCurrent = currentListId === listId ? null : currentListId;
        set({ lists: rest, currentListId: nextCurrent });
      },

      expandBottomSheet: (expanded) =>
        set((s) => ({ ui: { ...s.ui, isBottomSheetExpanded: expanded } })),

      checkout: () => {
        const { currentListId, lists } = get();
        if (!currentListId) return;
        const list = lists[currentListId];
        if (!list) return;
        const now = Date.now();
        const updated: MarketList = { ...list, isDraft: false, updatedAt: now };
        set((s) => ({ lists: { ...s.lists, [currentListId]: updated } }));
      },

      resetStore: () =>
        set({ lists: {}, currentListId: null, ui: { isBottomSheetExpanded: false } }),
    }),
    {
      name: "gtm:list-store:v1",
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        lists: state.lists,
        currentListId: state.currentListId,
        ui: state.ui,
      }),
      migrate: (persisted: any, version: number) => {
        // Basic forward-friendly migration if needed in future versions
        if (!persisted) return persisted;
        return persisted;
      },
    }
  )
);

// Convenience selectors
export const selectCurrentList = (s: ListStoreState) => s.getCurrentList();
export const selectItems = (s: ListStoreState) => s.getCurrentList()?.items ?? [];
export const selectTotal = (s: ListStoreState) => s.getTotalPrice();
export const selectBottomSheetExpanded = (s: ListStoreState) => s.ui.isBottomSheetExpanded;
