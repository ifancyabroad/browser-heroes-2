import { describe, expect, it } from "vitest";

import { createTestRunState } from "../test/createTestRunState";
import { selectItemDefinition } from "./selectItemDefinition";
import { selectEquipmentPlacement } from "./selectEquipmentPlacement";

const oneHandedWeapon = selectItemDefinition({
	instanceId: "new-weapon",
	type: "static",
	itemId: "acid_edge",
});

const shield = selectItemDefinition({
	instanceId: "new-shield",
	type: "static",
	itemId: "dragon_shield",
});

if (!oneHandedWeapon || !shield) {
	throw new Error("Expected test item definition");
}

describe("selectEquipmentPlacement", () => {
	it("selects an empty destination without replacing equipment", () => {
		const hero = createTestRunState().hero;
		const placement = selectEquipmentPlacement(
			{
				...hero,
				equipment: {
					...hero.equipment,
					mainHand: {
						instanceId: "equipped-weapon",
						type: "static",
						itemId: "acid_edge",
					},
					offHand: null,
				},
			},
			oneHandedWeapon,
		);

		expect(placement.automaticDestination).toMatchObject({
			equipmentSlot: "offHand",
			replacedItems: [],
		});
	});

	it("requires a replacement choice when every destination is occupied", () => {
		const hero = createTestRunState().hero;
		const placement = selectEquipmentPlacement(
			{
				...hero,
				equipment: {
					...hero.equipment,
					mainHand: {
						instanceId: "main-hand-weapon",
						type: "static",
						itemId: "acid_edge",
					},
					offHand: {
						instanceId: "off-hand-weapon",
						type: "static",
						itemId: "acid_edge",
					},
				},
			},
			oneHandedWeapon,
		);

		expect(placement.automaticDestination).toBeNull();
		expect(placement.destinations).toHaveLength(2);
	});

	it("previews a shield replacing an equipped two-handed weapon", () => {
		const hero = createTestRunState().hero;
		const placement = selectEquipmentPlacement(
			{
				...hero,
				equipment: {
					...hero.equipment,
					mainHand: {
						instanceId: "two-handed-weapon",
						type: "static",
						itemId: "black_blade_of_doom",
					},
					offHand: null,
				},
			},
			shield,
		);

		expect(placement.automaticDestination).toBeNull();
		expect(placement.destinations).toMatchObject([
			{
				equipmentSlot: "offHand",
				replacedItems: [{ instanceId: "two-handed-weapon" }],
			},
		]);
	});
});
