import type { GeneratedItemRarity, ItemBase } from "@app/content";

import type { GeneratedItemDefinition } from "../../schemas";
import { randomInt, type RngState, type RngResult } from "../../core/rng";
import { SelectedItemAffixes, selectItemAffixes } from "./selectItemAffixes";

type CreateGeneratedItemDefinitionInput = {
	base: ItemBase;
	rarity: GeneratedItemRarity;
	rngState: RngState;
};

export function createGeneratedItemDefinition(
	input: CreateGeneratedItemDefinitionInput,
): RngResult<GeneratedItemDefinition> {
	const iconRoll = randomInt(input.rngState, 0, input.base.iconPool.length - 1);
	const icon = input.base.iconPool[iconRoll.value];

	const common: GeneratedItemCommon = {
		id: createGeneratedItemId(input.base.id),
		name: input.base.name,
		description: undefined,
		icon,
		price: calculateGeneratedItemPrice(input.base.basePrice, input.rarity),
		rarity: input.rarity,
		modifiers: [],
		tags: input.base.tags,
	};

	const plainItem = createPlainGeneratedItem(input.base, common);

	const affixResult = selectItemAffixes({
		item: plainItem,
		rarity: input.rarity,
		rngState: iconRoll.rngState,
	});

	return {
		value: applyAffixesToGeneratedItem(plainItem, affixResult.value),
		rngState: affixResult.rngState,
	};
}

type GeneratedItemCommon = {
	id: string;
	name: string;
	description: string | undefined;
	icon: string;
	price: number;
	rarity: GeneratedItemRarity;
	modifiers: [];
	tags: string[];
};

function createPlainGeneratedItem(
	base: ItemBase,
	common: GeneratedItemCommon,
): GeneratedItemDefinition {
	if (base.type === "weapon") {
		return {
			...common,
			type: "weapon",
			weaponType: base.weaponType,
			handedness: base.handedness,
			range: base.range,
			damage: base.damage,
			attackRiders: [],
		};
	}

	if (base.slot === "body") {
		return {
			...common,
			type: "armour",
			slot: "body",
			category: base.category,
			armourClass: base.armourClass,
		};
	}

	if (base.slot === "shield") {
		return {
			...common,
			type: "armour",
			slot: "shield",
			armourClass: base.armourClass,
		};
	}

	return {
		...common,
		type: "armour",
		slot: base.slot,
	};
}

function applyAffixesToGeneratedItem(
	item: GeneratedItemDefinition,
	affixes: SelectedItemAffixes,
): GeneratedItemDefinition {
	const name = [affixes.prefix?.name, item.name, affixes.suffix?.name].filter(Boolean).join(" ");

	const modifiers = [
		...item.modifiers,
		...(affixes.prefix?.modifiers ?? []),
		...(affixes.suffix?.modifiers ?? []),
	];

	if (item.type === "weapon") {
		return {
			...item,
			name,
			modifiers,
			attackRiders: [
				...item.attackRiders,
				...(affixes.prefix?.attackRiders ?? []),
				...(affixes.suffix?.attackRiders ?? []),
			],
		};
	}

	return {
		...item,
		name,
		modifiers,
	};
}

function createGeneratedItemId(baseId: string): string {
	return `generated_${baseId}`;
}

function calculateGeneratedItemPrice(basePrice: number, rarity: GeneratedItemRarity): number {
	const rarityMultiplier: Record<GeneratedItemRarity, number> = {
		common: 1,
		uncommon: 1.5,
		rare: 2.5,
		epic: 4,
	};

	return Math.max(1, Math.round(basePrice * rarityMultiplier[rarity]));
}
