export type EquipmentSlot =
	| "head"
	| "neck"
	| "body"
	| "hands"
	| "finger1"
	| "finger2"
	| "waist"
	| "feet"
	| "hand1"
	| "hand2";
export type DamageType =
	| "acid"
	| "cold"
	| "crushing"
	| "fire"
	| "lightning"
	| "necrotic"
	| "piercing"
	| "poison"
	| "radiant"
	| "slashing";
export type Attribute =
	| "strength"
	| "dexterity"
	| "constitution"
	| "intelligence"
	| "wisdom"
	| "charisma";

export type TEquipment = Record<EquipmentSlot, string>;

export type TBonusDamage = Record<DamageType, number>;

export type TResistances = Record<DamageType, number>;

export type TAttributes = Record<Attribute, number>;
