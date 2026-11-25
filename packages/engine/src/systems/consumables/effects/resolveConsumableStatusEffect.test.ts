import { describe, expect, it } from "vitest";
import { createTestCombat } from "../../../test/createTestCombat";
import { resolveSkillEffects } from "../../combat/skills/resolveSkillEffects";
import { hasActiveStatus } from "../../combat/effects/statuses/hasActiveStatus";
import { resolveConsumableStatusEffect } from "./resolveConsumableStatusEffect";

const hasteEffect = {
	type: "applyStatus",
	statusId: "haste",
	duration: { unit: "battles", value: 1 },
} as const;
const skillSource = {
	type: "skill",
	skillId: "armour",
	sourceName: "Test status",
	sourceEffectKey: "effect:0",
} as const;
describe("resolveConsumableStatusEffect", () => {
	it("applies the effect without changing Initiative or consuming RNG", () => {
		const state = { combat: createTestCombat(), rngState: { value: 0 } };
		state.combat.enemy.combatStats.initiative = 10000;
		const before = structuredClone(state.combat);
		const result = resolveConsumableStatusEffect(
			state.combat,
			hasteEffect,
			"speedPotion",
			state.rngState,
		);
		expect(result.rngState).toEqual(state.rngState);
		expect(result.value.combat.player.combatStats).toEqual(before.player.combatStats);
		expect(hasActiveStatus(result.value.combat.player, "haste")).toBe(true);
		expect(state.combat).toEqual(before);
	});

	it("applies the same Haste status through skills and consumables", () => {
		const combat = createTestCombat();
		const rngState = { value: 0 };
		const skill = resolveSkillEffects({
			combat,
			actorSide: "player",
			skillId: "armour",
			skillName: "Test Haste",
			effects: [
				{
					type: "applyStatus",
					statusId: "haste",
					target: "self",
					duration: { unit: "battles", value: 1 },
				},
			],
			rngState,
		});
		const potion = resolveConsumableStatusEffect(combat, hasteEffect, "speedPotion", rngState);
		expect(hasActiveStatus(skill.value.player, "haste")).toBe(true);
		expect(hasActiveStatus(potion.value.combat.player, "haste")).toBe(true);
		expect(skill.value.player.activeEffects[0]).toEqual({
			...potion.value.combat.player.activeEffects[0],
			source: { ...skillSource, sourceName: "Test Haste" },
		});
		expect(skill.rngState).toEqual(rngState);
		expect(potion.rngState).toEqual(rngState);
	});
});
