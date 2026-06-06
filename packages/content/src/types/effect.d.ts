import { DamageType } from "./common";

export type EffectType = "auxiliary" | "damage" | "heal" | "status" | "weaponDamage";
export type PropertyType = "resistance" | "damage" | "stat" | "auxiliaryStat" | "heal";

export interface IProperty {
	name: string;
	type: PropertyType;
	value: number;
}

export interface IEffect {
	damageType?: DamageType;
	max?: number;
	min?: number;
	target?: string;
	type: EffectType;
	difficulty?: number;
	duration?: number;
	modifier?: number | string;
	effect?: string;
	properties?: IProperty[];
	accuracy?: number;
	multiplier?: number;
}
