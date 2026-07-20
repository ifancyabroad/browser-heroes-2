import { itemAffixes, type GeneratedItemRarity, type ItemAffix } from "@app/content";

import type { GeneratedItemDefinition } from "../../schemas";
import { type RngState, selectWeightedItem, type RngResult } from "../../core/rng";

const GENERATED_ITEM_AFFIX_COUNTS: Record<GeneratedItemRarity, number> = {
	common: 0,
	uncommon: 1,
	rare: 2,
	epic: 2,
};

const ITEM_RARITY_RANK: Record<GeneratedItemRarity, number> = {
	common: 0,
	uncommon: 1,
	rare: 2,
	epic: 3,
};

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
	const affixCount = GENERATED_ITEM_AFFIX_COUNTS[input.rarity];

	if (affixCount <= 0) {
		return {
			value: {
				prefix: null,
				suffix: null,
			},
			rngState: input.rngState,
		};
	}

	const prefixCandidates = getEligibleAffixesByPosition({
		...input,
		position: "prefix",
	});

	const suffixCandidates = getEligibleAffixesByPosition({
		...input,
		position: "suffix",
	});

	if (affixCount === 1) {
		return selectSingleAffix({
			prefixCandidates,
			suffixCandidates,
			rngState: input.rngState,
		});
	}

	const prefixResult = selectAffixFromCandidates(prefixCandidates, input.rngState);

	const suffixResult = selectAffixFromCandidates(suffixCandidates, prefixResult.rngState);

	return {
		value: {
			prefix: prefixResult.value,
			suffix: suffixResult.value,
		},
		rngState: suffixResult.rngState,
	};
}

type EligibleAffixInput = SelectItemAffixesInput & {
	position: ItemAffix["position"];
};

function getEligibleAffixesByPosition(input: EligibleAffixInput): ItemAffix[] {
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

function selectSingleAffix(input: {
	prefixCandidates: readonly ItemAffix[];
	suffixCandidates: readonly ItemAffix[];
	rngState: RngState;
}): RngResult<SelectedItemAffixes> {
	const availablePositions = [
		input.prefixCandidates.length > 0
			? { value: "prefix" as const, weight: input.prefixCandidates.length }
			: null,
		input.suffixCandidates.length > 0
			? { value: "suffix" as const, weight: input.suffixCandidates.length }
			: null,
	].filter((position): position is NonNullable<typeof position> => position !== null);

	if (availablePositions.length === 0) {
		return {
			value: {
				prefix: null,
				suffix: null,
			},
			rngState: input.rngState,
		};
	}

	const positionResult = selectWeightedItem(availablePositions, input.rngState);

	if (!positionResult) {
		return {
			value: {
				prefix: null,
				suffix: null,
			},
			rngState: input.rngState,
		};
	}

	if (positionResult.value === "prefix") {
		const affixResult = selectAffixFromCandidates(
			input.prefixCandidates,
			positionResult.rngState,
		);

		return {
			value: {
				prefix: affixResult.value,
				suffix: null,
			},
			rngState: affixResult.rngState,
		};
	}

	const affixResult = selectAffixFromCandidates(input.suffixCandidates, positionResult.rngState);

	return {
		value: {
			prefix: null,
			suffix: affixResult.value,
		},
		rngState: affixResult.rngState,
	};
}

function selectAffixFromCandidates(
	candidates: readonly ItemAffix[],
	rngState: RngState,
): RngResult<ItemAffix | null> {
	if (candidates.length === 0) {
		return {
			value: null,
			rngState,
		};
	}

	const selected = selectWeightedItem(
		candidates.map((affix) => ({
			value: affix,
			weight: affix.weight,
		})),
		rngState,
	);

	if (!selected) {
		return {
			value: null,
			rngState,
		};
	}

	return selected;
}

function canApplyAffixToItem(affix: ItemAffix, item: GeneratedItemDefinition): boolean {
	const { appliesTo } = affix;

	if (appliesTo.itemTypes && !appliesTo.itemTypes.includes(item.type)) {
		return false;
	}

	if (item.type === "weapon") {
		if (appliesTo.weaponTypes && !appliesTo.weaponTypes.includes(item.weaponType)) {
			return false;
		}

		if (appliesTo.armourSlots || appliesTo.armourCategories) {
			return false;
		}

		return true;
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

	if (appliesTo.armourCategories) {
		return false;
	}

	return true;
}
