import { describe, expect, it } from "vitest";
import { applyAction } from "../../actions";
import {
	createTestRunState,
	createTestTownState,
	modifyTestRunState,
} from "../../test/createTestRunState";

describe("swapHandWeapons", () => {
	it("swaps two one-handed weapons while in town", () => {
		const state = modifyTestRunState(createTestTownState(), (draft) => {
			const mainHand = draft.hero.equipment.mainHand;
			if (!mainHand) {
				throw new Error("Expected warrior to have a main-hand weapon");
			}
			draft.hero.equipment.offHand = {
				...structuredClone(mainHand),
				instanceId: "test-off-hand",
			};
		});

		const result = applyAction(state, { type: "SWAP_HAND_WEAPONS" });

		expect(result.ok).toBe(true);
		expect(result.state.hero.equipment.mainHand?.instanceId).toBe("test-off-hand");
		expect(result.state.hero.equipment.offHand?.instanceId).toBe(
			state.hero.equipment.mainHand?.instanceId,
		);
	});

	it("rejects swapping outside town or without two weapons", () => {
		expect(applyAction(createTestRunState(), { type: "SWAP_HAND_WEAPONS" })).toMatchObject({
			ok: false,
			error: "INVALID_EQUIPMENT_SLOT",
		});
		expect(applyAction(createTestTownState(), { type: "SWAP_HAND_WEAPONS" })).toMatchObject({
			ok: false,
			error: "INVALID_EQUIPMENT_SLOT",
		});
	});
});
