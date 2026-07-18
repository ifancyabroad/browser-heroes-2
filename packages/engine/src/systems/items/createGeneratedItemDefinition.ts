import type { ItemBase, ItemRarity } from "@app/content";

import type { GeneratedItemDefinition } from "../../schemas";
import { randomInt, type RngState, type RngResult } from "../../core/rng";
import { SelectedItemAffixes, selectItemAffixes } from "./selectItemAffixes";
import { selectGeneratedItemRarity } from "./selectGeneratedItemRarity";

type CreateGeneratedItemDefinitionInput = {
	base: ItemBase;
	level: number;
	rngState: RngState;
};

export function createGeneratedItemDefinition(
	input: CreateGeneratedItemDefinitionInput,
): RngResult<GeneratedItemDefinition> {
	const iconRoll = randomInt(input.rngState, 0, input.base.iconPool.length - 1);
	const icon = input.base.iconPool[iconRoll.value];

	const rarityResult = selectGeneratedItemRarity({
		itemLevel: input.level,
		rngState: iconRoll.rngState,
	});

	const rarity = rarityResult.value;

	const common: GeneratedItemCommon = {
		id: createGeneratedItemId(input.base.id, input.level),
		name: input.base.name,
		description: undefined,
		icon,
		price: calculateGeneratedItemPrice(input.level, rarity),
		rarity,
		modifiers: [],
		tags: input.base.tags,
	};

	const plainItem = createPlainGeneratedItem(input.base, common);

	const affixResult = selectItemAffixes({
		item: plainItem,
		itemLevel: input.level,
		rarity,
		rngState: rarityResult.rngState,
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
	rarity: ItemRarity;
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

	return {
		...item,
		name,
		modifiers: [
			...item.modifiers,
			...(affixes.prefix?.modifiers ?? []),
			...(affixes.suffix?.modifiers ?? []),
		],
	};
}

function createGeneratedItemId(baseId: string, level: number) {
	return `${baseId}_level_${level}`;
}

function calculateGeneratedItemPrice(level: number, rarity: ItemRarity) {
	const rarityMultiplier: Record<ItemRarity, number> = {
		common: 1,
		uncommon: 1.5,
		rare: 2.5,
		epic: 4,
		legendary: 8,
	};

	return Math.max(1, Math.round(level * 10 * rarityMultiplier[rarity]));
}
