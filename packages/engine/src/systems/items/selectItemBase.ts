import { CLASSES_BY_ID, itemBases, type ItemBase } from "@app/content";

import type { HeroState } from "../../schemas";
import type { RngState } from "../../core/rng";
import { selectWeightedItem } from "../../core/rng";
import { canEquipItemLike } from "./canEquipItemLike";
import { getTypeWeightedItemCandidates } from "./getTypeWeightedItemCandidates";

type SelectItemBaseInput = {
	hero: HeroState;
	rngState: RngState;
};

type SelectItemBaseResult =
	| {
			ok: true;
			value: ItemBase;
			rngState: RngState;
	  }
	| {
			ok: false;
			error: "NO_ELIGIBLE_ITEM_BASE";
			rngState: RngState;
	  };

export function selectItemBase(input: SelectItemBaseInput): SelectItemBaseResult {
	const classDefinition = CLASSES_BY_ID[input.hero.classId];

	const eligibleBases = itemBases.filter((base) => {
		if (!canEquipItemLike(classDefinition, base)) {
			return false;
		}

		return true;
	});

	if (eligibleBases.length === 0) {
		return {
			ok: false,
			error: "NO_ELIGIBLE_ITEM_BASE",
			rngState: input.rngState,
		};
	}

	const selected = selectWeightedItem(
		getTypeWeightedItemCandidates(eligibleBases),
		input.rngState,
	);

	if (!selected) {
		throw new Error("Unable to select from eligible item bases");
	}

	return {
		ok: true,
		value: selected.value,
		rngState: selected.rngState,
	};
}
