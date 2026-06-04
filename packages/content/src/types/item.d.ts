export interface IProperty {
	name: string;
	type: "resistance" | "damage" | "stat" | "auxiliaryStat" | "heal";
	value: number;
}

export type ArmourType = "light" | "medium" | "heavy" | "cloth" | "misc";
export type ArmourSlot =
	| "amulet"
	| "armour"
	| "belt"
	| "boots"
	| "gloves"
	| "helmet"
	| "ring"
	| "shield";

export interface IArmour {
	id: string; // snake_case id
	name: string;
	description?: string;
	icon: string;
	level: number;
	price: number;
	armourClass?: number;
	armourType: ArmourType;
	properties?: IProperty[];
	characterClass?: string;
	type: ArmourSlot; // original type field from source (helmet, boots, etc.)
}

export type ArmourId = string;

// Weapon types
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

export type WeaponSize = "oneHanded" | "twoHanded";
export type WeaponType =
	| "axe"
	| "bow"
	| "club"
	| "crossbow"
	| "dagger"
	| "hammer"
	| "mace"
	| "spear"
	| "staff"
	| "sword"
	| "wand";

export interface IEffect {
	damageType?: DamageType;
	max?: number;
	min?: number;
	target?: string;
	type: "auxiliary" | "damage" | "heal" | "status" | "weaponDamage";
	difficulty?: number;
	duration?: number;
	modifier?: number | string;
	effect?: string;
	properties?: IProperty[];
	accuracy?: number;
	multiplier?: number;
}

export interface IWeapon {
	id: string;
	name: string;
	description?: string;
	icon: string;
	level: number;
	price: number;
	min: number;
	max: number;
	size: WeaponSize;
	type: "weapon";
	weaponType: WeaponType;
	damageType: DamageType;
	properties?: IProperty[];
	effects?: IEffect[];
}

export type WeaponId = string;
