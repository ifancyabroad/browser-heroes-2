import { SKILLS_BY_ID } from "@app/content";
import { describe, expect, it } from "vitest";

import { createUnprotectedTestRunState } from "../../../test/createTestRunState";
import { resolveSkillEffects } from "./resolveSkillEffects";
import { createTestCombat } from "../../../test/createTestCombat";

describe("resolveSkillEffects", () => {
	it("applies shared percentage healing after an earlier skill modifier", () => {
		const combat = createTestCombat();
		combat.enemy.currentHp = 10;
		const result = resolveSkillEffects({
			combat,
			actorSide: "enemy",
			effects: [
				{
					type: "modifyHealing",
					target: "self",
					multiplier: 2,
					duration: { unit: "turns", value: 2 },
				},
				{ type: "heal", target: "self", percent: 0.25 },
			],
			skillId: "armour",
			skillName: "Test recovery",
			rngState: { value: 7 },
		});
		expect(result.value.enemy.currentHp).toBe(60);
		expect(result.value.player).toEqual(combat.player);
		expect(result.rngState).toEqual({ value: 7 });
		expect(result.value.log).toContainEqual(
			expect.objectContaining({
				eventType: "healing_done",
				outcome: { type: "healing", targetId: combat.enemy.id, amount: 50 },
			}),
		);
	});
	it.each(["player", "enemy"] as const)(
		"resolves Mana Burst's damage to both combatants even when its %s user dies",
		(actorSide) => {
			const combat = structuredClone(createUnprotectedTestRunState().combat!);
			const targetSide = actorSide === "player" ? "enemy" : "player";
			combat[actorSide].currentHp = 1;
			combat[targetSide].currentHp = 1000;
			combat[targetSide].maxHp = 1000;
			const skill = SKILLS_BY_ID.mana_burst;
			const effects = skill.effects;
			if (!effects.every((effect) => effect.type !== "removeStatus")) {
				throw new Error("Mana Burst contains an unsupported effect");
			}

			const result = resolveSkillEffects({
				combat,
				actorSide,
				effects,
				skillId: skill.id,
				skillName: skill.name,
				rngState: { value: 7 },
			});

			expect(result.value[actorSide].currentHp).toBe(0);
			expect(result.value[targetSide].currentHp).toBeLessThan(1000);
			expect(result).toEqual(
				resolveSkillEffects({
					combat,
					actorSide,
					effects,
					skillId: skill.id,
					skillName: skill.name,
					rngState: { value: 7 },
				}),
			);
		},
	);

	it("applies and consumes Head Shot's automatic critical before its attack", () => {
		const combat = structuredClone(createUnprotectedTestRunState().combat!);
		const skill = SKILLS_BY_ID.head_shot;
		const effects = skill.effects;
		if (!effects.every((effect) => effect.type !== "removeStatus")) {
			throw new Error("Head Shot contains an unsupported effect");
		}
		const result = resolveSkillEffects({
			combat,
			actorSide: "player",
			effects,
			skillId: skill.id,
			skillName: skill.name,
			rngState: { value: 7 },
		});

		expect(result.value.player.activeEffects).toEqual([]);
		expect(result.value.enemy.currentHp).toBeLessThan(combat.enemy.currentHp);
		expect(result.value.log.some((entry) => entry.message.includes("Critical hit!"))).toBe(
			true,
		);
	});

	it("uses an Armour Class modifier resolved before a weapon attack", () => {
		const combat = structuredClone(createUnprotectedTestRunState().combat!);
		combat.enemy.combatStats.armourClass = 100;
		const startingHp = combat.enemy.currentHp;

		const result = resolveSkillEffects({
			combat,
			actorSide: "player",
			effects: [
				{
					type: "modifyStat",
					target: "enemy",
					stat: "armourClass",
					value: -100,
					duration: { unit: "turns", value: 1 },
				},
				{
					type: "attackDamage",
					target: "enemy",
					multiplier: 1,
					attackRiders: [],
				},
			],
			skillId: "armour_break",
			skillName: "Armour Break",
			rngState: { value: 8 },
		});

		expect(result.value.enemy.currentHp).toBeLessThan(startingHp);
		expect(result.value.enemy.activeEffects).toContainEqual(
			expect.objectContaining({ type: "modifyStat", stat: "armourClass", value: -100 }),
		);
	});

	it("continues resolving later effects after a weapon attack misses", () => {
		const combat = structuredClone(createUnprotectedTestRunState().combat!);
		combat.player.combatStats.attackRollBonus = -100;
		const startingHp = combat.enemy.currentHp;

		const result = resolveSkillEffects({
			combat,
			actorSide: "player",
			effects: [
				{
					type: "attackDamage",
					target: "enemy",
					multiplier: 1,
					attackRiders: [],
				},
				{
					type: "modifyStat",
					target: "enemy",
					stat: "armourClass",
					value: -4,
					duration: { unit: "turns", value: 1 },
				},
			],
			skillId: "armour_break",
			skillName: "Test Skill",
			rngState: { value: 7 },
		});

		expect(result.value.enemy.currentHp).toBe(startingHp);
		expect(result.value.enemy.activeEffects).toContainEqual(
			expect.objectContaining({ type: "modifyStat", stat: "armourClass", value: -4 }),
		);
	});
});
