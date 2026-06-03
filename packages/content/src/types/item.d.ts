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
