import { CLASSES_BY_ID, type GeneratedItemRarity, itemBases, type ItemBase } from "@app/content";

import type { HeroState } from "../../schemas";
import type { RngResult, RngState } from "../../core/rng";
import { selectWeightedItem } from "../../core/rng";
import { canEquipItemLike } from "./canEquipItemLike";
import { getTypeWeightedItemCandidates } from "./getTypeWeightedItemCandidates";
import { isItemBaseEligibleForRarity } from "./isItemBaseEligibleForRarity";

type SelectItemBaseInput = {
	hero: HeroState;
	rarity: GeneratedItemRarity;
	rngState: RngState;
};

export function selectItemBase(input: SelectItemBaseInput): RngResult<ItemBase> {
	const eligibleBases = getEligibleItemBases(input);

	const selected = selectWeightedItem(
		getTypeWeightedItemCandidates(eligibleBases),
		input.rngState,
	);

	if (!selected) {
		throw new Error(
			`No eligible ${input.rarity} item base exists for class ${input.hero.classId}`,
		);
	}

	return selected;
}

type GetEligibleItemBasesInput = {
	hero: HeroState;
	rarity: GeneratedItemRarity;
};

export function getEligibleItemBases(input: GetEligibleItemBasesInput): ItemBase[] {
	const classDefinition = CLASSES_BY_ID[input.hero.classId];

	return itemBases.filter((base) => {
		if (!isItemBaseEligibleForRarity(base, input.rarity)) {
			return false;
		}

		return canEquipItemLike(classDefinition, base);
	});
}
