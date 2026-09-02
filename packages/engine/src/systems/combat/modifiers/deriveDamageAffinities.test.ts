import { describe, expect, it } from "vitest";
import type { DamageAffinities } from "@app/content";

import type { ResolvedModifier } from "./modifier.types";
import { deriveDamageAffinities, toDamageAffinities } from "./deriveDamageAffinities";

const EMPTY_AFFINITIES: DamageAffinities = {
	resistances: [],
	immunities: [],
	vulnerabilities: [],
};

function affinityModifier(affinity: "resistance" | "immunity" | "vulnerability"): ResolvedModifier {
	return {
		modifier: {
			type: "modifyDamageAffinity",
			affinity,
			operation: "add",
			damageType: "cold",
		},
		source: {
			type: "feat",
			featId: "flameborn",
			sourceName: "Test source",
		},
	};
}

describe("toDamageAffinities", () => {
	it("cancels resistance and vulnerability for the same damage type", () => {
		const derived = deriveDamageAffinities(EMPTY_AFFINITIES, [
			affinityModifier("resistance"),
			affinityModifier("vulnerability"),
		]);

		expect(toDamageAffinities(derived)).toEqual(EMPTY_AFFINITIES);
	});

	it("keeps immunity when all affinities apply to the same damage type", () => {
		const derived = deriveDamageAffinities(EMPTY_AFFINITIES, [
			affinityModifier("resistance"),
			affinityModifier("immunity"),
			affinityModifier("vulnerability"),
		]);

		expect(toDamageAffinities(derived)).toEqual({
			resistances: [],
			immunities: ["cold"],
			vulnerabilities: [],
		});
	});
});
