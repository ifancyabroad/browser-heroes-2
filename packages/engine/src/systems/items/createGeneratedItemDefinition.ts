import type { ItemBase } from "@app/content";

import type { GeneratedItemDefinition } from "../../schemas";
import { randomInt, type RngState } from "../../core/rng";

type CreateGeneratedItemDefinitionInput = {
	base: ItemBase;
	level: number;
	rngState: RngState;
};

type CreateGeneratedItemDefinitionResult = {
	value: GeneratedItemDefinition;
	rngState: RngState;
};

export function createGeneratedItemDefinition(
	input: CreateGeneratedItemDefinitionInput,
): CreateGeneratedItemDefinitionResult {
	const iconRoll = randomInt(input.rngState, 0, input.base.iconPool.length - 1);
	const icon = input.base.iconPool[iconRoll.value];

	const common = {
		id: createGeneratedItemId(input.base.id, input.level),
		name: input.base.name,
		description: undefined,
		icon,
		price: calculateGeneratedItemPrice(input.level),
		rarity: "common" as const,
		modifiers: [],
		tags: input.base.tags,
	};

	if (input.base.type === "weapon") {
		return {
			value: {
				...common,
				type: "weapon",
				weaponType: input.base.weaponType,
				handedness: input.base.handedness,
				range: input.base.range,
				damage: input.base.damage,
				attackRiders: [],
			},
			rngState: iconRoll.rngState,
		};
	}

	if (input.base.slot === "body") {
		return {
			value: {
				...common,
				type: "armour",
				slot: "body",
				category: input.base.category,
				armourClass: input.base.armourClass,
			},
			rngState: iconRoll.rngState,
		};
	}

	return {
		value: {
			...common,
			type: "armour",
			slot: input.base.slot,
		},
		rngState: iconRoll.rngState,
	};
}

function createGeneratedItemId(baseId: string, level: number) {
	return `${baseId}_level_${level}`;
}

function calculateGeneratedItemPrice(level: number) {
	return Math.max(1, level * 10);
}
