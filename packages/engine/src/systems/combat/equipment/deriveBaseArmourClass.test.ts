import { describe, expect, it, vi } from "vitest";
import type { HeroEquipmentState } from "../../../schemas";
import { deriveBaseArmourClass } from "./deriveBaseArmourClass";

vi.mock("../../equipment/getEquippedBodyArmour", () => ({
	getEquippedBodyArmour: () => null,
}));

vi.mock("../../equipment/getEquippedShield", () => ({
	getEquippedShield: () => null,
}));

const EMPTY_EQUIPMENT: HeroEquipmentState = {
	head: null,
	neck: null,
	body: null,
	hands: null,
	finger1: null,
	finger2: null,
	waist: null,
	feet: null,
	mainHand: null,
	offHand: null,
};

describe("deriveBaseArmourClass", () => {
	it("caps an unarmoured hero's Dexterity armour class bonus at +5", () => {
		const result = deriveBaseArmourClass(EMPTY_EQUIPMENT, 30);

		expect(result.dexterity).toEqual({ modifier: 10, applied: 5 });
		expect(result.baseValue).toBe(15);
	});

	it("does not clamp negative Dexterity modifiers", () => {
		const result = deriveBaseArmourClass(EMPTY_EQUIPMENT, 6);

		expect(result.dexterity).toEqual({ modifier: -2, applied: -2 });
		expect(result.baseValue).toBe(8);
	});
});
