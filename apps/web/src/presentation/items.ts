import type { EquipmentSlot, ItemModifier, ItemRarity } from "@app/content";
import {
	armourCategoryLabels,
	armourSlotLabels,
	damageTypeLabels,
	equipmentSlotLabels,
	weaponTypeLabels,
} from "./labels";
import type { RuntimeItem } from "@app/engine";

export type PrimaryItemStat = {
	label: string;
	value: string;
};

export function getItemRarityTextClassName(rarity: ItemRarity) {
	switch (rarity) {
		case "common":
			return "text-common";
		case "uncommon":
			return "text-uncommon";
		case "rare":
			return "text-rare";
		case "epic":
			return "text-epic";
		case "legendary":
			return "text-legendary";
	}
}

export function getItemKindLabel(item: RuntimeItem) {
	if (item.type === "weapon") {
		return weaponTypeLabels[item.weaponType];
	}

	if (item.slot === "body") {
		return `${armourCategoryLabels[item.category]} armour`;
	}

	return armourSlotLabels[item.slot];
}

export function getItemSlotLabel(item: RuntimeItem) {
	if (item.type === "weapon") {
		return item.handedness === "twoHanded" ? "Both Hands" : "Hand";
	}

	switch (item.slot) {
		case "body":
			return equipmentSlotLabels.body;
		case "shield":
			return equipmentSlotLabels.offHand;
		case "helmet":
			return equipmentSlotLabels.head;
		case "gloves":
			return equipmentSlotLabels.hands;
		case "boots":
			return equipmentSlotLabels.feet;
		case "belt":
			return equipmentSlotLabels.waist;
		case "amulet":
			return equipmentSlotLabels.neck;
		case "ring":
			return "Finger";
	}
}

export function getEquipmentSlotLabel(slot: EquipmentSlot | readonly EquipmentSlot[]) {
	if (typeof slot === "string") {
		return equipmentSlotLabels[slot];
	}

	if (slot.length === 0) {
		return "No slot";
	}

	return slot.map((equipmentSlot) => equipmentSlotLabels[equipmentSlot]).join(" / ");
}

export function getPrimaryItemStat(item: RuntimeItem): PrimaryItemStat | null {
	if (item.type === "weapon") {
		return {
			label: "Damage",
			value: `${item.damage.dice} ${damageTypeLabels[item.damage.type]}`,
		};
	}

	if (item.slot === "body" || item.slot === "shield") {
		return {
			label: "AC",
			value: String(item.armourClass),
		};
	}

	return null;
}

// Display totals only: keep the item's stored modifiers and their combat resolution unchanged.
export function groupItemModifiers(modifiers: readonly ItemModifier[]): ItemModifier[] {
	const groups = new Map<string, ItemModifier>();

	for (const modifier of modifiers) {
		const key = getModifierKey(modifier);
		const previous = groups.get(key);

		if (!previous) {
			groups.set(key, { ...modifier });
			continue;
		}

		if (modifier.type === "modifyStat" && previous.type === "modifyStat") {
			groups.set(key, { ...modifier, value: previous.value + modifier.value });
		} else if (modifier.type === "modifyHealing" && previous.type === "modifyHealing") {
			groups.set(key, { ...modifier, multiplier: previous.multiplier * modifier.multiplier });
		} else if (
			(modifier.type === "modifyDamage" || modifier.type === "modifyDamageTaken") &&
			(previous.type === "modifyDamage" || previous.type === "modifyDamageTaken")
		) {
			groups.set(key, {
				...modifier,
				value:
					modifier.operation === "add"
						? previous.value + modifier.value
						: previous.value * modifier.value,
			});
		}
		// Identical affinity grants/removals are displayed once; opposing operations stay separate.
	}

	return [...groups.values()];
}

function getModifierKey(modifier: ItemModifier): string {
	switch (modifier.type) {
		case "modifyStat":
			return JSON.stringify([modifier.type, modifier.stat]);
		case "modifyHealing":
			return modifier.type;
		case "modifyDamage":
		case "modifyDamageTaken":
			return JSON.stringify([
				modifier.type,
				modifier.operation,
				modifier.damageType,
				modifier.damageClass,
				modifier.attackRange,
			]);
		case "modifyDamageAffinity":
			return JSON.stringify([
				modifier.type,
				modifier.operation,
				modifier.affinity,
				modifier.damageType,
			]);
	}
}
