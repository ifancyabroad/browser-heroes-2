import { TAttributes } from "./common";
import type { ArmourType, WeaponType } from "./item";
import type { SkillClass } from "./skill";

export type ClassTactic = "caster" | "default";

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
	stats: TAttributes;
	tactics: ClassTactic;
	equipment?: Partial<TEquipment>;
}

export type ClassDefinition = IClass;
