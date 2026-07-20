import type { GeneratedItemRarity, ItemBase } from "@app/content";

import { getEligibleItemAffixes } from "./getEligibleItemAffixes";

export function isItemBaseEligibleForRarity(base: ItemBase, rarity: GeneratedItemRarity): boolean {
	if (rarity === "common") {
		return base.type === "weapon" || base.slot === "body" || base.slot === "shield";
	}

	const prefixAffixes = getEligibleItemAffixes({
		item: base,
		rarity,
		position: "prefix",
	});

	const suffixAffixes = getEligibleItemAffixes({
		item: base,
		rarity,
		position: "suffix",
	});

	if (rarity === "uncommon") {
		return prefixAffixes.length > 0 || suffixAffixes.length > 0;
	}

	return prefixAffixes.length > 0 && suffixAffixes.length > 0;
}
