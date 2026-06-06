import type { IEffect } from "./item";

export type SkillClass =
	| "assassin"
	| "barbarian"
	| "cleric"
	| "common"
	| "mage"
	| "occultist"
	| "rogue"
	| "unique"
	| "warlock"
	| "warrior";

export type SkillTarget = "enemy";

export interface ISkill {
	id: string;
	name: string;
	description?: string;
	icon: string;
	level: number;
	price: number;
	maxUses: number;
	class: SkillClass;
	target?: SkillTarget;
	effects?: IEffect[];
}

export type SkillDefinition = ISkill;
