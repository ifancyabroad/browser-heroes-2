import type { Class, ItemBase } from "@app/content";

import type { RuntimeItem } from "../../schemas";

type EquippableLike = ItemBase | RuntimeItem;

export function isClassProficientWithItem(classDefinition: Class, item: EquippableLike): boolean {
	if (item.type === "weapon") {
		return classDefinition.proficiencies.weaponTypes.includes(item.weaponType);
	}

	if (item.slot === "body") {
		return classDefinition.proficiencies.armourTypes.includes(item.category);
	}

	if (item.slot === "shield") {
		return classDefinition.proficiencies.armourTypes.includes("shield");
	}

	return true;
}
