import { describe, expect, it } from "vitest";
import { applyDamageModifiers } from "./applyDamageModifiers";

describe("applyDamageModifiers", () => {
	it("applies additions before multipliers", () => {
		expect(
			applyDamageModifiers({
				baseAmount: 10,
				damageType: "fire",
				modifiers: [
					{ operation: "add", value: 5 },
					{ operation: "multiply", value: 2 },
				],
			}),
		).toBe(30);
	});

	it("combines multiple additive and multiplicative modifiers", () => {
		expect(
			applyDamageModifiers({
				baseAmount: 10,
				damageType: "fire",
				modifiers: [
					{ operation: "add", value: 2 },
					{ operation: "add", value: 3 },
					{ operation: "multiply", value: 2 },
					{ operation: "multiply", value: 0.5 },
				],
			}),
		).toBe(15);
	});

	it("ignores modifiers for other damage types", () => {
		expect(
			applyDamageModifiers({
				baseAmount: 10,
				damageType: "fire",
				modifiers: [
					{ operation: "add", value: 2 },
					{ operation: "add", value: 100, damageType: "cold" },
					{ operation: "multiply", value: 2, damageType: "fire" },
				],
			}),
		).toBe(24);
	});
});
