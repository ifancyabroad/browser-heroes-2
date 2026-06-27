import type {
	ArmourType,
	Attribute,
	DamageType,
	EquipmentSlot,
	FeatCategory,
	SkillCategory,
	SkillPool,
	WeaponType,
} from "@app/content";

export const attributeShortLabels: Record<Attribute, string> = {
	strength: "STR",
	dexterity: "DEX",
	constitution: "CON",
	intelligence: "INT",
	wisdom: "WIS",
	charisma: "CHA",
};

export const combatStatShortLabels = {
	armourClass: "AC",
	proficiencyBonus: "Prof",
	attackRollBonus: "Attack",
	savingThrowBonus: "Save",
	saveDcBonus: "Save DC",
	critChance: "Crit",
	critMultiplier: "Crit x",
	damageReduction: "DR",
	healingMultiplier: "Healing",
} as const;

export const equipmentSlotLabels: Record<EquipmentSlot, string> = {
	head: "Head",
	neck: "Neck",
	body: "Body",
	hands: "Hands",
	finger1: "Finger 1",
	finger2: "Finger 2",
	waist: "Waist",
	feet: "Feet",
	mainHand: "Main Hand",
	offHand: "Off Hand",
};

export const damageTypeLabels: Record<DamageType, string> = {
	acid: "Acid",
	cold: "Cold",
	crushing: "Crush",
	fire: "Fire",
	lightning: "Lightning",
	necrotic: "Necrotic",
	piercing: "Pierce",
	poison: "Poison",
	radiant: "Radiant",
	slashing: "Slash",
};

export const armourTypeLabels: Record<ArmourType, string> = {
	cloth: "Cloth",
	light: "Light",
	medium: "Medium",
	heavy: "Heavy",
};

export const weaponTypeLabels: Record<WeaponType, string> = {
	axe: "Axe",
	bow: "Bow",
	club: "Club",
	crossbow: "Crossbow",
	dagger: "Dagger",
	hammer: "Hammer",
	mace: "Mace",
	spear: "Spear",
	staff: "Staff",
	sword: "Sword",
	wand: "Wand",
};

export const skillCategoryLabels: Record<SkillCategory, string> = {
	attack: "Attack",
	spell: "Spell",
	heal: "Heal",
	buff: "Buff",
	debuff: "Debuff",
	defensive: "Defensive",
	utility: "Utility",
};

export const skillPoolLabels: Record<SkillPool, string> = {
	assassin: "Assassin",
	barbarian: "Barbarian",
	cleric: "Cleric",
	common: "Common",
	mage: "Mage",
	occultist: "Occultist",
	rogue: "Rogue",
	unique: "Unique",
	warlock: "Warlock",
	warrior: "Warrior",
};

export const featCategoryLabels: Record<FeatCategory, string> = {
	offensive: "Offensive",
	defensive: "Defensive",
	utility: "Utility",
	resource: "Resource",
	elemental: "Elemental",
};
