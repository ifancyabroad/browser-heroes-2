import type {
	ArmourSlot,
	ArmourType,
	Attribute,
	BodyArmourCategory,
	DamageType,
	EquipmentSlot,
	FeatCategory,
	FeatKind,
	ItemRarity,
	ModifiableStat,
	SkillCategory,
	SkillKind,
	SkillPool,
	WeaponHandedness,
	WeaponRange,
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

export const attributeLabels: Record<Attribute, string> = {
	strength: "Strength",
	dexterity: "Dexterity",
	constitution: "Constitution",
	intelligence: "Intelligence",
	wisdom: "Wisdom",
	charisma: "Charisma",
};

export const combatStatShortLabels = {
	armourClass: "AC",
	attackRollBonus: "Attack",
	savingThrowBonus: "Save",
	saveDcBonus: "Save DC",
	criticalRangeBonus: "Crit Range",
	criticalDiceMultiplierBonus: "Crit Dice",
	healingMultiplier: "Healing",
	maxHpBonus: "Max HP",
} as const;

export const combatStatLabels = {
	armourClass: "Armour Class",
	attackRollBonus: "Attack Roll Bonus",
	savingThrowBonus: "Saving Throw Bonus",
	saveDcBonus: "Save DC Bonus",
	criticalRangeBonus: "Critical Range Bonus",
	criticalDiceMultiplierBonus: "Critical Dice Multiplier Bonus",
	healingMultiplier: "Healing Multiplier",
	maxHpBonus: "Maximum HP Bonus",
} as const;

export const modifiableStatLabels: Record<ModifiableStat, string> = {
	armourClass: combatStatShortLabels.armourClass,
	attackRollBonus: combatStatShortLabels.attackRollBonus,
	savingThrowBonus: combatStatShortLabels.savingThrowBonus,
	saveDcBonus: combatStatShortLabels.saveDcBonus,
	criticalRangeBonus: combatStatShortLabels.criticalRangeBonus,
	criticalDiceMultiplierBonus: combatStatShortLabels.criticalDiceMultiplierBonus,
	maxHpBonus: combatStatShortLabels.maxHpBonus,
	strength: attributeShortLabels.strength,
	dexterity: attributeShortLabels.dexterity,
	constitution: attributeShortLabels.constitution,
	intelligence: attributeShortLabels.intelligence,
	wisdom: attributeShortLabels.wisdom,
	charisma: attributeShortLabels.charisma,
};

export const modifiableStatFullLabels: Record<ModifiableStat, string> = {
	armourClass: combatStatLabels.armourClass,
	attackRollBonus: combatStatLabels.attackRollBonus,
	savingThrowBonus: combatStatLabels.savingThrowBonus,
	saveDcBonus: combatStatLabels.saveDcBonus,
	criticalRangeBonus: combatStatLabels.criticalRangeBonus,
	criticalDiceMultiplierBonus: combatStatLabels.criticalDiceMultiplierBonus,
	maxHpBonus: combatStatLabels.maxHpBonus,
	strength: attributeLabels.strength,
	dexterity: attributeLabels.dexterity,
	constitution: attributeLabels.constitution,
	intelligence: attributeLabels.intelligence,
	wisdom: attributeLabels.wisdom,
	charisma: attributeLabels.charisma,
};

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

export const itemRarityLabels: Record<ItemRarity, string> = {
	common: "Common",
	uncommon: "Uncommon",
	rare: "Rare",
	epic: "Epic",
	legendary: "Legendary",
};

export const damageTypeLabels: Record<DamageType, string> = {
	acid: "Acid",
	cold: "Cold",
	crushing: "Crushing",
	fire: "Fire",
	lightning: "Lightning",
	necrotic: "Necrotic",
	piercing: "Piercing",
	poison: "Poison",
	radiant: "Radiant",
	slashing: "Slashing",
};

export const armourSlotLabels: Record<ArmourSlot, string> = {
	body: "Body",
	shield: "Shield",
	helmet: "Helmet",
	gloves: "Gloves",
	boots: "Boots",
	belt: "Belt",
	amulet: "Amulet",
	ring: "Ring",
};

export const armourTypeLabels: Record<ArmourType, string> = {
	cloth: "Cloth",
	light: "Light",
	medium: "Medium",
	heavy: "Heavy",
	shield: "Shield",
};

export const armourCategoryLabels: Record<BodyArmourCategory, string> = {
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

export const weaponHandednessLabels: Record<WeaponHandedness, string> = {
	oneHanded: "One-handed",
	twoHanded: "Two-handed",
};

export const weaponRangeLabels: Record<WeaponRange, string> = {
	melee: "Melee",
	ranged: "Ranged",
};

export const skillCategoryLabels: Record<SkillCategory, string> = {
	damage: "Damage",
	heal: "Heal",
	buff: "Buff",
	debuff: "Debuff",
	defensive: "Defensive",
	utility: "Utility",
};

export const skillKindLabels: Record<SkillKind, string> = {
	weaponAttack: "Weapon Attack",
	spellAttack: "Spell Attack",
	spell: "Spell",
	technique: "Technique",
	prayer: "Prayer",
};

export const skillPoolLabels: Record<SkillPool, string> = {
	assassin: "Assassin",
	barbarian: "Barbarian",
	cleric: "Cleric",
	common: "Common",
	fighter: "Fighter",
	occultist: "Occultist",
	thief: "Thief",
	unique: "Unique",
	warlock: "Warlock",
	wizard: "Wizard",
};

export const featCategoryLabels: Record<FeatCategory, string> = {
	offensive: "Offensive",
	defensive: "Defensive",
	utility: "Utility",
	resource: "Resource",
};

export const featKindLabels: Record<FeatKind, string> = {
	attribute: "Attribute",
	damageMastery: "Damage Mastery",
	training: "Training",
	bargain: "Bargain",
};
