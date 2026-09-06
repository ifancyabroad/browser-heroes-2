import { SKILLS_BY_ID } from "@app/content";
import { describe, expect, it } from "vitest";

import { createUnprotectedTestRunState } from "../../../test/createTestRunState";
import { resolveSkillEffects } from "./resolveSkillEffects";

describe("resolveSkillEffects", () => {
	it("applies and consumes Head Shot's automatic critical before its attack", () => {
		const combat = structuredClone(createUnprotectedTestRunState().combat!);
		const skill = SKILLS_BY_ID.head_shot;
		const result = resolveSkillEffects({
			combat,
			actorSide: "player",
			effects: skill.effects,
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
