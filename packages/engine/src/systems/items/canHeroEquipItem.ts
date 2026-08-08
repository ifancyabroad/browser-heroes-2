import { CLASSES_BY_ID } from "@app/content";

import type { HeroState, RuntimeItem } from "../../schemas";
import { isClassProficientWithItem } from "./isClassProficientWithItem";
import { isItemAvailableToClass } from "./isItemAvailableToClass";

export function canHeroEquipItem(hero: HeroState, item: RuntimeItem): boolean {
	const classDefinition = CLASSES_BY_ID[hero.classId];

	if (!isClassProficientWithItem(classDefinition, item)) {
		return false;
	}

	if (item.rarity !== "legendary") {
		return true;
	}

	return isItemAvailableToClass(item, hero.classId);
}
