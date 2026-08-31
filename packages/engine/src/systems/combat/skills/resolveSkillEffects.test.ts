import { SKILLS_BY_ID } from "@app/content";
import { describe, expect, it } from "vitest";

import { createUnprotectedTestRunState } from "../../../test/createTestRunState";
import { resolveSkillEffects } from "./resolveSkillEffects";

describe("resolveSkillEffects charged skill outcomes", () => {
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
});
