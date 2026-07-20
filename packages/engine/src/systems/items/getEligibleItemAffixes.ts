import { itemAffixes, type GeneratedItemRarity, type ItemAffix, type ItemBase } from "@app/content";

import type { GeneratedItemDefinition } from "../../schemas";

type AffixableItem = ItemBase | GeneratedItemDefinition;

const ITEM_RARITY_RANK: Record<GeneratedItemRarity, number> = {
	common: 0,
	uncommon: 1,
	rare: 2,
	epic: 3,
};

type GetEligibleItemAffixesInput = {
	item: AffixableItem;
	rarity: GeneratedItemRarity;
	position: ItemAffix["position"];
};

export function getEligibleItemAffixes(input: GetEligibleItemAffixesInput): ItemAffix[] {
	return itemAffixes.filter((affix) => {
		if (affix.position !== input.position) {
			return false;
		}

		if (ITEM_RARITY_RANK[affix.rarity] > ITEM_RARITY_RANK[input.rarity]) {
			return false;
		}

		return canApplyAffixToItem(affix, input.item);
	});
}

function canApplyAffixToItem(affix: ItemAffix, item: AffixableItem): boolean {
	const { appliesTo } = affix;

	if (appliesTo.itemTypes && !appliesTo.itemTypes.includes(item.type)) {
		return false;
	}

	if (item.type === "weapon") {
		if (appliesTo.weaponTypes && !appliesTo.weaponTypes.includes(item.weaponType)) {
			return false;
		}

		return !(appliesTo.armourSlots || appliesTo.armourCategories);
	}

	if (appliesTo.weaponTypes) {
		return false;
	}

	if (appliesTo.armourSlots && !appliesTo.armourSlots.includes(item.slot)) {
		return false;
	}

	if (item.slot === "body") {
		if (appliesTo.armourCategories && !appliesTo.armourCategories.includes(item.category)) {
			return false;
		}

		return true;
	}

	return !appliesTo.armourCategories;
}
