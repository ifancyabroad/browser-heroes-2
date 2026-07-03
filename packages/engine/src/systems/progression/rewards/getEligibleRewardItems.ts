import {
	type Class,
	CLASSES_BY_ID,
	items,
	type Item,
	type ItemId,
	type ItemRarity,
} from "@app/content";

import type { HeroState } from "../../../schemas";

import type { ItemRewardType } from "./itemRewardWeights";

type GetEligibleRewardItemsInput = {
	hero: HeroState;
	itemType: ItemRewardType;
	rarity: ItemRarity;
	excludedItemIds?: ReadonlySet<ItemId>;
};

export function getEligibleRewardItems(input: GetEligibleRewardItemsInput): Item[] {
	const classDefinition = CLASSES_BY_ID[input.hero.classId];

	const equippedItemIds = new Set(
		Object.values(input.hero.equipment)
			.filter((item) => item !== null)
			.map((item) => item.itemId),
	);

	return items.filter((item) => {
		if (equippedItemIds.has(item.id) || input.excludedItemIds?.has(item.id)) {
			return false;
		}

		if (item.rarity !== input.rarity) {
			return false;
		}

		if (!matchesRewardType(item, input.itemType)) {
			return false;
		}

		return canEquipItem(classDefinition, item);
	});
}

function matchesRewardType(item: Item, itemType: ItemRewardType): boolean {
	if (itemType === "weapon") {
		return item.type === "weapon";
	}

	return item.type === "armour" && item.slot === itemType;
}

function canEquipItem(classDefinition: Class, item: Item): boolean {
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
