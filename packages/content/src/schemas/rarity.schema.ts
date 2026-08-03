import { z } from "zod";

export const rarities = ["common", "uncommon", "rare", "epic", "legendary"] as const;

export const itemAffixRarities = ["uncommon", "rare", "epic"] as const;

export const generatedItemRarities = ["common", ...itemAffixRarities] as const;

export const itemRarities = rarities;

export const raritySchema = z.enum(rarities);

export const itemAffixRaritySchema = z.enum(itemAffixRarities);

export const generatedItemRaritySchema = z.enum(generatedItemRarities);

export type Rarity = z.infer<typeof raritySchema>;

export type ItemRarity = Rarity;

export type ItemAffixRarity = z.infer<typeof itemAffixRaritySchema>;

export type GeneratedItemRarity = z.infer<typeof generatedItemRaritySchema>;
