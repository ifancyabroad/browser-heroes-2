import { describe, expect, it } from "vitest";
import type { PendingRewardChoice } from "../../../schemas";
import { createTestRunState } from "../../../test/createTestRunState";
import { createPendingRewardChoice } from "./createPendingRewardChoice";

describe("createPendingRewardChoice", () => {
	it("does not create choices for standard encounters", () => {
		const state = createTestRunState();

		expect(
			createPendingRewardChoice({
				runId: state.id,
				seed: state.seed,
				hero: state.hero,
				zoneNumber: state.zoneNumber,
				battleNumber: state.battleNumber,
				encounterType: "standard",
				pendingRewardChoice: null,
			}),
		).toBeNull();
	});

	it("creates deterministic boss choices with two items and scaled gold", () => {
		const state = createTestRunState();
		const input = {
			runId: state.id,
			seed: state.seed,
			hero: state.hero,
			zoneNumber: 1,
			battleNumber: 10,
			encounterType: "boss" as const,
			pendingRewardChoice: null,
		};

		const first = createPendingRewardChoice(input);
		const second = createPendingRewardChoice(input);

		expect(first).toEqual(second);
		expect(first?.options).toEqual([
			expect.objectContaining({ type: "item" }),
			expect.objectContaining({ type: "item" }),
			{ type: "gold", amount: 100 },
		]);
	});

	it("preserves an existing pending choice and RNG state", () => {
		const state = createTestRunState();
		const pendingRewardChoice: PendingRewardChoice = {
			options: [
				{ type: "gold" as const, amount: 10 },
				{ type: "gold" as const, amount: 20 },
				{ type: "gold" as const, amount: 30 },
			],
		};

		const result = createPendingRewardChoice({
			runId: state.id,
			seed: state.seed,
			hero: state.hero,
			zoneNumber: 1,
			battleNumber: 10,
			encounterType: "boss",
			pendingRewardChoice,
		});

		expect(result).toEqual(pendingRewardChoice);
	});
});
