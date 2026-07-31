import { describe, expect, it } from "vitest";
import { deriveAttributes } from "./deriveAttributes";

describe("deriveAttributes", () => {
	it("caps effective attributes at thirty while preserving contributions", () => {
		const result = deriveAttributes(
			{
				strength: 29,
				dexterity: 10,
				constitution: 10,
				intelligence: 10,
				wisdom: 10,
				charisma: 10,
			},
			[
				{
					modifier: {
						type: "modifyStat",
						stat: "strength",
						value: 5,
						operation: "add",
					},
					source: { type: "feat", featId: "armour", sourceName: "Test" },
				},
			],
		);

		expect(result.strength.value).toBe(30);
		expect(result.strength.contributions).toHaveLength(1);
	});
});
