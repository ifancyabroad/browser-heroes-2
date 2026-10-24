import type { ItemModifier } from "@app/content";
import { describe, expect, it } from "vitest";
import { groupItemModifiers } from "./items";
import { formatItemModifier } from "./effects";

describe("groupItemModifiers", () => {
	it("totals repeated stats in first-occurrence order without changing the item", () => {
		const modifiers: ItemModifier[] = [
			{ type: "modifyStat", stat: "criticalRangeBonus", value: 4 },
			{ type: "modifyStat", stat: "strength", value: 2 },
			{ type: "modifyStat", stat: "criticalRangeBonus", value: 2 },
			{ type: "modifyStat", stat: "strength", value: -1 },
		];
		const original = structuredClone(modifiers);

		expect(groupItemModifiers(modifiers)).toEqual([
			{ type: "modifyStat", stat: "criticalRangeBonus", value: 6 },
			{ type: "modifyStat", stat: "strength", value: 1 },
		]);
		expect(modifiers).toEqual(original);
	});

	it("keeps damage direction, operation, and each selector distinct", () => {
		const modifiers: ItemModifier[] = [
			{ type: "modifyDamage", operation: "add", value: 1 },
			{ type: "modifyDamage", operation: "add", value: 2, damageType: "fire" },
			{ type: "modifyDamage", operation: "add", value: 3, damageClass: "magical" },
			{ type: "modifyDamage", operation: "add", value: 4, attackRange: "melee" },
			{ type: "modifyDamage", operation: "multiply", value: 1.25 },
			{ type: "modifyDamageTaken", operation: "add", value: -1 },
			{ type: "modifyDamage", operation: "add", value: 2 },
			{ type: "modifyDamageTaken", operation: "add", value: -2 },
		];

		expect(groupItemModifiers(modifiers)).toEqual([
			{ ...modifiers[0], value: 3 },
			...modifiers.slice(1, 5),
			{ ...modifiers[5], value: -3 },
		]);
	});

	it("combines matching fully filtered damage bonuses", () => {
		const modifier: ItemModifier = {
			type: "modifyDamage",
			operation: "add",
			value: 2,
			damageType: "fire",
			damageClass: "magical",
			attackRange: "ranged",
		};
		expect(groupItemModifiers([modifier, { ...modifier, value: 3 }])).toEqual([
			{ ...modifier, value: 5 },
		]);
	});

	it("compounds healing and damage multipliers instead of adding percentages", () => {
		const grouped = groupItemModifiers([
			{ type: "modifyHealing", multiplier: 1.25 },
			{ type: "modifyHealing", multiplier: 1.5 },
			{ type: "modifyDamage", operation: "multiply", value: 1.2 },
			{ type: "modifyDamage", operation: "multiply", value: 1.5 },
			{ type: "modifyDamageTaken", operation: "multiply", value: 0.8 },
			{ type: "modifyDamageTaken", operation: "multiply", value: 0.5 },
		]);

		expect(grouped).toEqual([
			{ type: "modifyHealing", multiplier: 1.875 },
			{ type: "modifyDamage", operation: "multiply", value: 1.2 * 1.5 },
			{ type: "modifyDamageTaken", operation: "multiply", value: 0.4 },
		]);
		expect(grouped.map(formatItemModifier)).toEqual([
			"+88% healing",
			"+80% to all damage dealt",
			"-60% damage taken",
		]);
	});

	it("deduplicates identical affinities without merging opposing or distinct effects", () => {
		const resistance: ItemModifier = {
			type: "modifyDamageAffinity",
			operation: "add",
			affinity: "resistance",
			damageType: "fire",
		};
		const modifiers: ItemModifier[] = [
			resistance,
			{ ...resistance },
			{ ...resistance, operation: "remove" },
			{ ...resistance, affinity: "immunity" },
			{ ...resistance, damageType: "cold" },
		];
		expect(groupItemModifiers(modifiers)).toEqual([resistance, ...modifiers.slice(2)]);
	});

	it("handles items without modifiers", () => {
		expect(groupItemModifiers([])).toEqual([]);
	});
});
