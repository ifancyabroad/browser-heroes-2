import { z } from "zod";

export const equipmentSlots = [
	"head",
	"neck",
	"body",
	"hands",
	"finger1",
	"finger2",
	"waist",
	"feet",
	"mainHand",
	"offHand",
] as const;

export const equipmentSlotSchema = z.enum(equipmentSlots);

export const damageTypes = [
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
] as const;

export const damageTypeSchema = z.enum(damageTypes);

export const damageAffinitiesSchema = z
	.object({
		resistances: z.array(damageTypeSchema).default([]),
		immunities: z.array(damageTypeSchema).default([]),
		vulnerabilities: z.array(damageTypeSchema).default([]),
	})
	.superRefine((affinities, ctx) => {
		const groups = [
			["resistances", affinities.resistances],
			["immunities", affinities.immunities],
			["vulnerabilities", affinities.vulnerabilities],
		] as const;

		const seen = new Map<string, string>();

		for (const [groupName, damageTypes] of groups) {
			for (const damageType of damageTypes) {
				const existingGroup = seen.get(damageType);

				if (existingGroup) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: `${damageType} cannot appear in both ${existingGroup} and ${groupName}`,
						path: [groupName],
					});
				}

				seen.set(damageType, groupName);
			}
		}
	});

export const attributes = [
	"strength",
	"dexterity",
	"constitution",
	"intelligence",
	"wisdom",
	"charisma",
] as const;

export const attributeSchema = z.enum(attributes);

export const equipmentSchema = z.object({
	head: z.string().nonempty().optional(),
	neck: z.string().nonempty().optional(),
	body: z.string().nonempty().optional(),
	hands: z.string().nonempty().optional(),
	finger1: z.string().nonempty().optional(),
	finger2: z.string().nonempty().optional(),
	waist: z.string().nonempty().optional(),
	feet: z.string().nonempty().optional(),
	mainHand: z.string().nonempty().optional(),
	offHand: z.string().nonempty().optional(),
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

export const dice = ["d4", "d6", "d8", "d10", "d12", "d20", "d100"] as const;

export const diceSchema = z.enum(dice);

export const diceFormulaSchema = z
	.string()
	.regex(
		/^[1-9]\d*d(4|6|8|10|12|20|100)([+-]\d+)?$/,
		"Expected a valid dice formula such as 1d6, 2d8+3, or 1d20-1",
	);

export const hitDieSchema = z.enum(["1d4", "1d6", "1d8", "1d10", "1d12"]);

export const skillPools = [
	"assassin",
	"barbarian",
	"cleric",
	"common",
	"mage",
	"occultist",
	"rogue",
	"unique",
	"warlock",
	"warrior",
] as const;

export const skillPoolSchema = z.enum(skillPools);

export const skillCategories = [
	"attack",
	"spell",
	"heal",
	"buff",
	"debuff",
	"defensive",
	"utility",
] as const;

export const skillCategorySchema = z.enum(skillCategories);

export const skillTargetSchema = z.enum(["self", "enemy"]);

export const armourTypes = ["cloth", "light", "medium", "heavy", "shield"] as const;

export const armourTypeSchema = z.enum(armourTypes);

export const weaponTypes = [
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
] as const;

export const weaponTypeSchema = z.enum(weaponTypes);

export const zones = [
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
] as const;

export const zoneSchema = z.enum(zones);

export const tactics = ["default", "aggressive", "defensive", "caster", "random"] as const;

export const tacticSchema = z.enum(tactics);

export type EquipmentSlot = z.infer<typeof equipmentSlotSchema>;
export type DamageType = z.infer<typeof damageTypeSchema>;
export type DamageAffinities = z.infer<typeof damageAffinitiesSchema>;
export type Attribute = z.infer<typeof attributeSchema>;
export type Equipment = z.infer<typeof equipmentSchema>;
export type BonusDamage = z.infer<typeof bonusDamageSchema>;
export type Resistances = z.infer<typeof resistancesSchema>;
export type Attributes = z.infer<typeof attributesSchema>;
export type Dice = z.infer<typeof diceSchema>;
export type DiceFormula = z.infer<typeof diceFormulaSchema>;
export type HitDie = z.infer<typeof hitDieSchema>;
export type SkillPool = z.infer<typeof skillPoolSchema>;
export type SkillCategory = z.infer<typeof skillCategorySchema>;
export type SkillTarget = z.infer<typeof skillTargetSchema>;
export type ArmourType = z.infer<typeof armourTypeSchema>;
export type WeaponType = z.infer<typeof weaponTypeSchema>;
export type Zone = z.infer<typeof zoneSchema>;
export type Tactic = z.infer<typeof tacticSchema>;
