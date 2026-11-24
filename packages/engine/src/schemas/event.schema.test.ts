import { describe, expect, it } from "vitest";
import { engineEventSchema } from "./event.schema";

describe("consumable event contracts", () => {
	it.each([
		{ type: "CONSUMABLE_USED", consumableType: "healingPotion", remainingQuantity: 0 },
		{
			type: "CONSUMABLE_BOUGHT",
			consumableType: "healingPotion",
			quantity: 2,
			cost: 38,
			remainingQuantity: 3,
		},
	])("validates $type with consumable identity and remaining quantity", (event) => {
		expect(engineEventSchema.parse(event)).toEqual(event);
	});

	it.each(["CONSUMABLE_USED", "CONSUMABLE_BOUGHT"])("rejects invalid %s payloads", (type) => {
		const base = { type, quantity: 1, cost: 20, remainingQuantity: 1 };
		expect(engineEventSchema.safeParse(base).success).toBe(false);
		expect(
			engineEventSchema.safeParse({ ...base, consumableType: "unknownPotion" }).success,
		).toBe(false);
		expect(
			engineEventSchema.safeParse({
				...base,
				consumableType: "healingPotion",
				remainingQuantity: -1,
			}).success,
		).toBe(false);
	});

	it("requires a positive purchase quantity", () => {
		expect(
			engineEventSchema.safeParse({
				type: "CONSUMABLE_BOUGHT",
				consumableType: "healingPotion",
				quantity: 0,
				cost: 0,
				remainingQuantity: 0,
			}).success,
		).toBe(false);
	});
});
