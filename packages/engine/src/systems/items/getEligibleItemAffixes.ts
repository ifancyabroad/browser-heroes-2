import { itemAffixes, type ItemAffix, type ItemAffixRarity, type ItemBase } from "@app/content";

import type { GeneratedItemDefinition } from "../../schemas";

type AffixableItem = ItemBase | GeneratedItemDefinition;

type GetEligibleItemAffixesInput = {
	item: AffixableItem;
	rarity: ItemAffixRarity;
	position: ItemAffix["position"];
};

export function getEligibleItemAffixes(input: GetEligibleItemAffixesInput): ItemAffix[] {
	return itemAffixes.filter((affix) => {
		if (affix.position !== input.position) {
			return false;
		}

		if (affix.rarity !== input.rarity) {
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

		if (appliesTo.damageTypes && !appliesTo.damageTypes.includes(item.damage.type)) {
			return false;
		}

		return !(appliesTo.armourSlots || appliesTo.armourCategories);
	}

	if (appliesTo.weaponTypes || appliesTo.damageTypes) {
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
