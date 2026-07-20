import { z } from "zod";

export const itemAffixRarities = ["uncommon", "rare", "epic"] as const;

export const generatedItemRarities = ["common", ...itemAffixRarities] as const;

export const itemRarities = [...generatedItemRarities, "legendary"] as const;

export const itemAffixRaritySchema = z.enum(itemAffixRarities);

export const generatedItemRaritySchema = z.enum(generatedItemRarities);

export const itemRaritySchema = z.enum(itemRarities);

export type ItemAffixRarity = z.infer<typeof itemAffixRaritySchema>;

export type GeneratedItemRarity = z.infer<typeof generatedItemRaritySchema>;

export type ItemRarity = z.infer<typeof itemRaritySchema>;
