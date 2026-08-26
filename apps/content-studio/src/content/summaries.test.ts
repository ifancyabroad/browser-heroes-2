import type { AttackRider, PassiveModifier } from "@app/content";
import { describe, expect, it } from "vitest";

import { modifierSummary, riderSummary } from "./summaries";

describe("content summaries", () => {
	it("formats modifiers without exposing schema names", () => {
		const modifiers: PassiveModifier[] = [
			{ type: "modifyStat", stat: "saveDcBonus", value: 3 },
			{
				type: "modifyDamage",
				damageClass: "magical",
				operation: "multiply",
				value: 1.5,
			},
		];

		expect(modifierSummary(modifiers)).toBe("+3 save DC · +50% magical damage");
		expect(modifierSummary(modifiers)).not.toMatch(/modify[A-Z]/);
	});

	it("formats rider timing, effects, saves, and durations", () => {
		const riders: AttackRider[] = [
			{
				timing: "onHit",
				save: {
					attribute: "constitution",
					dc: { base: 12, includeProficiency: false, bonus: 0 },
					onSuccess: "noEffect",
				},
				effects: [
					{
						type: "damageOverTime",
						target: "enemy",
						damageType: "poison",
						damageClass: "other",
						dice: "1d4",
						duration: { unit: "turns", value: 2 },
					},
				],
			},
		];

		expect(riderSummary(riders)).toBe("Hit: 1d4 poison/turn · 2 turns · CONSTITUTION save");
		expect(riderSummary(riders)).not.toContain("damageOverTime");
	});
});
