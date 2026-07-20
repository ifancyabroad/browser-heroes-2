import type { GeneratedItemRarity, ItemAffix } from "@app/content";

import type { GeneratedItemDefinition } from "../../schemas";
import { selectWeightedItem, type RngResult, type RngState } from "../../core/rng";
import { getEligibleItemAffixes } from "./getEligibleItemAffixes";

type SelectItemAffixesInput = {
	item: GeneratedItemDefinition;
	rarity: GeneratedItemRarity;
	rngState: RngState;
};

export type SelectedItemAffixes = {
	prefix: ItemAffix | null;
	suffix: ItemAffix | null;
};

export function selectItemAffixes(input: SelectItemAffixesInput): RngResult<SelectedItemAffixes> {
	if (input.rarity === "common") {
		return {
			value: {
				prefix: null,
				suffix: null,
			},
			rngState: input.rngState,
		};
	}

	const prefixCandidates = getEligibleItemAffixes({
		item: input.item,
		rarity: input.rarity,
		position: "prefix",
	});

	const suffixCandidates = getEligibleItemAffixes({
		item: input.item,
		rarity: input.rarity,
		position: "suffix",
	});

	if (input.rarity === "uncommon") {
		const affixResult = selectAffix([...prefixCandidates, ...suffixCandidates], input.rngState);

		return {
			value: {
				prefix: affixResult.value.position === "prefix" ? affixResult.value : null,
				suffix: affixResult.value.position === "suffix" ? affixResult.value : null,
			},
			rngState: affixResult.rngState,
		};
	}

	const prefixResult = selectAffix(prefixCandidates, input.rngState);

	const suffixResult = selectAffix(suffixCandidates, prefixResult.rngState);

	return {
		value: {
			prefix: prefixResult.value,
			suffix: suffixResult.value,
		},
		rngState: suffixResult.rngState,
	};
}

function selectAffix(candidates: readonly ItemAffix[], rngState: RngState): RngResult<ItemAffix> {
	const selected = selectWeightedItem(
		candidates.map((affix) => ({
			value: affix,
			weight: affix.weight,
		})),
		rngState,
	);

	if (!selected) {
		throw new Error("Unable to select a required item affix");
	}

	return selected;
}
