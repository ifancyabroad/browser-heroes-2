import type { DamageType, TAttributes, TEquipment, TResistances } from "./common";

export type EnemyZone =
	| "abyss"
	| "castle"
	| "desert"
	| "dungeon"
	| "forest"
	| "hills"
	| "ocean"
	| "plains"
	| "tower"
	| "volcano";

export type EnemyTactic = "caster" | "concede" | "default";

export interface IEnemy {
	id: string;
	name: string;
	description?: string;
	portrait: string;
	boss: boolean;
	challenge: number;
	zone: EnemyZone;
	resistances: TResistances;
	skills: string[];
	stats: TAttributes;
	tactics: EnemyTactic;
	naturalArmourClass: number;
	naturalMinDamage: number;
	naturalMaxDamage: number;
	naturalDamageType: DamageType;
	equipment?: Partial<TEquipment>;
}

export type EnemyDefinition = IEnemy;
