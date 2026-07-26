import { describe, expect, it } from "vitest";
import { createTestRunState } from "../test/createTestRunState";
import { selectHeroView } from "./selectHeroView";

describe("selectHeroView", () => {
	it("projects identity, derived stats, equipment, and consumable limits", () => {
		const state = createTestRunState();
		const view = selectHeroView(state.hero);

		expect(view).toMatchObject({
			name: "Test Hero",
			level: 1,
			classId: "fighter",
			healingPotions: state.hero.healingPotions,
			maxHealingPotions: 3,
			equipment: state.hero.equipment,
		});
		expect(view.health.maxHp).toBeGreaterThan(0);
		expect(view.attributes.strength.value).toBeGreaterThanOrEqual(
			state.hero.attributes.strength,
		);
	});
});
