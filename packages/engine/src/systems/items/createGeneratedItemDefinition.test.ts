import { ITEMBASES_BY_ID, type GeneratedItemRarity } from "@app/content";
import { describe, expect, it } from "vitest";

import { createInitialRngState } from "../../core/rng";
import { createGeneratedItemDefinition } from "./createGeneratedItemDefinition";

describe("createGeneratedItemDefinition", () => {
	it.each([
		["common", 2],
		["uncommon", 3],
		["rare", 4],
		["epic", 5],
	] satisfies [GeneratedItemRarity, number][])(
		"improves generated shield armour class at %s rarity",
		(rarity, expectedArmourClass) => {
			const result = createGeneratedItemDefinition({
				base: ITEMBASES_BY_ID.base_shield,
				rarity,
				rngState: createInitialRngState(`shield-${rarity}`),
			});

			expect(result.value).toMatchObject({
				type: "armour",
				slot: "shield",
				armourClass: expectedArmourClass,
			});
		},
	);
});
