import { z } from "zod";
import { ItemCategory, MeasurementUnit } from "@/store/useListStore";

export const CategoryOptions = [
  "fruit",
  "tubers",
  "grains",
  "vegetables",
  "packaged",
  "protein",
  "other",
] as const satisfies readonly ItemCategory[];

export const UnitOptions = [
  "kg",
  "g",
  "pcs",
  "bag",
  "crates",
  "other",
] as const satisfies readonly MeasurementUnit[];

export const createMarketItemSchema = z.object({
  title: z.string().optional(),
  name: z.string().trim().min(1, "Item name is required"),
  category: z.enum(CategoryOptions as unknown as readonly [string, ...string[]]),
  quantity: z
    .preprocess((v) => Number(String(v).trim()), z.number().positive("Quantity must be > 0"))
    .transform((n) => n),
  unit: z.enum(UnitOptions as unknown as readonly [string, ...string[]]),
  price: z.preprocess(
    (v) => Number(String(v).trim()),
    z.number().nonnegative("Price cannot be negative")
  ),
  notes: z.string().optional(),
});

export type CreateMarketItemInput = z.infer<typeof createMarketItemSchema>;
