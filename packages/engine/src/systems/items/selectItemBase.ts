import { CLASSES_BY_ID, itemBases, type ItemBase } from "@app/content";

import type { HeroState } from "../../schemas";
import type { RngState } from "../../core/rng";
import { randomInt } from "../../core/rng";
import { canEquipItemLike } from "./canEquipItemLike";

type SelectItemBaseInput = {
	hero: HeroState;
	level: number;
	rngState: RngState;
	type?: ItemBase["type"];
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
		if (input.type && base.type !== input.type) {
			return false;
		}

		if (base.minLevel > input.level) {
			return false;
		}

		if (base.maxLevel !== undefined && base.maxLevel < input.level) {
			return false;
		}

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

	const selected = randomInt(input.rngState, 0, eligibleBases.length - 1);

	return {
		ok: true,
		value: eligibleBases[selected.value],
		rngState: selected.rngState,
	};
}
