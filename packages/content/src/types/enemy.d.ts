import type { DamageType } from "./item";

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
export type EnemyEquipmentSlot = "body" | "hand1" | "hand2" | "head";

export type TEnemyResistances = Record<DamageType, number>;

export interface IEnemyStats {
	charisma: number;
	constitution: number;
	dexterity: number;
	intelligence: number;
	strength: number;
	wisdom: number;
}

export interface IEnemyEquipment {
	body?: string;
	hand1?: string;
	hand2?: string;
	head?: string;
}

export interface IEnemy {
	id: string;
	name: string;
	description?: string;
	portrait: string;
	boss: boolean;
	challenge: number;
	zone: EnemyZone;
	resistances: TEnemyResistances;
	skills?: string[];
	stats: IEnemyStats;
	tactics: EnemyTactic;
	naturalArmourClass: number;
	naturalMinDamage: number;
	naturalMaxDamage: number;
	naturalDamageType: DamageType;
	equipment?: IEnemyEquipment;
}

export type EnemyDefinition = IEnemy;
