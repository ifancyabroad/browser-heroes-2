import { CONSUMABLES_BY_ID } from "@app/content";
import { describe, expect, it } from "vitest";
import { createTestCombat } from "../../../../test/createTestCombat";
import { resolveConsumableEffect } from "../../../consumables/resolveConsumableEffect";
import { formatActionOutcome } from "../../logs/formatActionLog";
import { getCombatTurnOrder } from "../../rounds/getCombatTurnOrder";
import { resolveSkillEffects } from "../../skills/resolveSkillEffects";
import { applyStatusEffect } from "./applyStatusEffect";
import { hasActiveStatus } from "../hasActiveStatus";

const skillSource = {
	type: "skill",
	skillId: "armour",
	sourceName: "Test status",
	sourceEffectKey: "effect:0",
} as const;

describe("shared status application", () => {
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
		const potion = resolveConsumableEffect(combat, CONSUMABLES_BY_ID.speedPotion, rngState);
		expect(hasActiveStatus(skill.value.player, "haste")).toBe(true);
		expect(hasActiveStatus(potion.value.combat.player, "haste")).toBe(true);
		expect(skill.value.player.activeEffects[0]).toEqual({
			...potion.value.combat.player.activeEffects[0],
			source: { ...skillSource, sourceName: "Test Haste" },
		});
		expect(skill.rngState).toEqual(rngState);
		expect(potion.rngState).toEqual(rngState);
	});

	it("allows an enemy to apply Haste to itself and gain priority", () => {
		const combat = createTestCombat();
		combat.player.combatStats.initiative = 100;
		const result = applyStatusEffect({
			combat,
			actorSide: "enemy",
			source: skillSource,
			rngState: { value: 0 },
			effect: {
				type: "applyStatus",
				target: "self",
				statusId: "haste",
				duration: { unit: "turns", value: 2 },
			},
		});
		expect(hasActiveStatus(result.value.combat.enemy, "haste")).toBe(true);
		expect(hasActiveStatus(result.value.combat.player, "haste")).toBe(false);
		expect(getCombatTurnOrder(result.value.combat)).toEqual(["enemy", "player"]);
	});

	it.each([
		["stunned", "stunned"],
		["silenced", "silenced"],
		["haste", "hastened"],
	] as const)("resists %s using the correct wording", (statusId, adjective) => {
		const combat = createTestCombat();
		const result = applyStatusEffect({
			combat,
			actorSide: "player",
			source: skillSource,
			rngState: { value: 0 },
			effect: {
				type: "applyStatus",
				target: "enemy",
				statusId,
				duration: { unit: "turns", value: 2 },
				save: {
					attribute: "wisdom",
					onSuccess: "noEffect",
					dc: { base: 0, includeProficiency: false, bonus: 0 },
				},
			},
		});
		expect(result.value.combat.enemy.activeEffects).toEqual([]);
		expect(result.value.outcomes).toEqual([
			{ type: "resisted", targetName: combat.enemy.name, subject: `being ${adjective}` },
		]);
	});

	it.each([
		["stunned", "stunned", "Stun"],
		["silenced", "silenced", "Silence"],
		["haste", "hastened", "Haste"],
	] as const)(
		"applies and refreshes %s after a failed saving throw",
		(statusId, adjective, name) => {
			const combat = createTestCombat();
			const effect = {
				type: "applyStatus" as const,
				target: "enemy" as const,
				statusId,
				duration: { unit: "turns" as const, value: 2 },
				save: {
					attribute: "wisdom" as const,
					onSuccess: "noEffect" as const,
					dc: { base: 1000, includeProficiency: false, bonus: 0 },
				},
			};
			const first = applyStatusEffect({
				combat,
				actorSide: "player",
				source: skillSource,
				effect,
				rngState: { value: 0 },
			});
			expect(hasActiveStatus(first.value.combat.enemy, statusId)).toBe(true);
			expect(formatActionOutcome(first.value.outcomes[0]).message).toBe(
				`Test enemy is ${adjective} for 2 turns.`,
			);
			const second = applyStatusEffect({
				combat: first.value.combat,
				actorSide: "player",
				source: skillSource,
				effect,
				rngState: first.rngState,
			});
			expect(second.value.combat.enemy.activeEffects).toHaveLength(1);
			expect(formatActionOutcome(second.value.outcomes[0]).message).toBe(
				`${name} on Test enemy is refreshed for 2 turns.`,
			);
		},
	);
});
