import { z } from "zod";

export const equipmentSlotSchema = z.enum([
	"head",
	"neck",
	"body",
	"hands",
	"finger1",
	"finger2",
	"waist",
	"feet",
	"hand1",
	"hand2",
]);

export const damageTypeSchema = z.enum([
	"acid",
	"cold",
	"crushing",
	"fire",
	"lightning",
	"necrotic",
	"piercing",
	"poison",
	"radiant",
	"slashing",
]);

export const attributeSchema = z.enum([
	"strength",
	"dexterity",
	"constitution",
	"intelligence",
	"wisdom",
	"charisma",
]);

export const equipmentSchema = z.object({
	head: z.string().nonempty().optional(),
	neck: z.string().nonempty().optional(),
	body: z.string().nonempty().optional(),
	hands: z.string().nonempty().optional(),
	finger1: z.string().nonempty().optional(),
	finger2: z.string().nonempty().optional(),
	waist: z.string().nonempty().optional(),
	feet: z.string().nonempty().optional(),
	hand1: z.string().nonempty().optional(),
	hand2: z.string().nonempty().optional(),
});

export const bonusDamageSchema = z.object({
	acid: z.number(),
	cold: z.number(),
	crushing: z.number(),
	fire: z.number(),
	lightning: z.number(),
	necrotic: z.number(),
	piercing: z.number(),
	poison: z.number(),
	radiant: z.number(),
	slashing: z.number(),
});

export const resistancesSchema = bonusDamageSchema;

export const attributesSchema = z.object({
	strength: z.number(),
	dexterity: z.number(),
	constitution: z.number(),
	intelligence: z.number(),
	wisdom: z.number(),
	charisma: z.number(),
});

export const diceSchema = z.enum(["d6", "d8", "d10", "d12"]);

export const diceFormulaSchema = z
	.string()
	.regex(/^\d+d\d+([+-]\d+)?$/, "Expected dice formula like 1d6, 2d8+3, or 1d4-1");

export const skillPoolSchema = z.enum([
	"assassin",
	"barbarian",
	"cleric",
	"mage",
	"occultist",
	"rogue",
	"warlock",
	"warrior",
]);

export const armourTypeSchema = z.enum(["cloth", "light", "medium", "heavy"]);

export const weaponTypeSchema = z.enum([
	"axe",
	"bow",
	"club",
	"crossbow",
	"dagger",
	"hammer",
	"mace",
	"spear",
	"staff",
	"sword",
	"wand",
]);

export const zoneSchema = z.enum([
	"abyss",
	"castle",
	"desert",
	"dungeon",
	"forest",
	"hills",
	"ocean",
	"plains",
	"tower",
	"volcano",
]);

export type EquipmentSlot = z.infer<typeof equipmentSlotSchema>;
export type DamageType = z.infer<typeof damageTypeSchema>;
export type Attribute = z.infer<typeof attributeSchema>;
export type Equipment = z.infer<typeof equipmentSchema>;
export type BonusDamage = z.infer<typeof bonusDamageSchema>;
export type Resistances = z.infer<typeof resistancesSchema>;
export type Attributes = z.infer<typeof attributesSchema>;
export type Dice = z.infer<typeof diceSchema>;
export type DiceFormula = z.infer<typeof diceFormulaSchema>;
export type SkillPool = z.infer<typeof skillPoolSchema>;
export type ArmourType = z.infer<typeof armourTypeSchema>;
export type WeaponType = z.infer<typeof weaponTypeSchema>;
export type Zone = z.infer<typeof zoneSchema>;
