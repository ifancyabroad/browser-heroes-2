import { describe, expect, it } from "vitest";

import { deriveCombatStats } from "./deriveCombatStats";

describe("deriveCombatStats", () => {
	it("uses the existing additive modifier path for feats and authored enemy bases", () => {
		const stats = deriveCombatStats({
			baseArmourClass: 10,
			baseInitiative: 15,
			baseDamageAffinities: { resistances: [], immunities: [], vulnerabilities: [] },
			modifiers: [
				{
					modifier: { type: "modifyStat", stat: "initiative", value: 2 },
					source: { type: "feat", featId: "berserker", sourceName: "Test" },
				},
			],
		});

		expect(stats.initiative).toMatchObject({ baseValue: 15, value: 17 });
		expect(stats.initiative.contributions).toHaveLength(1);
	});
});
