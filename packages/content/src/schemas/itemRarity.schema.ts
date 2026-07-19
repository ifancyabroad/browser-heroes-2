import { z } from "zod";

export const generatedItemRarities = ["common", "uncommon", "rare", "epic"] as const;

export const itemRarities = [...generatedItemRarities, "legendary"] as const;

export const generatedItemRaritySchema = z.enum(generatedItemRarities);
export const itemRaritySchema = z.enum(itemRarities);

export type GeneratedItemRarity = z.infer<typeof generatedItemRaritySchema>;

export type ItemRarity = z.infer<typeof itemRaritySchema>;
