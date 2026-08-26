import { systemGhosts } from "@app/content";
import { describe, expect, it } from "vitest";

import { heroStateSchema } from "../../../schemas";
import { deriveHeroStats } from "../../hero/deriveHeroStats";
import { createSystemGhostEncounter } from "./createSystemGhostEncounter";

describe("createSystemGhostEncounter", () => {
	it("defines exactly one schema-valid system ghost for every encounter level", () => {
		expect(systemGhosts.map((ghost) => ghost.encounterLevel).sort((a, b) => a - b)).toEqual([
			2, 3, 4, 5, 6, 7, 8, 9, 10,
		]);

		for (let level = 2; level <= 10; level += 1) {
			const encounter = createSystemGhostEncounter(level);
			const definition = systemGhosts.find((ghost) => ghost.encounterLevel === level);
			expect(definition).toBeDefined();
			expect(encounter.ghostSource).toBe("system");
			expect(encounter.ghostUsername).toBe("The Forgotten");
			expect(encounter.ghostId).toMatch(/^system-ghost:/);
			expect(encounter.hero.level).toBe(definition!.heroLevel);
			expect(encounter.hero.xp).toBe(0);
			expect(encounter.hero.pendingLevelUp).toBeNull();
			expect(encounter.hero.healingPotions).toBe(0);
			expect(heroStateSchema.safeParse(encounter.hero).success).toBe(true);
			expect(encounter.hero.currentHp).toBe(deriveHeroStats(encounter.hero).health.maxHp);
		}
	});

	it("materializes deterministic equipment and initialized skill charges", () => {
		const first = createSystemGhostEncounter(10);
		const second = createSystemGhostEncounter(10);

		expect(first).toEqual(second);
		expect(first.hero.equipment.mainHand?.instanceId).toBe(
			"system-ghost:last_sentinel:equipment:mainHand",
		);
		for (const skillState of first.hero.skills) {
			expect(skillState.chargesRemaining).not.toBe(0);
		}
	});

	it("rejects encounter levels without authored system ghosts", () => {
		expect(() => createSystemGhostEncounter(1)).toThrow(
			"No system ghost is defined for encounter level 1",
		);
	});
});
