import type { ArmourType, WeaponType } from "./item";
import type { SkillClass } from "./skill";

export type ClassTactic = "caster" | "default";
export type ClassEquipmentSlot = "body" | "hand1" | "hand2";

export interface IClassStats {
	charisma: number;
	constitution: number;
	dexterity: number;
	intelligence: number;
	strength: number;
	wisdom: number;
}

export interface IClassEquipment {
	body?: string;
	hand1?: string;
	hand2?: string;
}

export interface IClass {
	id: string;
	name: string;
	description?: string;
	portrait: string;
	fallenImage: string;
	icon: string;
	skillClasses: SkillClass[];
	armourTypes: ArmourType[];
	weaponTypes: WeaponType[];
	skills: string[];
	stats: IClassStats;
	tactics: ClassTactic;
	equipment?: IClassEquipment;
}

export type ClassId = string;

export type ClassDefinition = IClass;
