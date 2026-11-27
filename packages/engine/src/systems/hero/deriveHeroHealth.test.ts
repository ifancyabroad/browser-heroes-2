import { describe, expect, it } from "vitest";
import { deriveHeroHealth } from "./deriveHeroHealth";

describe("deriveHeroHealth", () => {
	it.each([
		{ effectiveConstitution: 16, maxHpBonus: 0, baseHp: 50, maxHp: 50 },
		{ effectiveConstitution: 18, maxHpBonus: 0, baseHp: 55, maxHp: 55 },
		{ effectiveConstitution: 18, maxHpBonus: 25, baseHp: 55, maxHp: 80 },
		{ effectiveConstitution: 14, maxHpBonus: -10, baseHp: 45, maxHp: 35 },
	])("includes Constitution in base HP: %o", (testCase) => {
		const health = deriveHeroHealth({
			baseConstitution: 16,
			effectiveConstitution: testCase.effectiveConstitution,
			level: 5,
			currentHp: 100,
			maxHp: 50,
			maxHpBonus: testCase.maxHpBonus,
		});

		expect(health).toEqual({
			baseMaxHp: testCase.baseHp,
			maxHp: testCase.maxHp,
			currentHp: testCase.maxHp,
		});
	});

	it("preserves minimum max HP and current HP clamping", () => {
		const health = deriveHeroHealth({
			baseConstitution: 10,
			effectiveConstitution: 1,
			level: 5,
			currentHp: 16,
			maxHp: 16,
			maxHpBonus: 0,
		});

		expect(health).toEqual({ baseMaxHp: 1, maxHp: 1, currentHp: 1 });
	});
});
