import { describe, expect, it } from "vitest";

import { formatItemModifier, formatRiderEffect } from "./effects";

describe("effect presentation", () => {
	it("distinguishes typed amplification from added rider damage", () => {
		expect(
			formatItemModifier({
				type: "modifyDamage",
				damageType: "fire",
				operation: "add",
				value: 2,
			}),
		).toBe("+2 to fire damage dealt");
		expect(
			formatRiderEffect({
				type: "damage",
				target: "enemy",
				damageType: "fire",
				dice: "1d4",
				requiresAttackRoll: false,
			}),
		).toBe("The enemy takes 1d4 Fire damage.");
	});

	it("describes universal damage and round healing multipliers clearly", () => {
		expect(formatItemModifier({ type: "modifyDamage", operation: "add", value: 1 })).toBe(
			"+1 to all damage dealt",
		);
		expect(formatItemModifier({ type: "modifyHealing", multiplier: 1.4 })).toBe("+40% healing");
	});
});
