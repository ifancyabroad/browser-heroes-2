import { CLASSES_BY_ID, type Weapon } from "@app/content";

import type { HeroState } from "../../../schemas";

export function isHeroWeaponProficient(hero: HeroState, weapon: Weapon): boolean {
	const classDefinition = CLASSES_BY_ID[hero.classId];

	return classDefinition.proficiencies.weaponTypes.includes(weapon.weaponType);
}
