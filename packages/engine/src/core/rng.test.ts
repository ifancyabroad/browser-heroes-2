import { describe, expect, it } from "vitest";

import { createContextRngState, createInitialRngState, selectWeightedItems } from "./rng";

describe("createContextRngState", () => {
	it("is stable for the same context and isolated by namespace and values", () => {
		expect(createContextRngState("seed", "enemy", 4)).toEqual(
			createContextRngState("seed", "enemy", 4),
		);
		expect(createContextRngState("seed", "enemy", 4)).not.toEqual(
			createContextRngState("seed", "shop-item", 4),
		);
		expect(createContextRngState("seed", "enemy", 4)).not.toEqual(
			createContextRngState("seed", "enemy", 5),
		);
	});
});

describe("selectWeightedItems", () => {
	it("selects positive-weight items without replacement", () => {
		const result = selectWeightedItems(
			[
				{ value: "excluded", weight: 0 },
				{ value: "common", weight: 1 },
				{ value: "legendary", weight: 0.05 },
			],
			3,
			createInitialRngState("weighted-options"),
		);

		expect(result.value).toHaveLength(2);
		expect(result.value).toEqual(expect.arrayContaining(["common", "legendary"]));
		expect(result.value).not.toContain("excluded");
	});

	it("is deterministic for the same RNG state", () => {
		const items = [
			{ value: "a", weight: 1 },
			{ value: "b", weight: 0.6 },
			{ value: "c", weight: 0.3 },
			{ value: "d", weight: 0.15 },
		];
		const rngState = createInitialRngState("repeatable-weighted-options");

		expect(selectWeightedItems(items, 3, rngState)).toEqual(
			selectWeightedItems(items, 3, rngState),
		);
	});
});
