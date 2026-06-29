import { z } from "zod";
import { damageTypeSchema } from "./common.schema";
import {
	damageAffinityKindSchema,
	damageAffinityOperationSchema,
	modifiableStatSchema,
	modifierOperationSchema,
} from "./modifier.schema";

export const itemRaritySchema = z.enum(["common", "uncommon", "rare", "epic", "legendary"]);

export const armourSlotSchema = z.enum([
	"body",
	"shield",
	"helmet",
	"gloves",
	"boots",
	"belt",
	"amulet",
	"ring",
]);

export const bodyArmourCategorySchema = z.enum(["cloth", "light", "medium", "heavy"]);

export const armourCategorySchema = z.enum([
	"cloth",
	"light",
	"medium",
	"heavy",
	"shield",
	"accessory",
]);

export const itemStatModifierSchema = z.object({
	type: z.literal("modifyStat"),
	stat: modifiableStatSchema,
	operation: modifierOperationSchema,
	value: z.number(),
});

export const itemDamageModifierSchema = z.object({
	type: z.literal("modifyDamage"),
	damageType: damageTypeSchema.optional(),
	operation: z.enum(["add", "multiply"]),
	value: z.number(),
});

export const itemDamageAffinityModifierSchema = z.object({
	type: z.literal("modifyDamageAffinity"),
	affinity: damageAffinityKindSchema,
	operation: damageAffinityOperationSchema,
	damageType: damageTypeSchema,
});

export const itemModifierSchema = z.discriminatedUnion("type", [
	itemStatModifierSchema,
	itemDamageModifierSchema,
	itemDamageAffinityModifierSchema,
]);

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
	category: z.literal("shield"),
});

export const accessoryArmourSchema = armourBaseSchema.extend({
	slot: z.enum(["helmet", "gloves", "boots", "belt", "amulet", "ring"]),
	category: z.literal("accessory"),
});

export const armourSchema = z.union([bodyArmourSchema, shieldArmourSchema, accessoryArmourSchema]);

export type ItemRarity = z.infer<typeof itemRaritySchema>;
export type ArmourSlot = z.infer<typeof armourSlotSchema>;
export type ArmourCategory = z.infer<typeof armourCategorySchema>;

export type ItemStatModifier = z.infer<typeof itemStatModifierSchema>;
export type ItemDamageModifier = z.infer<typeof itemDamageModifierSchema>;
export type ItemDamageAffinityModifier = z.infer<typeof itemDamageAffinityModifierSchema>;
export type ItemModifier = z.infer<typeof itemModifierSchema>;

export type BodyArmour = z.infer<typeof bodyArmourSchema>;
export type ShieldArmour = z.infer<typeof shieldArmourSchema>;
export type AccessoryArmour = z.infer<typeof accessoryArmourSchema>;
export type Armour = z.infer<typeof armourSchema>;
export type ArmourInput = z.input<typeof armourSchema>;
