import { z } from "zod";
import {
	passiveDamageAffinityModifierSchema,
	passiveDamageModifierSchema,
	passiveDamageTakenModifierSchema,
	passiveHealingModifierSchema,
	passiveModifierSchema,
	passiveStatModifierSchema,
} from "./modifier.schema";
import { generatedItemRaritySchema, itemRaritySchema } from "./itemRarity.schema";

export const armourSlots = [
	"body",
	"shield",
	"helmet",
	"gloves",
	"boots",
	"belt",
	"amulet",
	"ring",
] as const;

export const armourSlotSchema = z.enum(armourSlots);

export const bodyArmourCategories = ["cloth", "light", "medium", "heavy"] as const;

export const bodyArmourCategorySchema = z.enum(bodyArmourCategories);

export const itemStatModifierSchema = passiveStatModifierSchema;

export const itemHealingModifierSchema = passiveHealingModifierSchema;

export const itemDamageModifierSchema = passiveDamageModifierSchema;

export const itemDamageTakenModifierSchema = passiveDamageTakenModifierSchema;

export const itemDamageAffinityModifierSchema = passiveDamageAffinityModifierSchema;

export const itemModifierSchema = passiveModifierSchema;

const armourBaseSchema = z.object({
	type: z.literal("armour"),
	id: z.string().nonempty(),
	name: z.string().nonempty(),
	description: z.string().optional(),
	icon: z.string().nonempty(),
	price: z.number().int().nonnegative(),
	rarity: itemRaritySchema.default("common"),
	modifiers: z.array(itemModifierSchema).default([]),
	tags: z.array(z.string().nonempty()).default([]),
});

export const bodyArmourSchema = armourBaseSchema.extend({
	slot: z.literal("body"),
	category: bodyArmourCategorySchema,
	armourClass: z.number().int().positive(),
});

export const shieldArmourSchema = armourBaseSchema.extend({
	slot: z.literal("shield"),
	armourClass: z.number().int().positive(),
});

export const accessoryArmourSchema = armourBaseSchema.extend({
	slot: z.enum(["helmet", "gloves", "boots", "belt", "amulet", "ring"]),
});

export const armourSchema = z.union([bodyArmourSchema, shieldArmourSchema, accessoryArmourSchema]);

export const generatedArmourSchema = z.union([
	bodyArmourSchema.extend({
		rarity: generatedItemRaritySchema,
	}),
	shieldArmourSchema.extend({
		rarity: generatedItemRaritySchema,
	}),
	accessoryArmourSchema.extend({
		rarity: generatedItemRaritySchema,
	}),
]);

export const legendaryArmourSchema = z.union([
	bodyArmourSchema.extend({
		rarity: z.literal("legendary"),
	}),
	shieldArmourSchema.extend({
		rarity: z.literal("legendary"),
	}),
	accessoryArmourSchema.extend({
		rarity: z.literal("legendary"),
	}),
]);

export type LegendaryArmour = z.infer<typeof legendaryArmourSchema>;

export type LegendaryArmourInput = z.input<typeof legendaryArmourSchema>;

export type GeneratedArmour = z.infer<typeof generatedArmourSchema>;

export type ArmourSlot = z.infer<typeof armourSlotSchema>;
export type BodyArmourCategory = z.infer<typeof bodyArmourCategorySchema>;

export type ItemStatModifier = z.infer<typeof itemStatModifierSchema>;
export type ItemHealingModifier = z.infer<typeof itemHealingModifierSchema>;
export type ItemDamageModifier = z.infer<typeof itemDamageModifierSchema>;
export type ItemDamageTakenModifier = z.infer<typeof itemDamageTakenModifierSchema>;
export type ItemDamageAffinityModifier = z.infer<typeof itemDamageAffinityModifierSchema>;
export type ItemModifier = z.infer<typeof itemModifierSchema>;

export type BodyArmour = z.infer<typeof bodyArmourSchema>;
export type ShieldArmour = z.infer<typeof shieldArmourSchema>;
export type AccessoryArmour = z.infer<typeof accessoryArmourSchema>;
export type Armour = z.infer<typeof armourSchema>;
export type ArmourInput = z.input<typeof armourSchema>;
