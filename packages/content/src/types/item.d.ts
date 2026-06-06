import { IProperty } from "./effect";

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

export type ItemDefinition = IArmour | IWeapon;
